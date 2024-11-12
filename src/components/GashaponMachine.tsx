export default function GashaponMachine() {
  return (
    <group>
      {/* 上部の透明な球体 */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial color="#FDFCF6" opacity={0.3} transparent />
      </mesh>

      {/* 下部の本体 */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.55, 1, 1.4, 100]} />
        <meshStandardMaterial color="#6CB9FF" />
      </mesh>

      {/* 取っ手の土台 */}
      <mesh position={[0, -0.1, 0.6]} rotation={[(Math.PI * 80) / 180, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 32]} />
        <meshStandardMaterial color="#FDFCF6" />
      </mesh>

      {/* 取り出し口 */}
      <mesh position={[0, -0.6, 0.8]} rotation={[-Math.PI / 9, 0, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </group>
  );
}
