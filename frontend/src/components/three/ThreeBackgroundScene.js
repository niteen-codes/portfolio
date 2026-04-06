import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (start, end, alpha) => start + (end - start) * alpha;

const colorA = new THREE.Color();
const colorB = new THREE.Color();
const blendedColor = new THREE.Color();
const tempColor = new THREE.Color();
const tempObject = new THREE.Object3D();

const blendHexColors = (fromColor, toColor, amount) => {
  colorA.set(fromColor);
  colorB.set(toColor);
  return blendedColor.copy(colorA).lerp(colorB, amount);
};

const SceneLights = ({ pointerRef, theme, reducedMotion }) => {
  const pointLightRef = useRef(null);

  useFrame((state, delta) => {
    if (!pointLightRef.current) {
      return;
    }

    const pointer = pointerRef.current;
    const targetX = pointer.active ? pointer.x * 4 : 0;
    const targetY = pointer.active ? pointer.y * 2.4 : 0;
    pointLightRef.current.position.x = lerp(pointLightRef.current.position.x, targetX, delta * 3);
    pointLightRef.current.position.y = lerp(pointLightRef.current.position.y, targetY, delta * 3);
    pointLightRef.current.position.z = 4;
    tempColor.copy(theme.primaryColor);
    pointLightRef.current.color.lerp(tempColor, reducedMotion ? 1 : delta * 2.2);
  });

  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[3.5, 6, 2]} intensity={0.22} color="#b3d7ff" />
      <pointLight ref={pointLightRef} intensity={0.5} distance={13} />
    </>
  );
};

