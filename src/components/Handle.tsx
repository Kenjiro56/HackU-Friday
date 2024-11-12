import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Capsule() {
  const handleRef = useRef<THREE.Mesh>(null); // ハンドル用のRef
  const rotationSpeed = 0.05; // 回転速度を固定
  const [rotationAngle, setRotationAngle] = useState(0); // 回転角度を保持

  useFrame(() => {
    if (handleRef.current) {
      if (rotationAngle < Math.PI) {
        const newAngle = rotationAngle + rotationSpeed;
        setRotationAngle(newAngle);
        handleRef.current.rotation.y = newAngle;
      }
    }
  });

  return (
    <mesh
      ref={handleRef}
      position={[0, -0.1, 0.67]}
      rotation={[(Math.PI * 80) / 180, 0, 0]}
    >
      <boxGeometry args={[0.25, 0.2, 0.05]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}
