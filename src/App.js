import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import model from "./Soldier.glb";

// Soldier Component with Animation
function Soldier({ url, position, animationName }) {
  console.log(url)
  const { scene, animations } = useGLTF(url);
  const clonedScene = clone(scene); // Deep clone to avoid sharing animations
  const soldierRef = useRef();
  const { actions } = useAnimations(animations, soldierRef);

  // Play the assigned animation
  useFrame(() => {
    if (actions[animationName]) {
      actions[animationName].play();
    }
  });

  return <primitive ref={soldierRef} object={clonedScene} position={position} scale={[5, 5, 5]} />;
}

export default function App() {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 3, 12], fov: 50 }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} />

      <Suspense fallback={null}>
        {/* Three Soldiers with Different Animations */}
        <Soldier url={model} position={[-5, 0, 0]} animationName="Idle" />
        <Soldier url={model} position={[0, 0, 0]} animationName="Walk" />
        <Soldier url={model} position={[5, 0, 0]} animationName="Run" />
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}