const ParticleCloud = ({ count, pointerRef, theme, reducedMotion }) => {
  const pointsRef = useRef(null);
  const geometryRef = useRef(null);
  const materialRef = useRef(null);

  const particles = useMemo(() => {
    const basePositions = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const speed = new Float32Array(count);
    const amplitude = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const index3 = index * 3;
      const radius = Math.pow(Math.random(), 0.62) * 8 + 1.1;
      const theta = Math.random() * Math.PI * 2;
      const vertical = (Math.random() - 0.5) * 7.2;
      const x = Math.cos(theta) * radius + (Math.random() - 0.5) * 1.8;
      const y = vertical;
      const z = (Math.random() - 0.5) * 7.4 - 1.2;

      basePositions[index3] = x;
      basePositions[index3 + 1] = y;
      basePositions[index3 + 2] = z;
      positions[index3] = x;
      positions[index3 + 1] = y;
      positions[index3 + 2] = z;
      phase[index] = Math.random() * Math.PI * 2;
      speed[index] = 0.2 + Math.random() * 0.65;
      amplitude[index] = 0.05 + Math.random() * 0.35;
    }

    return {
      basePositions,
      positions,
      phase,
      speed,
      amplitude,
    };
  }, [count]);

  useFrame((state, delta) => {
    if (!geometryRef.current || !materialRef.current) {
      return;
    }

    const positionsAttribute = geometryRef.current.getAttribute("position");
    const array = positionsAttribute.array;
    const pointer = pointerRef.current;
    const pointerX = pointer.active ? pointer.x * 5.3 : 0;
    const pointerY = pointer.active ? pointer.y * 3.4 : 0;
    const elapsed = state.clock.elapsedTime;
    const movementScale = reducedMotion ? 0.2 : 1;

    for (let index = 0; index < count; index += 1) {
      const index3 = index * 3;
      const baseX = particles.basePositions[index3];
      const baseY = particles.basePositions[index3 + 1];
      const baseZ = particles.basePositions[index3 + 2];

      const wave = elapsed * particles.speed[index] + particles.phase[index];
      let x = baseX + Math.sin(wave) * particles.amplitude[index] * movementScale;
      let y = baseY + Math.cos(wave * 0.8) * particles.amplitude[index] * 0.75 * movementScale;
      let z = baseZ + Math.sin(wave * 0.65) * particles.amplitude[index] * 0.55 * movementScale;

      if (pointer.active) {
        const dx = x - pointerX;
        const dy = y - pointerY;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < 4.6) {
          const push = (4.6 - distanceSquared) * 0.055;
          x += dx * push;
          y += dy * push;
          z += clamp(push, 0, 0.35);
        }
      }

      array[index3] = x;
      array[index3 + 1] = y;
      array[index3 + 2] = z;
    }

    positionsAttribute.needsUpdate = true;

    tempColor.copy(theme.primaryColor);
    materialRef.current.color.lerp(tempColor, reducedMotion ? 1 : delta * 2.4);
    const opacityTarget = reducedMotion ? 0.42 : 0.64 * theme.intensity;
    materialRef.current.opacity = lerp(materialRef.current.opacity, opacityTarget, delta * 2.8);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.62}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const WaveGrid = ({ segments, pointerRef, theme, sectionProgress, reducedMotion }) => {
  const meshRef = useRef(null);
  const geometryRef = useRef(null);
  const materialRef = useRef(null);

  const basePositions = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(22, 13, segments, segments);
    const source = geometry.attributes.position.array.slice();
    geometry.dispose();
    return source;
  }, [segments]);

  const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  useFrame((state, delta) => {
    if (!geometryRef.current || !materialRef.current) {
      return;
    }

    const positionAttribute = geometryRef.current.getAttribute("position");
    const array = positionAttribute.array;
    const elapsed = state.clock.elapsedTime;
    const pointer = pointerRef.current;
    const pointerX = pointer.active ? pointer.x * 5 : 0;
    const pointerY = pointer.active ? pointer.y * 2.8 : 0;
    const baseAmplitude = reducedMotion ? 0.08 : 0.22;
    const amplitude = baseAmplitude + sectionProgress * 0.08;

    for (let index = 0; index < array.length; index += 3) {
      const x = basePositions[index];
      const y = basePositions[index + 1];
      const waveA = Math.sin(x * 0.72 + elapsed * 0.65) * amplitude;
      const waveB = Math.cos(y * 1.1 + elapsed * 0.45) * amplitude * 0.82;
      let z = waveA + waveB;

      if (pointer.active) {
        const dx = x - pointerX;
        const dy = y - pointerY;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < 12) {
          z += (12 - distanceSquared) * 0.018;
        }
      }

      array[index] = x;
      array[index + 1] = y;
      array[index + 2] = z;
    }

    positionAttribute.needsUpdate = true;

    tempColor.copy(theme.secondaryColor);
    materialRef.current.color.lerp(tempColor, reducedMotion ? 1 : delta * 2.2);
    const opacityTarget = reducedMotion ? 0.09 : 0.16 * theme.intensity;
    materialRef.current.opacity = lerp(materialRef.current.opacity, opacityTarget, delta * 2.4);
  });

  return (
    <mesh ref={meshRef} position={[0, -2.9, -6.3]} rotation={[-0.92, 0, 0]}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <meshBasicMaterial
        ref={materialRef}
        transparent
        opacity={0.14}
        wireframe
        color="#6c63ff"
        depthWrite={false}
      />
    </mesh>
  );
};

