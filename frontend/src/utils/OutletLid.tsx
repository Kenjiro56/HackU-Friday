import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";

export default function OutletLid() {
  const outletLidRef = useRef<THREE.Group>(null); // 取り出し口の蓋用のRef
  const outletLidStartPosition = new THREE.Vector3(0, 0, 0); // 取り出し口の蓋の初期位置
  const outletLidTargetPosition = new THREE.Vector3(0, -0.2, 0.2); // 取り出し口の蓋の目標位置
  const outletLidRotationRef = useRef(0); // 取り出し口の蓋の回転角度

  const [isStarted, setIsStarted] = useState(false); // 動きが始まったかどうか

  const waitTime = 800; // 待機時間（ミリ秒）

  // 待機時間後に動きを開始
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true); // 動き開始フラグを立てる
    }, waitTime);

    return () => clearTimeout(timer); // クリーンアップ
  }, []);
  useFrame(() => {
    if (!isStarted) return; // 動きが始まるまで何もせず待機
    if (outletLidRef.current) {
      // 回転速度を設定
      const angleIncrement = 0.05;

      // 取り出し口の蓋の回転
      if (outletLidRotationRef.current < (Math.PI * 2) / 3) {
        outletLidRotationRef.current += angleIncrement;
        if (outletLidRotationRef.current >= (Math.PI * 2) / 3) {
          outletLidRotationRef.current = (Math.PI * 2) / 3;
        }
        outletLidRef.current.position.lerp(outletLidTargetPosition, 0.05); // 目標位置に向けて補間
      }
      outletLidRef.current.rotation.x = outletLidRotationRef.current;
    }
  });

  return (
    <group position={[0, -0.6, 0.85]}>
      {/* 取り出し口の蓋 */}
      <group ref={outletLidRef}>
        <animated.mesh
          position={outletLidStartPosition}
          rotation={[-Math.PI / 9, 0, 0]}
        >
          <RoundedBox args={[0.5, 0.3, 0.02]} radius={0.01} smoothness={4}>
            <meshStandardMaterial color="#FDFCF6" />
          </RoundedBox>
        </animated.mesh>
      </group>
    </group>
  );
}
