import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import GashaponCapsule from "./GashaponCapsule";
import Capsule from "./Capsule";

export default function GashaponMachine() {
  const [isOutletOpen, setOutletOpen] = useState(false);

  // 取り出し口の蓋の排出アニメーション
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOutletOpen(true);
    }, 1000); // 1秒後にカプセルを開く
    return () => clearTimeout(timeout);
  }, []);

  return (
    <group>
      {/* 上部の透明な球体 */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial color="white" opacity={0.3} transparent />
      </mesh>

      {/* 中のカプセルを配置 */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Capsule key={i} />
      ))}

      {/* 下部の本体 */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.55, 1, 1.4, 100]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>

      {/* 取っ手の土台 */}
      <mesh position={[0, -0.1, 0.6]} rotation={[(Math.PI * 80) / 180, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* 取っ手 */}
      <mesh position={[0, -0.1, 0.67]} rotation={[(Math.PI * 80) / 180, 0, 0]}>
        <boxGeometry args={[0.25, 0.2, 0.05]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* 取り出し口 */}
      <mesh position={[0, -0.6, 0.8]} rotation={[-Math.PI / 9, 0, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.1]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* 取り出し口の蓋 */}
      <mesh
        position={isOutletOpen ? [0, -0.8, 1] : [0, -0.6, 0.85]}
        rotation={
          isOutletOpen ? [(Math.PI * 2) / 3, 0, 0] : [-Math.PI / 9, 0, 0]
        }
      >
        <boxGeometry args={[0.5, 0.3, 0.02]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}
