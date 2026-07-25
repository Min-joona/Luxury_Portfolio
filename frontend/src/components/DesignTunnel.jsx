import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Card({ image, title, category, link, angle, radius, zOffset, isHovered, onHover, onClick }) {
  const meshRef = useRef();
  const texture = useTexture(image);

  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius + zOffset;

  useFrame(() => {
    if (!meshRef.current) return;
    const desired = isHovered ? 1.3 : 1;
    meshRef.current.scale.x += (desired - meshRef.current.scale.x) * 0.08;
    meshRef.current.scale.y += (desired - meshRef.current.scale.y) * 0.08;

    const targetZ = z + (isHovered ? 1.2 : 0);
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.08;
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, 0, z]}
      rotation={[0, -angle + Math.PI, 0]}
      onClick={(e) => { e.stopPropagation(); if (link) window.open(link, '_blank'); }}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); document.body.style.cursor = 'default'; }}
    >
      <planeGeometry args={[2.4, 1.8]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

function TunnelContent({ designs, hoveredCard, onHover }) {
  const groupRef = useRef();
  const mouseX = useRef(0);
  const targetRotation = useRef(Math.PI * 0.3);
  const autoRotate = useRef(true);
  const lastInteraction = useRef(Date.now());
  const designsPerRing = Math.max(1, Math.ceil(designs.length / 3));

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const now = Date.now();
    if (hoveredCard !== null) { autoRotate.current = false; lastInteraction.current = now; }
    if (autoRotate.current) targetRotation.current += delta * 0.1;
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

  const rings = useMemo(() => {
    const result = [];
    for (let r = 0; r < 3; r++) {
      const slice = designs.slice(r * designsPerRing, (r + 1) * designsPerRing);
      if (slice.length > 0) {
        const offset = r * 0.3;
        result.push(
          <group key={r}>
            {slice.map((d, i) => {
              const angle = (i / slice.length) * Math.PI * 2 + offset;
              const radius = 5 - r * 0.6;
              const zOffset = -r * 3.5;
              const globalIndex = r * 100 + i;
              return (
                <Card
                  key={d._id}
                  image={d.image}
                  title={d.title}
                  category={d.category}
                  link={d.link}
                  angle={angle}
                  radius={radius}
                  zOffset={zOffset}
                  isHovered={hoveredCard === globalIndex}
                  onHover={(v) => onHover(v ? globalIndex : null)}
                  onClick={(link) => link && window.open(link, '_blank')}
                />
              );
            })}
          </group>
        );
      }
    }
    return result;
  }, [designs, hoveredCard, onHover, designsPerRing]);

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

function CameraAnim() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.3;
    camera.lookAt(0, 0, -2);
  });
  return null;
}

const DesignTunnel = ({ designs, darkMode }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const hoveredDesign = hoveredCard !== null ? designs[Math.floor(hoveredCard / 100) * 3 + (hoveredCard % 100)] : null;

  if (!designs || designs.length === 0) return null;

  return (
    <div className="w-full rounded-xl overflow-hidden cursor-grab active:cursor-grabbing relative" style={{ height: 'min(600px, 80vh)' }}>
      <Canvas
        camera={{ position: [0, 0.5, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={darkMode ? ['#0d0705'] : ['#f5f0eb']} />
        <ambientLight intensity={0.6} />
        <CameraAnim />
        <TunnelContent
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
            Drag to explore &middot; Hover to preview
          </p>
        )}
      </div>
    </div>
  );
};

export default DesignTunnel;
