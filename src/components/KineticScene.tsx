import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps { paused?: boolean; compact?: boolean }

const HEIGHT = 4.6;
const RADIUS = 0.82;
const TURNS = 2.1;
const PAIRS = 32;

function helixPoint(t: number, phase: number) {
  const angle = t * Math.PI * 2 * TURNS + phase;
  return new THREE.Vector3(Math.cos(angle) * RADIUS, (t - 0.5) * HEIGHT, Math.sin(angle) * RADIUS);
}

function Sculpture({ paused = false, compact = false }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const ready = useRef(false);
  const palette = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    const color = (name: string) => new THREE.Color(`hsl(${css.getPropertyValue(name).trim().split(/\s+/).join(", ")})`);
    return { metal: color("--sculpture-metal"), lime: color("--primary"), coral: color("--accent"), light: color("--foreground") };
  }, []);
  const geometry = useMemo(() => {
    const strands = [0, Math.PI].map(phase => new THREE.CatmullRomCurve3(
      Array.from({ length: 181 }, (_, i) => helixPoint(i / 180, phase)),
    ));
    const pairs = Array.from({ length: PAIRS }, (_, i) => {
      const t = (i + 0.5) / PAIRS;
      const a = helixPoint(t, 0);
      const b = helixPoint(t, Math.PI);
      const midpoint = a.clone().add(b).multiplyScalar(0.5);
      const rotation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
      return { a, b, midpoint, rotation };
    });
    return { strands, pairs };
  }, []);
  const surface = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = palette.light.getStyle();
      ctx.fillRect(0, 0, 128, 128);
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = palette.metal.getStyle();
      for (let y = 0; y < 128; y += 8) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(128, y); ctx.stroke();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 18);
    return texture;
  }, [palette]);
  useEffect(() => () => surface.dispose(), [surface]);

  useFrame((state, delta) => {
    if (!ready.current) {
      state.gl.domElement.parentElement?.setAttribute("data-scene-ready", "true");
      ready.current = true;
    }
    if (paused || !group.current) return;
    const dt = Math.min(delta, 0.05);
    elapsed.current += dt;
    const t = elapsed.current;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.08 + state.pointer.y * 0.12, 3, dt);
    group.current.rotation.y = t * 0.22 + state.pointer.x * 0.24;
    group.current.rotation.z = -0.25 + Math.sin(t * 0.25) * 0.035 + Math.min(window.scrollY / 6000, 0.12);
    group.current.position.y = Math.sin(t * 0.5) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={4.5} color={palette.light} />
      <directionalLight position={[-4, -2, 3]} intensity={2} color={palette.lime} />
      <pointLight position={[2, -3, 1]} intensity={15} color={palette.coral} />
      <group position={compact ? [0.45, 0, 0] : [1.1, 0, 0]}>
        <group ref={group} rotation={[0.08, 0, -0.25]} scale={compact ? 0.95 : 1.05}>
          {geometry.strands.map((curve, i) => (
            <mesh key={i}>
              <tubeGeometry args={[curve, 240, 0.105, 12, false]} />
              <meshPhysicalMaterial map={surface} color={i === 0 ? palette.metal : palette.lime} metalness={0.45} roughness={0.24} clearcoat={1} />
            </mesh>
          ))}
          {geometry.pairs.map(({ midpoint, rotation }, i) => (
            <group key={i} position={midpoint} quaternion={rotation}>
              <mesh position={[0, -RADIUS / 2, 0]}>
                <cylinderGeometry args={[0.04, 0.04, RADIUS, 8]} />
                <meshStandardMaterial color={i % 3 === 0 ? palette.coral : palette.metal} metalness={0.35} roughness={0.3} />
              </mesh>
              <mesh position={[0, RADIUS / 2, 0]}>
                <cylinderGeometry args={[0.04, 0.04, RADIUS, 8]} />
                <meshStandardMaterial color={i % 3 === 0 ? palette.metal : palette.lime} metalness={0.35} roughness={0.3} />
              </mesh>
            </group>
          ))}
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
      aria-label="Rotating DNA double helix with intertwined silver and lime strands and molecular base pairs"
    >
      <Sculpture paused={paused} compact={compact} />
    </Canvas>
  );
}
