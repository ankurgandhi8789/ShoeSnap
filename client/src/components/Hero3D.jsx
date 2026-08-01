import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";

function FloatingShoe() {
  const { scene } = useGLTF("/models/hero-sneaker.glb");
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    // Auto-fit: normalize model to fit inside a 2-unit box
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    ref.current.scale.setScalar(scale);
    // Center it
    const center = new THREE.Vector3();
    box.getCenter(center);
    ref.current.position.sub(center.multiplyScalar(scale));
  }, [scene]);

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <primitive ref={ref} object={scene} rotation={[0.1, 0.5, 0]} />
    </Float>
  );
}

function PlaceholderMesh() {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh>
        <torusGeometry args={[1, 0.4, 16, 60]} />
        <meshStandardMaterial color="#FF4B1F" roughness={0.3} metalness={0.4} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <section className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <ErrorBoundary fallback={<PlaceholderMesh />}>
            <FloatingShoe />
          </ErrorBoundary>
          <Environment preset="studio" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
          />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 flex flex-col justify-center px-10 pointer-events-none">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#17181A]/40 mb-2">
          New collection
        </p>
        <h1 className="text-4xl font-bold text-[#17181A] leading-tight max-w-xs">
          Step into the future
        </h1>
        <p className="text-sm text-[#17181A]/60 mt-2">Drag to spin · Scroll to zoom</p>
      </div>
    </section>
  );
}
