import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";

function ShoeModel({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.2 / maxDim;
    ref.current.scale.setScalar(scale);
    // Center the model
    const center = new THREE.Vector3();
    box.getCenter(center);
    ref.current.position.sub(center.multiplyScalar(scale));
  }, [scene]);

  return <primitive ref={ref} object={scene} />;
}

function Loader() {
  return (
    <Html center>
      <div style={{ color: "#17181A", opacity: 0.4, fontSize: 13 }}>Loading 3D...</div>
    </Html>
  );
}

function FallbackMesh() {
  return (
    <mesh>
      <boxGeometry args={[1.5, 1, 2.5]} />
      <meshStandardMaterial color="#FF4B1F" roughness={0.4} metalness={0.3} />
    </mesh>
  );
}

export default function ProductViewer3D({ modelUrl }) {
  const controlsRef = useRef();

  return (
    <div
      className="w-full bg-[#F0F0EC] rounded-3xl overflow-hidden"
      style={{ aspectRatio: "1" }}
    >
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, -2, -5]} intensity={0.4} />
          <Environment preset="studio" />
          <ErrorBoundary fallback={<FallbackMesh />}>
            <ShoeModel modelUrl={modelUrl} />
          </ErrorBoundary>
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={2}
            maxDistance={5}
            autoRotate
            autoRotateSpeed={1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
