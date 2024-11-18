'use client';
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import * as THREE from "three";
interface EmmisionCapsuleProps {
  time_id: number;
}

export default function EmmisionCapsule({time_id}: EmmisionCapsuleProps) {
  const topCapsuleRef = useRef<THREE.Group>(null); // 上部カプセル用のRef
  const bottomCapsuleRef = useRef<THREE.Group>(null); // 下部カプセル用のRef

  const topStartPosition = new THREE.Vector3(0, -1, 0); // 上部カプセルの初期位置
  const bottomStartPosition = new THREE.Vector3(0, -1, 0); // 下部カプセルの初期位置

  const topTargetPosition = new THREE.Vector3(0, 0.6, 1); // 上部カプセルの目標位置
  const bottomTargetPosition = new THREE.Vector3(0, 0.6, 1); // 下部カプセルの目標位置

  const [isStarted, setIsStarted] = useState(false); // 動きが始まったかどうか

  const waitTime = 500; // 待機時間（ミリ秒）

  const pickColor = () => {
    switch (time_id) {
      case 0:
        return "#FCC605";
      case 1:
        return "#6CB9FF";
      case 2:
        return "#FC842E";
      default:
        return "#FC842E";
    }
  };


  // 待機時間後に動きを開始
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true); // 動き開始フラグを立てる
    }, waitTime);

    return () => clearTimeout(timer); // クリーンアップ
  }, []);
  useFrame(() => {
    if (!isStarted) return; // 動きが始まるまで何もせず待機
    if (topCapsuleRef.current && bottomCapsuleRef.current) {
      // 回転速度を設定
      const angleIncrement = 0.05;

      // 上部カプセルの位置移動
      topCapsuleRef.current.position.lerp(topTargetPosition, 0.05); // 目標位置に向けて補間

      // 下部カプセルの位置移動
      bottomCapsuleRef.current.position.lerp(bottomTargetPosition, 0.05); // 目標位置に向けて補間
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 上部カプセル */}
      <group ref={topCapsuleRef}>
        <animated.mesh
          position={topStartPosition}
          rotation={[0, 0, Math.PI / 2]}
        >
          <sphereGeometry args={[0.3, 32, 32, Math.PI / 2, Math.PI]} />
          {/* <meshStandardMaterial color="#FCC605" /> */}
          <meshStandardMaterial color={pickColor()} />
        </animated.mesh>
      </group>

      {/* 下部カプセル */}
      <group ref={bottomCapsuleRef}>
        <animated.mesh
          position={bottomStartPosition}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <sphereGeometry args={[0.3, 32, 32, Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="#FDFCF6" />
        </animated.mesh>
      </group>
    </group>
  );
}
