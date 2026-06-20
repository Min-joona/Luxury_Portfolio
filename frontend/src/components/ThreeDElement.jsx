import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const Atom = ({ position, color, size = 0.4 }) => (
  <mesh position={position}>
    <sphereGeometry args={[size, 32, 32]} />
    <MeshTransmissionMaterial
      backside
      samples={4}
      thickness={1}
      chromaticAberration={0.02}
      anisotropy={0.1}
      distortion={0.1}
      distortionScale={0.1}
      temporalDistortion={0.1}
      color={color}
    />
  </mesh>
);

const Bond = ({ start, end }) => {
  const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const distance = start.distanceTo(end);
  const direction = new THREE.Vector3().subVectors(end, start).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  return (
    <mesh position={midPoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.08, 0.08, distance, 16]} />
      <meshPhysicalMaterial
        color="#C0C0C0"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const MoleculeGroup = ({ darkMode }) => {
  const groupRef = useRef();

  const atoms = useMemo(() => [
    { pos: new THREE.Vector3(0, 0, 0), color: darkMode ? '#C0C0C0' : '#64748B', size: 0.6 },
    { pos: new THREE.Vector3(1.5, 1, 0), color: '#D4AF37' },
    { pos: new THREE.Vector3(-1.5, 0.8, 1), color: '#D4AF37' },
    { pos: new THREE.Vector3(0.5, -1.2, 1.2), color: darkMode ? '#F5F2EE' : '#1A0F0A' },
    { pos: new THREE.Vector3(-1, -1.5, -0.5), color: darkMode ? '#F5F2EE' : '#1A0F0A' },
    { pos: new THREE.Vector3(1.2, -0.5, -1.5), color: '#C0C0C0' },
  ], [darkMode]);

  const bonds = useMemo(() => [
    [atoms[0].pos, atoms[1].pos],
    [atoms[0].pos, atoms[2].pos],
    [atoms[0].pos, atoms[3].pos],
    [atoms[0].pos, atoms[4].pos],
    [atoms[0].pos, atoms[5].pos],
    [atoms[1].pos, atoms[2].pos],
  ], [atoms]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.rotation.z = time * 0.1;
  });

  return (
    <group ref={groupRef}>
      {atoms.map((atom, i) => (
        <Atom key={i} position={atom.pos} color={atom.color} size={atom.size} />
      ))}
      {bonds.map((bond, i) => (
        <Bond key={i} start={bond[0]} end={bond[1]} />
      ))}
    </group>
  );
};

const ThreeDElement = ({ darkMode }) => {
  return (
    <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={darkMode ? 0.3 : 0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <MoleculeGroup darkMode={darkMode} />
        </Float>
        <OrbitControls enableZoom={false} makeDefault />
      </Canvas>
    </div>
  );
};

export default ThreeDElement;