import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Card({ image, title, link, index, total, radius, zOffset, onCardClick, activeCard }) {
  const meshRef = useRef();
  const texture = useTexture(image);
  const angle = (index / total) * Math.PI * 2;

  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius + zOffset;

  const isActive = activeCard === index;
  const scale = isActive ? 1.15 : 1;

  return (
    <mesh
      ref={meshRef}
      position={[x, 0, z]}
      rotation={[0, -angle + Math.PI, 0]}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onCardClick(index, link);
      }}
    >
      <planeGeometry args={[2.4, 1.8]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

function TunnelRing({ designs, ringIndex, ringCount, onCardClick, activeCard }) {
  const radius = 5 - ringIndex * 0.6;
  const zOffset = -ringIndex * 3.5;

  return designs.map((d, i) => (
    <Card
      key={d._id}
      image={d.image}
      title={d.title}
      link={d.link}
      index={i}
      total={designs.length}
      radius={radius}
      zOffset={zOffset}
      onCardClick={onCardClick}
      activeCard={activeCard}
    />
  ));
}

function TunnelGroup({ designs, onCardClick, activeCard }) {
  const groupRef = useRef();
  const mouseX = useRef(0);
  const targetRotation = useRef(0);
  const autoRotate = useRef(true);
  const lastInteraction = useRef(Date.now());

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const now = Date.now();

    if (autoRotate.current) {
      targetRotation.current += delta * 0.12;
    }

    if (now - lastInteraction.current > 3000) {
      autoRotate.current = true;
    }

    groupRef.current.rotation.y += (targetRotation.current - groupRef.current.rotation.y) * 0.05;
  });

  const handlePointerDown = useCallback((e) => {
    autoRotate.current = false;
    lastInteraction.current = Date.now();
    mouseX.current = e.clientX;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (autoRotate.current) return;
    const dx = e.clientX - mouseX.current;
    targetRotation.current += dx * 0.005;
    mouseX.current = e.clientX;
  }, []);

  const designsPerRing = Math.ceil(designs.length / 3);

  const rings = useMemo(() => {
    const result = [];
    for (let r = 0; r < 3; r++) {
      const slice = designs.slice(r * designsPerRing, (r + 1) * designsPerRing);
      if (slice.length > 0) {
        result.push(
          <TunnelRing
            key={r}
            designs={slice}
            ringIndex={r}
            ringCount={3}
            onCardClick={onCardClick}
            activeCard={activeCard}
          />
        );
      }
    }
    return result;
  }, [designs, onCardClick, activeCard, designsPerRing]);

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      {rings}
    </group>
  );
}

function TunnelLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
    </>
  );
}

function CameraController() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.y = Math.sin(t * 0.15) * 0.5;
    camera.lookAt(0, 0, -3);
  });
  return null;
}

const DesignTunnel = ({ designs, darkMode }) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = useCallback((index, link) => {
    setActiveCard(index);
    if (link) {
      setTimeout(() => window.open(link, '_blank'), 300);
    }
  }, []);

  if (!designs || designs.length === 0) return null;

  return (
    <div className="w-full h-[520px] lg:h-[600px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing relative">
      <Canvas
        camera={{ position: [0, 0.5, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={darkMode ? ['#0d0705'] : ['#f5f0eb']} />
        <TunnelLights />
        <CameraController />
        <TunnelGroup
          designs={designs}
          onCardClick={handleCardClick}
          activeCard={activeCard}
        />
      </Canvas>
    </div>
  );
};

export default DesignTunnel;
