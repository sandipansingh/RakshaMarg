import React, { useMemo, useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Instances, Instance, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// --- 1. ADVANCED SHIELD SHADER (Hexagon Grid + Pulse) ---
const ShieldMaterial = shaderMaterial(
  { 
    uTime: 0, 
    uColor: new THREE.Color('#6366f1'),
    uRimColor: new THREE.Color('#a5b4fc') 
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uRimColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;

    // Hexagon Grid Function
    float hex(vec2 p) {
      p.x *= 0.57735 * 2.0;
      p.y += mod(floor(p.x), 2.0) * 0.5;
      p = abs((mod(p, 1.0) - 0.5));
      return abs(max(p.x * 1.5 + p.y, p.y * 2.0) - 1.0);
    }

    void main() {
      // 1. Fresnel (Edge Glow)
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);

      // 2. Hexagon Pattern
      vec2 gridUv = vUv * 30.0; 
      gridUv.y += uTime * 0.5; 
      float grid = hex(gridUv);
      float gridLine = smoothstep(0.05, 0.0, grid);

      // 3. Scanline Pulse REMOVED as per previous request
      float scanline = 0.0;

      // Combine Effects
      float alpha = (fresnel * 1.5) + (gridLine * 0.4);
      
      // Color mixing
      vec3 finalColor = mix(uColor, uRimColor, fresnel);

      // Reduced Master Opacity
      gl_FragColor = vec4(finalColor, alpha * 0.2); 
    }
  `
);

extend({ ShieldMaterial });

// --- 2. MAIN CITY COMPONENT ---
export const CityMap = () => {
  const isMobile = useIsMobile();

  // OPTIMIZATION: Drastically reduce counts on mobile
  // Mobile: 60 buildings / 10 cars
  // Desktop: 500 buildings / 40 cars
  const buildingCount = isMobile ? 60 : 500;
  const carCount = isMobile ? 10 : 40;

  // Generate Buildings & Cars
  const { buildings, cars } = useMemo(() => {
    const buildingData = [];
    const carData = [];

    // Reduce spread slightly to keep city dense around the shield
    for (let i = 0; i < buildingCount; i++) {
      const h = Math.random() * 4 + 1;
      const w = Math.random() * 1.5 + 0.5;
      const d = Math.random() * 1.5 + 0.5;
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      if (Math.abs(x) < 5 || Math.abs(z) < 5) continue; // Bigger clearing for shield
      buildingData.push({ x, z, h, w, d });
    }

    for (let i = 0; i < carCount; i++) {
        const speed = Math.random() * 0.1 + 0.05;
        const lane = (Math.random() > 0.5 ? 2.5 : -2.5);
        const offset = Math.random() * 100;
        carData.push({ speed, lane, offset });
    }
    return { buildings: buildingData, cars: carData };
  }, [buildingCount, carCount]);

  return (
    <group>
      {/* GROUND */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#080808" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* BUILDINGS (Dark Metal) */}
      <Instances range={buildings.length}>
        <boxGeometry />
        <meshStandardMaterial color="#1a1a24" roughness={0.2} metalness={0.9} />
        {buildings.map((data, i) => (
          <Instance
            key={`body-${i}`}
            position={[data.x, data.h / 2, data.z]}
            scale={[data.w, data.h, data.d]}
          />
        ))}
      </Instances>

      {/* ROOF LIGHTS */}
      <Instances range={buildings.length}>
        <boxGeometry />
        <meshStandardMaterial color="#000000" emissive="#2dd4bf" emissiveIntensity={2} toneMapped={false} />
        {buildings.map((data, i) => (
          <Instance
            key={`roof-${i}`}
            position={[data.x, data.h + 0.05, data.z]}
            scale={[data.w * 0.9, 0.1, data.d * 0.9]}
          />
        ))}
      </Instances>

      {/* TRAFFIC */}
      <TrafficLines cars={cars} />

      {/* --- VISIBLE SHIELD --- */}
      <Shield />

    </group>
  );
};

// --- 3. SHIELD COMPONENT ---
const Shield = () => {
  const materialRef = useRef<any>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
        materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <group position={[0, 0, 0]}>
       {/* DOME */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[10, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {/* @ts-ignore */}
        <shieldMaterial 
            ref={materialRef} 
            transparent 
            depthWrite={false} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending} 
            uColor={new THREE.Color("#6366f1")} 
            uRimColor={new THREE.Color("#a5b4fc")} 
        />
      </mesh>
      
      {/* GROUND RING (Base of the shield) */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[9.8, 10, 64]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// TRAFFIC COMPONENT
const TrafficLines = ({ cars }: { cars: any[] }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.children.forEach((mesh, i) => {
            const data = cars[i];
            mesh.position.z = ((state.clock.elapsedTime * 20 * data.speed) + data.offset) % 80 - 40;
        });
    });

    return (
        <group ref={groupRef}>
            {cars.map((data, i) => (
                 <mesh key={i} position={[data.lane, 0.1, 0]}>
                    <boxGeometry args={[0.2, 0.2, 1.5]} />
                    <meshBasicMaterial color={data.lane > 0 ? "#ff0040" : "#ffffff"} toneMapped={false} />
                 </mesh>
            ))}
        </group>
    )
}
