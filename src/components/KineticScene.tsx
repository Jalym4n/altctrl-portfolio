import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps { paused?: boolean; compact?: boolean }

function makeShield(scale = 1) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 1.85 * scale);
  shape.lineTo(1.4 * scale, 1.3 * scale);
  shape.lineTo(1.24 * scale, -0.3 * scale);
  shape.bezierCurveTo(1.1 * scale, -1.1 * scale, 0.5 * scale, -1.6 * scale, 0, -1.95 * scale);
  shape.bezierCurveTo(-0.5 * scale, -1.6 * scale, -1.1 * scale, -1.1 * scale, -1.24 * scale, -0.3 * scale);
  shape.lineTo(-1.4 * scale, 1.3 * scale);
  shape.closePath();
  return shape;
}

function Sculpture({ paused = false, compact = false }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Mesh>(null);
  const packets = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const ready = useRef(false);
  const palette = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    const color = (name: string) => new THREE.Color(`hsl(${css.getPropertyValue(name).trim().split(/\s+/).join(", ")})`);
    return { metal: color("--sculpture-metal"), lime: color("--primary"), coral: color("--accent"), light: color("--foreground") };
  }, []);
  const geometry = useMemo(() => {
    const rim = makeShield();
    const hole = makeShield(0.88);
    rim.holes.push(new THREE.Path(hole.getPoints().reverse()));
    const pulsePoints = [[-1.05, 0], [-0.65, 0], [-0.44, 0.22], [-0.24, -0.28], [0.04, 0.67], [0.28, -0.58], [0.47, 0], [1.03, 0]];
    const pulse = new THREE.CurvePath<THREE.Vector3>();
    for (let i = 1; i < pulsePoints.length; i++) {
      const a = pulsePoints[i - 1];
      const b = pulsePoints[i];
      pulse.add(new THREE.LineCurve3(new THREE.Vector3(a[0], a[1], 0.3), new THREE.Vector3(b[0], b[1], 0.3)));
    }
    return { rim, shield: makeShield(0.88), pulse };
  }, []);
  const circuitTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = palette.metal.getStyle();
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = palette.light.getStyle();
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 1;
      for (let i = 0; i < 16; i++) {
        const y = i * 32;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(170 + i * 7, y); ctx.lineTo(200 + i * 7, y + 24); ctx.lineTo(512, y + 24); ctx.stroke();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [palette]);
  useEffect(() => () => circuitTexture.dispose(), [circuitTexture]);

  useFrame((state, delta) => {
    if (!ready.current) {
      state.gl.domElement.parentElement?.setAttribute("data-scene-ready", "true");
      ready.current = true;
    }
    if (paused || !group.current) return;
    elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.08 + state.pointer.y * 0.1, 3, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.24 + Math.sin(t * 0.35) * 0.24 + state.pointer.x * 0.25, 2, delta);
    group.current.rotation.z = Math.sin(t * 0.2) * 0.035 + Math.min(window.scrollY / 6000, 0.12);
    group.current.position.y = Math.sin(t * 0.45) * 0.1;
    if (scan.current) scan.current.position.y = Math.sin(t * 0.75) * 1.15;
    if (packets.current) packets.current.rotation.z = Math.sin(t * 0.3) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={4.5} color={palette.light} />
      <directionalLight position={[-4, -2, 3]} intensity={2} color={palette.lime} />
      <pointLight position={[2, -3, 1]} intensity={15} color={palette.coral} />
      <group position={compact ? [0.45, 0, 0] : [1.1, 0, 0]}>
        <group ref={group} rotation={[0.08, -0.24, 0]} scale={compact ? 1 : 1.17}>
          <mesh position={[0, 0, -0.16]}>
            <extrudeGeometry args={[geometry.rim, { depth: 0.24, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.045, bevelThickness: 0.045, curveSegments: 32 }]} />
            <meshPhysicalMaterial map={circuitTexture} color={palette.metal} metalness={0.78} roughness={0.23} clearcoat={1} />
          </mesh>
          <mesh position={[0, 0, -0.14]}>
            <shapeGeometry args={[geometry.shield, 32]} />
            <meshPhysicalMaterial color={palette.metal} transparent opacity={0.1} metalness={0.25} roughness={0.25} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
          <mesh>
            <tubeGeometry args={[geometry.pulse, 96, 0.035, 8, false]} />
            <meshBasicMaterial color={palette.lime} />
          </mesh>
          <mesh ref={scan} position={[0, 0, 0.03]}>
            <boxGeometry args={[1.9, 0.012, 0.015]} />
            <meshBasicMaterial color={palette.lime} transparent opacity={0.4} />
          </mesh>
          <group ref={packets}>
            {[[-1.75, 0.8, 0.4], [1.8, 0.45, -0.2], [-1.7, -0.9, -0.3], [1.65, -1.05, 0.5]].map((position, i) => (
              <group key={i} position={new THREE.Vector3(...position)} rotation={[0, i % 2 ? -0.15 : 0.2, i % 2 ? -0.08 : 0.08]}>
                <mesh><boxGeometry args={[0.75, 0.52, 0.065]} /><meshPhysicalMaterial color={palette.metal} metalness={0.7} roughness={0.3} map={circuitTexture} /></mesh>
                {[0, 1, 2].map(row => <mesh key={row} position={[-0.02, 0.12 - row * 0.12, 0.04]}><boxGeometry args={[row === 0 ? 0.36 : 0.5, 0.025, 0.01]} /><meshBasicMaterial color={i === 3 ? palette.coral : palette.lime} /></mesh>)}
                <mesh position={[0.3, 0.18, 0.04]}><circleGeometry args={[0.025, 12]} /><meshBasicMaterial color={palette.lime} /></mesh>
              </group>
            ))}
          </group>
          <mesh position={[0, 0, -0.55]} rotation={[0.15, 0.4, 0]}>
            <torusGeometry args={[2.32, 0.009, 6, 160]} />
            <meshBasicMaterial color={palette.metal} transparent opacity={0.45} />
          </mesh>
          {Array.from({ length: 22 }, (_, i) => {
            const y = -1.35 + i * 0.125;
            const x = Math.sin(i * 0.42) * 0.42;
            return <group key={i} position={[0, y, -0.35]}><mesh position={[x, 0, 0]}><sphereGeometry args={[0.035, 10, 8]} /><meshBasicMaterial color={palette.lime} transparent opacity={0.6} /></mesh><mesh position={[-x, 0, -0.18]}><sphereGeometry args={[0.035, 10, 8]} /><meshBasicMaterial color={palette.coral} transparent opacity={0.6} /></mesh><mesh rotation={[0, 0, 0]} position={[0, 0, -0.09]}><boxGeometry args={[Math.abs(x) * 2 + 0.02, 0.009, 0.009]} /><meshBasicMaterial color={palette.metal} transparent opacity={0.4} /></mesh></group>;
          })}
        </group>
      </group>
    </>
  );
}

export default function KineticScene({ paused = false, compact = false }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 42 }}
      dpr={[1, 1.7]}
      frameloop={paused ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="Clinical data security sculpture: a chrome shield protecting a heartbeat, with scanning records and a molecular data helix"
    >
      <Sculpture paused={paused} compact={compact} />
    </Canvas>
  );
}