const FloatingOrbs = ({ count, pointerRef, theme, reducedMotion }) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  const orbData = useMemo(() => {
    return Array.from({ length: count }, (_, index) => ({
      radius: 1.4 + Math.random() * 6.2,
      speed: 0.18 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      vertical: (Math.random() - 0.5) * 2.8,
      scale: 0.55 + Math.random() * 0.7,
      wobble: 0.4 + Math.random() * 1.1,
      direction: index % 2 === 0 ? 1 : -1,
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) {
      return;
    }

    const pointer = pointerRef.current;
    const pointerX = pointer.active ? pointer.x * 0.7 : 0;
    const pointerY = pointer.active ? pointer.y * 0.45 : 0;
    const elapsed = state.clock.elapsedTime;
    const speedMultiplier = reducedMotion ? 0.2 : 1;

    for (let index = 0; index < orbData.length; index += 1) {
      const orb = orbData[index];
      const angle = elapsed * orb.speed * orb.direction * speedMultiplier + orb.offset;
      const x = Math.cos(angle) * orb.radius + pointerX;
      const y = Math.sin(angle * orb.wobble) * 0.82 + orb.vertical + pointerY;
      const z = -2.1 + Math.sin(angle * 0.9) * 2.6;
      const scale = orb.scale + Math.sin(angle * 1.9) * 0.16;

      tempObject.position.set(x, y, z);
      tempObject.scale.setScalar(scale);
      tempObject.rotation.set(angle * 0.2, angle * 0.25, angle * 0.1);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(index, tempObject.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    tempColor.copy(theme.accentColor);
    materialRef.current.color.lerp(tempColor, reducedMotion ? 1 : delta * 2.6);
    materialRef.current.opacity = lerp(materialRef.current.opacity, reducedMotion ? 0.2 : 0.34, delta * 2.6);
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <icosahedronGeometry args={[0.16, 0]} />
      <meshStandardMaterial
        ref={materialRef}
        transparent
        opacity={0.3}
        emissive="#ffffff"
        emissiveIntensity={0.35}
        roughness={0.25}
        metalness={0.2}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

const AmbientMist = ({ theme, sectionProgress, reducedMotion }) => {
  const meshARef = useRef(null);
  const meshBRef = useRef(null);
  const materialARef = useRef(null);
  const materialBRef = useRef(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const movement = reducedMotion ? 0.2 : 1;

    if (meshARef.current) {
      meshARef.current.position.x = Math.sin(elapsed * 0.2 * movement) * 1.2;
      meshARef.current.position.y = 1.7 + Math.cos(elapsed * 0.15 * movement) * 0.35;
      meshARef.current.scale.setScalar(1 + sectionProgress * 0.15);
    }

    if (meshBRef.current) {
      meshBRef.current.position.x = Math.cos(elapsed * 0.18 * movement) * -1.6;
      meshBRef.current.position.y = -2 + Math.sin(elapsed * 0.16 * movement) * 0.32;
      meshBRef.current.scale.setScalar(1 + (1 - sectionProgress) * 0.12);
    }

    if (materialARef.current) {
      tempColor.copy(theme.primaryColor);
      materialARef.current.color.lerp(tempColor, reducedMotion ? 1 : delta * 2.2);
      materialARef.current.opacity = lerp(materialARef.current.opacity, reducedMotion ? 0.08 : 0.11, delta * 2.8);
    }

    if (materialBRef.current) {
      tempColor.copy(theme.secondaryColor);
      materialBRef.current.color.lerp(tempColor, reducedMotion ? 1 : delta * 2.2);
      materialBRef.current.opacity = lerp(materialBRef.current.opacity, reducedMotion ? 0.08 : 0.1, delta * 2.8);
    }
  });

  return (
    <>
      <mesh ref={meshARef} position={[0, 1.7, -7]}>
        <sphereGeometry args={[3.9, 28, 28]} />
        <meshBasicMaterial ref={materialARef} transparent opacity={0.1} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <mesh ref={meshBRef} position={[0, -1.8, -8.5]}>
        <sphereGeometry args={[4.6, 24, 24]} />
        <meshBasicMaterial ref={materialBRef} transparent opacity={0.1} side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </>
  );
};

const ThreeBackgroundScene = ({ sectionState, pointerRef, quality }) => {
  const { reducedMotion, particleCount, waveSegments, orbCount } = quality;

  const theme = useMemo(() => {
    const blendAmount = clamp(sectionState.progress * 0.55, 0, 0.55);
    return {
      primaryColor: blendHexColors(
        sectionState.currentTheme.primary,
        sectionState.nextTheme.primary,
        blendAmount
      ).clone(),
      secondaryColor: blendHexColors(
        sectionState.currentTheme.secondary,
        sectionState.nextTheme.secondary,
        blendAmount
      ).clone(),
      accentColor: blendHexColors(
        sectionState.currentTheme.accent,
        sectionState.nextTheme.accent,
        blendAmount
      ).clone(),
      intensity: lerp(sectionState.currentTheme.intensity, sectionState.nextTheme.intensity, blendAmount),
    };
  }, [sectionState]);

  return (
    <>
      <SceneLights pointerRef={pointerRef} theme={theme} reducedMotion={reducedMotion} />
      <AmbientMist theme={theme} sectionProgress={sectionState.progress} reducedMotion={reducedMotion} />
      <WaveGrid
        segments={waveSegments}
        pointerRef={pointerRef}
        theme={theme}
        sectionProgress={sectionState.progress}
        reducedMotion={reducedMotion}
      />
      <ParticleCloud count={particleCount} pointerRef={pointerRef} theme={theme} reducedMotion={reducedMotion} />
      <FloatingOrbs count={orbCount} pointerRef={pointerRef} theme={theme} reducedMotion={reducedMotion} />
    </>
  );
};

export default ThreeBackgroundScene;
