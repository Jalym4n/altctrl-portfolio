import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps { paused?: boolean; compact?: boolean }

function Sculpture({ paused = false, compact = false }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const filament = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);
  const palette = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    const color = (name: string) => new THREE.Color(`hsl(${css.getPropertyValue(name).trim().split(/\s+/).join(", ")})`);
    return { metal: color("--sculpture-metal"), lime: color("--primary"), coral: color("--accent"), light: color("--foreground") };
  }, []);

  useFrame((state, delta) => {
    if (paused || !group.current) return;
    elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.35 + Math.sin(t * 0.2) * 0.13 + state.pointer.y * 0.18, 3, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, t * 0.12 + state.pointer.x * 0.35, 2, delta);
    group.current.rotation.z = Math.sin(t * 0.15) * 0.12 + Math.min(window.scrollY / 1800, 0.6);
    group.current.position.y = Math.sin(t * 0.45) * 0.1;
    if (filament.current) filament.current.rotation.z = t * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={4.5} color={palette.light} />
      <directionalLight position={[-4, -2, 3]} intensity={2} color={palette.lime} />
      <pointLight position={[2, -3, 1]} intensity={15} color={palette.coral} />
      <group position={compact ? [0.45, 0, 0] : [1.1, 0, 0]}>
        <group ref={group} rotation={[0.35, -0.3, 0]} scale={compact ? 0.9 : 1.12}>
          <mesh>
            <torusKnotGeometry args={[1.55, 0.39, 320, 40, 2, 3]} />
            <meshPhysicalMaterial color={palette.metal} metalness={0.72} roughness={0.22} clearcoat={1} clearcoatRoughness={0.12} />
          </mesh>
          <mesh scale={1.018}>
            <torusKnotGeometry args={[1.55, 0.39, 160, 12, 2, 3]} />
            <meshBasicMaterial color={palette.light} wireframe transparent opacity={0.12} />
          </mesh>
          <mesh ref={filament} rotation={[0.8, 0.5, 0.2]}>
            <torusKnotGeometry args={[2.0, 0.022, 360, 6, 3, 2]} />
            <meshBasicMaterial color={palette.lime} />
          </mesh>
          <mesh rotation={[0.3, 1.2, 0.7]}>
            <torusGeometry args={[2.65, 0.008, 6, 160]} />
            <meshBasicMaterial color={palette.metal} transparent opacity={0.4} />
          </mesh>
          <mesh rotation={[1.3, 0.5, -0.3]}>
            <torusGeometry args={[2.5, 0.012, 6, 160, Math.PI * 1.5]} />
            <meshBasicMaterial color={palette.lime} transparent opacity={0.75} />
          </mesh>
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
      aria-label="Rotating chrome sculpture threaded with lime-green orbital lines"
    >
      <Sculpture paused={paused} compact={compact} />
    </Canvas>
  );
}