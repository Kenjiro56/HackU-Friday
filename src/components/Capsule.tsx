// Capsule.tsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Capsule() {
  const capsuleRef = useRef<THREE.Mesh>(null!);

  // カプセルの色をランダムに設定
  const color = useMemo(() => {
    const colors = ["skyblue", "red", "green", "yellow", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  // ランダムな動きのための変数を生成
  const speed = 0.01 + Math.random() * 0.1; // カプセルの速度
  const amplitude = 0.33 + Math.random() * 0.3; // 振幅

  useFrame(({ clock }) => {
    if (capsuleRef.current) {
      const time = clock.getElapsedTime();
      capsuleRef.current.position.y = 1 + Math.sin(time * speed) * amplitude;
      capsuleRef.current.position.x = Math.sin(time * speed * 1.5) * amplitude;
      capsuleRef.current.position.z = Math.cos(time * speed * 1.5) * amplitude;
    }
  });

  return (
    <mesh ref={capsuleRef} position={[0, -0.5, 0]}>
      <sphereGeometry args={[0.13, 100, 100]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Capsule;
