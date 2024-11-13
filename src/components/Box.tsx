import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Mesh } from "three";
import { RoundedBox } from "@react-three/drei";

// 回転する立方体
const RotatingBox: React.FC = () => {
  const meshRef = useRef<Mesh>(null);
  return (
    <mesh ref={meshRef}>
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="orange" />
      </RoundedBox>
      <meshStandardMaterial />
    </mesh>
  );
};

export default RotatingBox;
