import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';

// Chocolate Atom Component - Rich chocolate appearance
const ChocolateAtom = ({ position, size = 0.35 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        thickness={1.2}
        chromaticAberration={0.02}
        anisotropy={0.15}
        distortion={0.1}
        distortionScale={0.15}
        temporalDistortion={0.08}
        color="#5D4037"
        transmission={0.4}
        opacity={0.95}
        roughness={0.1}
        metalness={0.3}
        clearcoat={1}
        clearcoatRoughness={0.05}
        attenuationColor="#8D6E63"
        attenuationDistance={1.5}
      />
      {/* Inner chocolate core */}
      <mesh scale={0.7}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color="#4E342E"
          emissive="#3E2723"
          emissiveIntensity={0.1}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
      {/* Highlight for glossy effect */}
      <mesh scale={0.4} position={[size * 0.3, size * 0.3, size * 0.3]}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color="#D7CCC8" opacity={0.3} transparent />
      </mesh>
    </mesh>
  );
};

// Chrome Bond Component
const ChromeBond = ({ start, end }) => {
  const midPoint = useMemo(() => 
    new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5),
    [start, end]
  );
  
  const distance = useMemo(() => start.distanceTo(end), [start, end]);
  
  const direction = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(end, start).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir
    );
    return quaternion;
  }, [start, end]);

  return (
    <mesh position={midPoint} quaternion={direction}>
      <cylinderGeometry args={[0.04, 0.04, distance, 32]} />
      <meshPhysicalMaterial
        color="#E0E0E0"
        metalness={1}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.02}
        envMapIntensity={1}
      />
    </mesh>
  );
};

// Floating Particles
const FloatingParticles = ({ count = 15 }) => {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push([
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ]);
    }
    return temp;
  }, [count]);

  return (
    <>
      {points.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#8D6E63" opacity={0.4} transparent />
        </mesh>
      ))}
    </>
  );
};

// Main Molecule Group
const MoleculeGroup = () => {
  const groupRef = useRef();

  const atoms = useMemo(() => [
    { pos: new THREE.Vector3(0, 0, 0), size: 0.55 },           // Center
    { pos: new THREE.Vector3(1.2, 0.8, 0.2), size: 0.3 },      // Top right
    { pos: new THREE.Vector3(-1.1, 0.7, 0.3), size: 0.32 },    // Top left
    { pos: new THREE.Vector3(0.3, -1.0, 0.9), size: 0.28 },    // Bottom right
    { pos: new THREE.Vector3(-0.8, -1.2, -0.2), size: 0.26 },  // Bottom left
    { pos: new THREE.Vector3(1.0, -0.3, -1.1), size: 0.31 },   // Back right
    { pos: new THREE.Vector3(-0.2, 0.5, -1.2), size: 0.24 },   // Back left
    { pos: new THREE.Vector3(0.5, 1.1, -0.5), size: 0.22 },    // Top back
  ], []);

  const bonds = useMemo(() => [
    [atoms[0].pos, atoms[1].pos],
    [atoms[0].pos, atoms[2].pos],
    [atoms[0].pos, atoms[3].pos],
    [atoms[0].pos, atoms[4].pos],
    [atoms[0].pos, atoms[5].pos],
    [atoms[0].pos, atoms[6].pos],
    [atoms[0].pos, atoms[7].pos],
    [atoms[1].pos, atoms[7].pos],
    [atoms[2].pos, atoms[7].pos],
  ], [atoms]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {atoms.map((atom, i) => (
        <ChocolateAtom key={i} position={atom.pos} size={atom.size} />
      ))}
      {bonds.map((bond, i) => (
        <ChromeBond key={i} start={bond[0]} end={bond[1]} />
      ))}
      <FloatingParticles count={20} />
    </group>
  );
};

// Flip Card Component
const FlipCard = ({ darkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto" style={{ perspective: '1200px' }}>
      <motion.div
        className="relative w-full aspect-[4/3] cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 200, damping: 20 }}
        onClick={handleFlip}
      >
        {/* Front - 3D Chocolate Molecule */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            boxShadow: darkMode 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(93, 64, 55, 0.3)' 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(93, 64, 55, 0.1)'
          }}
        >
          {/* Chocolate gradient background */}
          <div 
            className="absolute inset-0"
            style={{
              background: darkMode 
                ? 'radial-gradient(ellipse at 30% 30%, #4A3728 0%, #2C1B14 40%, #1A0F0A 100%)'
                : 'radial-gradient(ellipse at 30% 30%, #8D6E63 0%, #5D4037 40%, #3E2723 100%)'
            }}
          />
          
          {/* Ambient lighting effect */}
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)'
            }}
          />
          
          {/* 3D Canvas */}
          <Canvas 
            camera={{ position: [0, 0, 5.5], fov: 45 }} 
            dpr={[1, 2]}
            className="absolute inset-0"
          >
            {/* Warm lighting setup */}
            <ambientLight intensity={0.3} color="#FFE0B2" />
            <spotLight 
              position={[8, 8, 8]} 
              angle={0.4} 
              penumbra={0.5} 
              intensity={1.2}
              color="#FFF8E1"
              castShadow
            />
            <pointLight position={[-8, -8, -8]} intensity={0.6} color="#D7CCC8" />
            <pointLight position={[5, -5, 5]} intensity={0.4} color="#A1887F" />
            <pointLight position={[-3, 5, 3]} intensity={0.3} color="#8D6E63" />
            
            <Float 
              speed={1.5} 
              rotationIntensity={0.2} 
              floatIntensity={0.3}
            >
              <MoleculeGroup />
            </Float>
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate={false}
              enableRotate={true}
              rotateSpeed={0.5}
            />
          </Canvas>

          {/* Gradient overlay for depth */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(93,64,55,0.2) 0%, transparent 50%, rgba(62,39,35,0.3) 100%)'
            }}
          />

          {/* Flip hint */}
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md text-[10px] font-mono tracking-wider border"
            style={{
              backgroundColor: darkMode ? 'rgba(93, 64, 55, 0.6)' : 'rgba(141, 110, 99, 0.6)',
              borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)',
              color: '#FFF8E1'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Sparkles size={12} />
            Click to flip
          </motion.div>
        </div>

        {/* Back - Photo */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: darkMode 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face"
            alt="Developer Portrait"
            className="w-full h-full object-cover"
          />
          
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)'
            }}
          />

          <motion.div 
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-md text-[10px] font-mono tracking-wider border"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: '#FFF'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Click to flip back
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
