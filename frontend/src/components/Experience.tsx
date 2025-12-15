import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Environment } from '@react-three/drei';
import { CityMap } from './3d/CityMap';
import { SceneController } from './3d/SceneController';
import { useIsMobile } from '@/hooks/use-mobile';

export const Experience = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] pointer-events-none">
      <Canvas 
        shadows={!isMobile} // Disable shadows on mobile
        dpr={isMobile ? 1 : [1, 2]} // Cap pixel ratio on mobile
        camera={{ fov: 35, near: 1, far: 200 }}
      >
        {/* 1. REALISTIC LIGHTING & REFLECTIONS */}
        <Environment preset="city" environmentIntensity={0.2} />
        
        <fog attach="fog" args={['#050505', 10, 50]} />
        <ambientLight intensity={0.2} color="#ffffff" />
        
        {/* Cinematic Rim Lights */}
        <pointLight position={[20, 20, 10]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-20, 10, -10]} intensity={2} color="#2dd4bf" />

        {/* 2. THE CITY CONTENT */}
        <CityMap />
        
        <SceneController />

        {/* 3. POST PROCESSING (Only on Desktop) */}
        {!isMobile && (
          <EffectComposer disableNormalPass>
            {/* Intense Glow for the neon signs */}
            <Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.8} radius={0.6} />
            {/* Film Grain for texture */}
            <Noise opacity={0.08} />
            {/* Vignette to focus eyes on center */}
            <Vignette eskil={false} offset={0.1} darkness={0.6} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};