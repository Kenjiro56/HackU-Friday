import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 球体コンポーネント
export default function InsideCapsule() {
  const meshRef = useRef<THREE.Mesh>(null);

  // カプセルの色をランダムに設定
  const color = useMemo(() => {
    const colors = ["#6CB9FF", "#FCC605", "#FC842E"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  // 球体の中心から半径1の範囲内でランダムに初期位置を設定
  const [position] = useState(() => {
    const randomPosition = new THREE.Vector3(
      (Math.random() - 0.5) * 1, // -1 から 1 の範囲
      (Math.random() - 0.5) * 1, // -1 から 1 の範囲
      (Math.random() - 0.5) * 1 // -1 から 1 の範囲
    );
    // ランダムな位置が球体内に収まるようにする
    if (randomPosition.length() > 0.8) {
      randomPosition.setLength(0.8); // 半径1の球体内に収める
    }
    return randomPosition;
  });

  const [velocity] = useState(
    () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.005, // ランダムな速度
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      )
  );

  // アニメーションフレームごとに位置を更新
  useFrame(() => {
    if (meshRef.current) {
      // 位置を更新
      meshRef.current.position.add(velocity);

      // 新しい位置が半径1を超えないように制限
      if (meshRef.current.position.length() > 0.8) {
        // 半径1の範囲を超えないように反転
        meshRef.current.position.setLength(0.8);
        velocity.negate(); // 反転して戻る方向に
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.13, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
