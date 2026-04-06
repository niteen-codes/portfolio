import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { getSectionTheme } from "./three/sectionThemes";
import ThreeBackgroundScene from "./three/ThreeBackgroundScene";
import useScrollSectionState from "./three/useScrollSectionState";
import "./Background3D.css";

const DEFAULT_QUALITY = Object.freeze({
  particleCount: 260,
  orbCount: 12,
  waveSegments: 34,
  dprMax: 1.9,
  reducedMotion: false,
  coarsePointer: false,
});

const buildQualityProfile = (reducedMotion, coarsePointer) => {
  const width = window.innerWidth;
  const hardwareThreads = navigator.hardwareConcurrency || 4;
  const lowPower = width < 768 || hardwareThreads <= 4 || coarsePointer;
  const veryLarge = width >= 1500 && !lowPower;

  return {
    particleCount: reducedMotion ? 120 : veryLarge ? 420 : lowPower ? 170 : 300,
    orbCount: reducedMotion ? 6 : lowPower ? 8 : 14,
    waveSegments: reducedMotion ? 20 : lowPower ? 24 : 38,
    dprMax: reducedMotion ? 1.25 : lowPower ? 1.5 : 2,
    reducedMotion,
    coarsePointer,
  };
};

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch (error) {
    return false;
  }
};

const Background3D = () => {
  const sectionMetrics = useScrollSectionState();
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [webglEnabled, setWebglEnabled] = useState(true);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    setWebglEnabled(isWebGLAvailable());
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    const syncQuality = () => {
      setQuality(buildQualityProfile(motionQuery.matches, pointerQuery.matches));
    };

    syncQuality();
    window.addEventListener("resize", syncQuality);
    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", syncQuality);
      pointerQuery.addEventListener("change", syncQuality);
    } else {
      motionQuery.addListener(syncQuality);
      pointerQuery.addListener(syncQuality);
    }

    return () => {
      window.removeEventListener("resize", syncQuality);
      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", syncQuality);
        pointerQuery.removeEventListener("change", syncQuality);
      } else {
        motionQuery.removeListener(syncQuality);
        pointerQuery.removeListener(syncQuality);
      }
    };
  }, []);

  useEffect(() => {
    const onPointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
      pointerRef.current.active = !quality.coarsePointer;
    };

    const onPointerLeave = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
      pointerRef.current.active = false;
    };

    if (!quality.coarsePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    } else {
      onPointerLeave();
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [quality.coarsePointer]);

  const sectionState = useMemo(() => {
    return {
      index: sectionMetrics.index,
      progress: sectionMetrics.progress,
      currentTheme: getSectionTheme(sectionMetrics.index),
      nextTheme: getSectionTheme(sectionMetrics.index + 1),
    };
  }, [sectionMetrics.index, sectionMetrics.progress]);

  if (!webglEnabled) {
    return null;
  }

  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 52, near: 0.1, far: 120 }}
        dpr={[1, quality.dprMax]}
        frameloop={quality.reducedMotion ? "demand" : "always"}
        performance={{ min: 0.55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          premultipliedAlpha: true,
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.95;
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ThreeBackgroundScene sectionState={sectionState} pointerRef={pointerRef} quality={quality} />
      </Canvas>
    </div>
  );
};

export default Background3D;
