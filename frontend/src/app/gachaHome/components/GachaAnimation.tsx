'use client';
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GashaponMachine from "./GashaponMachine";
import Handle from "./Handle";
import OutletLid from "./OutletLid";
import GashaponCapsule from "./GashaponCapsule";
import EmmisionCapsule from "./EmmisionCapsule";
import InsideCapsule from "./InsideCapsule";

interface GachaAnimationProps {
  time_id: number;
}

const GachaAnimation: React.FC<GachaAnimationProps> = ( { time_id }) => {
  const [showEmmisionCapsule, setShowEmmisionCapsule] = useState(false);
  const [showGashaponCapsule, setShowGashaponCapsule] = useState(false);

  useEffect(() => {
    // 秒ごとに各コンポーネントの表示を切り替える
    const timers = [
      setTimeout(() => setShowEmmisionCapsule(true), 1000), // 1000ms後に排出カプセル表示
      setTimeout(() => setShowEmmisionCapsule(false), 2500), // 2500ms後に排出カプセル消去
      setTimeout(() => setShowGashaponCapsule(true), 2500), // 2500ms後にカプセルアニメーションを表示

    ];
    // { playSound()}

    // クリーンアップ
    return () => timers.forEach(clearTimeout);
  }, []);

  const playSound = () => {
    const audio = new Audio("/sounds/gachaSE.mp3");
    audio.play();
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex px-4 items-center">
        {/* 背景のオーバーレイ */}
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex bg-white rounded-[30px] border-2 border-black relative justify-center items-center p-4">
        <Canvas camera={{ position: [0, 0, 4] }} style={{
            width: '80vw', // ビューポート幅の80%
            height: '60vh', // ビューポート高さの60%
        }}>
          <ambientLight color={0xffffff} intensity={1} />
          <hemisphereLight
            color={0xffffff}
            groundColor={0x444444}
            intensity={1}
          />

          <spotLight
            color={0xffffff}
            intensity={3}
            position={[0, 1, 3]}
            angle={Math.PI / 6}
            penumbra={0.1}
            distance={100}
            decay={2}
            castShadow
          />

          <OrbitControls />
          <group position={[0, 1, 0]}>
            {/* グループ全体をy軸方向に+1 */}
            {Array.from({ length: 15 }).map((_, index) => (
              <InsideCapsule key={index} />
            ))}
          </group>

          {/* 各コンポーネントの表示を条件付きレンダリング */}
          <GashaponMachine time_id= {time_id} />
          <Handle />
          <OutletLid />
          {showEmmisionCapsule && <EmmisionCapsule time_id={ time_id } />}
          {showGashaponCapsule && <GashaponCapsule time_id={ time_id }  />}
        </Canvas>

      </div>
    </div>
  </div>
  );
};

export default GachaAnimation;
