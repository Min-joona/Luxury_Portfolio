import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Card({ image, title, category, link, cardAngle, radius, isHovered, onHover, onClick, groupRef }) {
  const meshRef = useRef();
  const texture = useTexture(image);

  const x = Math.sin(cardAngle) * radius;
  const z = Math.cos(cardAngle) * radius;

  useFrame(() => {
    if (!meshRef.current || !groupRef.current) return;

    const groupRot = groupRef.current.rotation.y;
    const effectiveAngle = cardAngle + groupRot;
    const frontness = Math.max(0, Math.cos(effectiveAngle));

    const baseScale = 0.25 + 0.75 * frontness;
    const desiredScale = isHovered ? 1.3 : baseScale;

    meshRef.current.scale.x += (desiredScale - meshRef.current.scale.x) * 0.07;
    meshRef.current.scale.y += (desiredScale - meshRef.current.scale.y) * 0.07;

    const targetZ = z + (isHovered ? 1.2 : 0);
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.07;

    const mat = meshRef.current.material;
    const targetOpacity = 0.1 + 0.9 * frontness;
    mat.opacity += (targetOpacity - mat.opacity) * 0.05;
    mat.transparent = true;
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, 0, z]}
      rotation={[0, -cardAngle, 0]}
      onClick={(e) => { e.stopPropagation(); if (link) window.open(link, '_blank'); }}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); document.body.style.cursor = 'default'; }}
    >
      <planeGeometry args={[2.4, 1.8]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={1} />
    </mesh>
  );
}

function WheelContent({ designs, hoveredCard, onHover }) {
  const groupRef = useRef();
  const mouseX = useRef(0);
  const targetRotation = useRef(0);
  const autoRotate = useRef(true);
  const lastInteraction = useRef(Date.now());

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const now = Date.now();
    if (hoveredCard !== null) { autoRotate.current = false; lastInteraction.current = now; }
    if (autoRotate.current) targetRotation.current += delta * 0.15;
    if (now - lastInteraction.current > 2000 && hoveredCard === null) autoRotate.current = true;
    groupRef.current.rotation.y += (targetRotation.current - groupRef.current.rotation.y) * 0.04;
  });

  const handlePointerDown = useCallback((e) => {
    if (hoveredCard !== null) return;
    autoRotate.current = false;
    lastInteraction.current = Date.now();
    mouseX.current = e.clientX;
  }, [hoveredCard]);

  const handlePointerMove = useCallback((e) => {
    if (autoRotate.current || hoveredCard !== null) return;
    const dx = e.clientX - mouseX.current;
    targetRotation.current += dx * 0.005;
    mouseX.current = e.clientX;
  }, [hoveredCard]);

  const cards = useMemo(() => {
    const radius = 4.5;
    return designs.map((d, i) => ({
      ...d,
      cardAngle: (i / designs.length) * Math.PI * 2,
      radius,
      globalIndex: i,
    }));
  }, [designs]);

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      {cards.map((c) => (
        <Card
          key={c._id}
          image={c.image}
          title={c.title}
          category={c.category}
          link={c.link}
          cardAngle={c.cardAngle}
          radius={c.radius}
          isHovered={hoveredCard === c.globalIndex}
          onHover={(v) => onHover(v ? c.globalIndex : null)}
          onClick={(link) => link && window.open(link, '_blank')}
          groupRef={groupRef}
        />
      ))}
    </group>
  );
}

function CameraAnim() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

const DesignWheel = ({ designs, darkMode }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const hoveredDesign = hoveredCard !== null ? designs[hoveredCard] : null;

  if (!designs || designs.length === 0) return null;

  return (
    <div className="w-full rounded-xl overflow-hidden cursor-grab active:cursor-grabbing relative" style={{ height: 'min(600px, 80vh)' }}>
      <Canvas
        camera={{ position: [0, 0.3, 6.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={darkMode ? ['#0d0705'] : ['#f5f0eb']} />
        <ambientLight intensity={0.6} />
        <CameraAnim />
        <WheelContent
          designs={designs}
          hoveredCard={hoveredCard}
          onHover={setHoveredCard}
        />
      </Canvas>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
        {hoveredDesign ? (
          <div className="text-center">
            <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-[#D4AF37] block mb-1">
              {hoveredDesign.category}
            </span>
            <h3 className="font-serif text-xl text-white">{hoveredDesign.title}</h3>
            <p className="font-mono text-[11px] text-white/50 mt-1">Click to open design</p>
          </div>
        ) : (
          <p className="text-center font-mono text-[10px] tracking-wider text-white/40">
            Drag to spin &middot; Hover to preview
          </p>
        )}
      </div>
    </div>
  );
};

export default DesignWheel;
