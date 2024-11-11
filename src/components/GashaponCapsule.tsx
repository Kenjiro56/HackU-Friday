import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import * as THREE from "three";

export default function GashaponCapsule() {
  const topCapsuleRef = useRef<THREE.Group>(null); // 上部カプセル用のRef
  const bottomCapsuleRef = useRef<THREE.Group>(null); // 下部カプセル用のRef

  const topStartPosition = new THREE.Vector3(0, 0.1, 0); // 上部カプセルの初期位置
  const bottomStartPosition = new THREE.Vector3(0, 0.1, 0); // 下部カプセルの初期位置

  const topTargetPosition = new THREE.Vector3(-0.02, 0.23, 0); // 上部カプセルの目標位置
  const bottomTargetPosition = new THREE.Vector3(0, -0.1, 0); // 下部カプセルの目標位置

  const topRotationRef = useRef(0); // 上部カプセルの回転角度
  const bottomRotationRef = useRef(0); // 下部カプセルの回転角度
  const [isStarted, setIsStarted] = useState(false); // 動きが始まったかどうか
  const waitTime = 3000; // 待機時間（ミリ秒）

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

      // 上部カプセルの回転
      if (topRotationRef.current < (Math.PI * 1) / 3) {
        topRotationRef.current += angleIncrement;
        if (topRotationRef.current >= (Math.PI * 1) / 3) {
          topRotationRef.current = (Math.PI * 1) / 3;
        }
      }
      topCapsuleRef.current.rotation.z = topRotationRef.current;

      // 下部カプセルの回転
      if (bottomRotationRef.current < (Math.PI * 3) / 5) {
        bottomRotationRef.current += angleIncrement;
        if (bottomRotationRef.current >= (Math.PI * 3) / 5) {
          bottomRotationRef.current = (Math.PI * 3) / 5;
        }
      }
      bottomCapsuleRef.current.rotation.y = bottomRotationRef.current;

      // 上部カプセルの位置移動
      topCapsuleRef.current.position.lerp(topTargetPosition, 0.05); // 目標位置に向けて補間

      // 下部カプセルの位置移動
      bottomCapsuleRef.current.position.lerp(bottomTargetPosition, 0.05); // 目標位置に向けて補間
    }
  });

  return (
    <group position={[0, -0.5, 1]}>
      {/* 上部カプセル */}
      <group ref={topCapsuleRef}>
        <animated.mesh
          position={topStartPosition}
          rotation={[0, 0, Math.PI / 2]}
        >
          <sphereGeometry args={[0.3, 32, 32, Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="blue" />
        </animated.mesh>
      </group>

      {/* 下部カプセル */}
      <group ref={bottomCapsuleRef}>
        <animated.mesh
          position={bottomStartPosition}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <sphereGeometry args={[0.3, 32, 32, Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="white" />
        </animated.mesh>
      </group>
    </group>
  );
}
