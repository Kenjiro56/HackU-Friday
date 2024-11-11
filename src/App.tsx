import React from "react";
import "./style.css"; //全画面表示
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls, Sampler } from "@react-three/drei"; //マウスイベント利用
import RotatingBox from "./components/Box";
import GashaponMachine from "./components/GashaponMachine";
import GashaponCapsule from "./components/GashaponCapsule";

const App: React.FC = () => {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <GashaponMachine />
        <GashaponCapsule />
      </Canvas>
    </div>
  );
};

export default App;
