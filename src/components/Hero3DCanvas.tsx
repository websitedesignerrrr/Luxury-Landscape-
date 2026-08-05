import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LightingMode } from '../types';
import { Sun, Moon, Sunset, Camera, Sparkles, Droplets, Lightbulb, Layers, Trees } from 'lucide-react';

interface Hero3DCanvasProps {
  lightingMode: LightingMode;
  setLightingMode: (mode: LightingMode) => void;
  onOpenEstimate: () => void;
  onViewProjects: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  lightingMode,
  setLightingMode,
  onOpenEstimate,
  onViewProjects,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [cameraPreset, setCameraPreset] = useState<'front' | 'aerial' | 'patio' | 'garden'>('front');

  // Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const palmsGroupRef = useRef<THREE.Group | null>(null);
  const poolWaterRef = useRef<THREE.Mesh | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.5, 0));
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x1a2e26, 0.015);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 6, 22);
    camera.lookAt(cameraTargetRef.current);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Ground (Emerald Lawn Plane)
    const lawnGeo = new THREE.PlaneGeometry(60, 60, 32, 32);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: 0x1f663b,
      roughness: 0.8,
      metalness: 0.1,
    });
    const lawn = new THREE.Mesh(lawnGeo, lawnMat);
    lawn.rotation.x = -Math.PI / 2;
    lawn.receiveShadow = true;
    scene.add(lawn);

    // Travertine Patio Deck
    const patioGeo = new THREE.BoxGeometry(16, 0.2, 12);
    const patioMat = new THREE.MeshStandardMaterial({
      color: 0xe2d7c5, // Travertine ivory
      roughness: 0.4,
      metalness: 0.05,
    });
    const patio = new THREE.Mesh(patioGeo, patioMat);
    patio.position.set(0, 0.1, -2);
    patio.receiveShadow = true;
    patio.castShadow = true;
    scene.add(patio);

    // Travertine Walkway
    const walkwayGeo = new THREE.BoxGeometry(4, 0.15, 10);
    const walkway = new THREE.Mesh(walkwayGeo, patioMat);
    walkway.position.set(0, 0.08, 8);
    walkway.receiveShadow = true;
    scene.add(walkway);

    // Swimming Pool
    const poolGeo = new THREE.BoxGeometry(10, 0.1, 6);
    const poolBorderGeo = new THREE.BoxGeometry(10.8, 0.2, 6.8);
    const borderMat = new THREE.MeshStandardMaterial({ color: 0xf0e6d6, roughness: 0.3 });
    const poolBorder = new THREE.Mesh(poolBorderGeo, borderMat);
    poolBorder.position.set(0, 0.12, -4);
    scene.add(poolBorder);

    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x00d2d3,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      ior: 1.333,
      reflectivity: 0.9,
    });
    const water = new THREE.Mesh(poolGeo, waterMat);
    water.position.set(0, 0.16, -4);
    scene.add(water);
    poolWaterRef.current = water;

    // Modern Florida Villa Model (Architectural Primitives)
    const houseGroup = new THREE.Group();

    // Main Villa Body (White Stucco)
    const mainBodyGeo = new THREE.BoxGeometry(18, 6, 8);
    const stuccoMat = new THREE.MeshStandardMaterial({ color: 0xf7f7f7, roughness: 0.5 });
    const mainBody = new THREE.Mesh(mainBodyGeo, stuccoMat);
    mainBody.position.set(0, 3, -10);
    mainBody.castShadow = true;
    mainBody.receiveShadow = true;
    houseGroup.add(mainBody);

    // Roof overhang cantilever
    const roofGeo = new THREE.BoxGeometry(20, 0.4, 10);
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x2d241e, roughness: 0.4 });
    const roof = new THREE.Mesh(roofGeo, darkWoodMat);
    roof.position.set(0, 6.2, -10);
    roof.castShadow = true;
    houseGroup.add(roof);

    // Glass Panoramic Windows
    const glassGeo = new THREE.PlaneGeometry(14, 4);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.4,
      roughness: 0.05,
      metalness: 0.9,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(0, 3, -5.9);
    houseGroup.add(glass);

    scene.add(houseGroup);

    // 5. Animated Royal Palm Trees
    const palmsGroup = new THREE.Group();
    palmsGroupRef.current = palmsGroup;

    const createPalmTree = (x: number, z: number, scale = 1) => {
      const palm = new THREE.Group();
      palm.position.set(x, 0, z);
      palm.scale.set(scale, scale, scale);

      // Curved Trunk
      const trunkCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.3, 3, 0.1),
        new THREE.Vector3(0.5, 6, -0.2),
        new THREE.Vector3(0.2, 8, 0),
      ]);
      const trunkGeo = new THREE.TubeGeometry(trunkCurve, 16, 0.35, 12, false);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x735d49, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.castShadow = true;
      palm.add(trunk);

      // Palm Crown & Fronds
      const crown = new THREE.Group();
      crown.position.set(0.2, 8, 0);

      const frondGeo = new THREE.ConeGeometry(0.8, 4.5, 5);
      frondGeo.translate(0, 2.25, 0);
      const frondMat = new THREE.MeshStandardMaterial({
        color: 0x228b22,
        roughness: 0.6,
        side: THREE.DoubleSide,
      });

      for (let i = 0; i < 12; i++) {
        const frond = new THREE.Mesh(frondGeo, frondMat);
        frond.rotation.z = Math.PI / 2.8;
        frond.rotation.y = (i * Math.PI) / 6;
        frond.castShadow = true;
        crown.add(frond);
      }
      palm.add(crown);
      return palm;
    };

    // Add Royal Palms around the Florida villa
    const palmPositions = [
      { x: -9, z: 2, scale: 1.1 },
      { x: 9, z: 2, scale: 1.15 },
      { x: -11, z: -5, scale: 1.25 },
      { x: 11, z: -5, scale: 1.2 },
      { x: -5, z: 7, scale: 0.85 },
      { x: 5, z: 7, scale: 0.9 },
    ];

    palmPositions.forEach((p) => {
      const palm = createPalmTree(p.x, p.z, p.scale);
      palmsGroup.add(palm);
    });
    scene.add(palmsGroup);

    // Clusia Privacy Hedges
    const hedgeMat = new THREE.MeshStandardMaterial({ color: 0x23683a, roughness: 0.7 });
    const hedgeLeftGeo = new THREE.BoxGeometry(2, 2.5, 16);
    const hedgeLeft = new THREE.Mesh(hedgeLeftGeo, hedgeMat);
    hedgeLeft.position.set(-14, 1.25, -2);
    hedgeLeft.castShadow = true;
    scene.add(hedgeLeft);

    const hedgeRight = new THREE.Mesh(hedgeLeftGeo, hedgeMat);
    hedgeRight.position.set(14, 1.25, -2);
    hedgeRight.castShadow = true;
    scene.add(hedgeRight);

    // 6. Lighting System Group
    const lightsGroup = new THREE.Group();
    lightsGroupRef.current = lightsGroup;

    // Sun / Main Directional Light
    const dirLight = new THREE.DirectionalLight(0xfffaed, 2.5);
    dirLight.position.set(15, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0001;
    lightsGroup.add(dirLight);

    // Soft Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    lightsGroup.add(ambientLight);

    // Night Architectural Spotlight Group (2700K Brass Uplights)
    const nightLights = new THREE.Group();
    nightLights.name = 'nightLights';

    palmPositions.forEach((p) => {
      const uplight = new THREE.SpotLight(0xffaa44, 12, 18, Math.PI / 4, 0.5, 1);
      uplight.position.set(p.x, 0.2, p.z);
      uplight.target.position.set(p.x, 8 * p.scale, p.z);
      uplight.castShadow = true;
      nightLights.add(uplight);
      nightLights.add(uplight.target);
    });

    // Submerged Underwater Pool Light (Turquoise LED)
    const poolLight = new THREE.PointLight(0x00f0ff, 15, 12);
    poolLight.position.set(0, 0.3, -4);
    nightLights.add(poolLight);

    // Pathway LED Step Lights
    for (let z = 3; z <= 11; z += 2.5) {
      const pathLightLeft = new THREE.PointLight(0xffc573, 2, 4);
      pathLightLeft.position.set(-2.2, 0.3, z);
      nightLights.add(pathLightLeft);

      const pathLightRight = new THREE.PointLight(0xffc573, 2, 4);
      pathLightRight.position.set(2.2, 0.3, z);
      nightLights.add(pathLightRight);
    }

    lightsGroup.add(nightLights);
    scene.add(lightsGroup);

    // Mouse Interaction for 3D Orbiting
    const domElem = mountRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !cameraRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      const cam = cameraRef.current;
      const radius = cam.position.distanceTo(cameraTargetRef.current);
      let theta = Math.atan2(cam.position.x, cam.position.z);
      let phi = Math.acos(cam.position.y / radius);

      theta -= deltaX * 0.005;
      phi -= deltaY * 0.005;
      phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, phi));

      cam.position.x = radius * Math.sin(phi) * Math.sin(theta);
      cam.position.y = radius * Math.cos(phi);
      cam.position.z = radius * Math.sin(phi) * Math.cos(theta);
      cam.lookAt(cameraTargetRef.current);

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 7. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle Wind Sway for Palms
      if (palmsGroupRef.current) {
        palmsGroupRef.current.children.forEach((palm, idx) => {
          const sway = Math.sin(elapsedTime * 1.5 + idx) * 0.04;
          palm.rotation.z = sway;
          palm.rotation.x = Math.cos(elapsedTime * 1.2 + idx) * 0.03;
        });
      }

      // Water Ripple Effect
      if (poolWaterRef.current) {
        poolWaterRef.current.position.y = 0.16 + Math.sin(elapsedTime * 2) * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, []);

  // Update Lighting Mode (Day, Sunset, Night)
  useEffect(() => {
    if (!sceneRef.current || !lightsGroupRef.current) return;
    const scene = sceneRef.current;
    const lightsGroup = lightsGroupRef.current;

    const dirLight = lightsGroup.children.find((c) => c instanceof THREE.DirectionalLight) as THREE.DirectionalLight;
    const ambLight = lightsGroup.children.find((c) => c instanceof THREE.AmbientLight) as THREE.AmbientLight;
    const nightLights = lightsGroup.getObjectByName('nightLights');

    if (lightingMode === 'day') {
      scene.background = new THREE.Color(0xa0d8ef);
      scene.fog = new THREE.FogExp2(0xa0d8ef, 0.012);
      if (dirLight) {
        dirLight.color.setHex(0xfffaed);
        dirLight.intensity = 2.5;
        dirLight.position.set(15, 25, 15);
      }
      if (ambLight) ambLight.intensity = 0.8;
      if (nightLights) nightLights.visible = false;
    } else if (lightingMode === 'sunset') {
      scene.background = new THREE.Color(0xfdba74);
      scene.fog = new THREE.FogExp2(0xfdba74, 0.015);
      if (dirLight) {
        dirLight.color.setHex(0xff7733);
        dirLight.intensity = 1.8;
        dirLight.position.set(25, 8, -10);
      }
      if (ambLight) ambLight.intensity = 0.5;
      if (nightLights) nightLights.visible = true;
    } else if (lightingMode === 'night') {
      scene.background = new THREE.Color(0x0a1128);
      scene.fog = new THREE.FogExp2(0x0a1128, 0.018);
      if (dirLight) {
        dirLight.color.setHex(0x334466);
        dirLight.intensity = 0.2;
        dirLight.position.set(0, 30, 0);
      }
      if (ambLight) ambLight.intensity = 0.15;
      if (nightLights) nightLights.visible = true;
    }
  }, [lightingMode]);

  // Camera Presets Smooth Transition
  const handleCameraPreset = (preset: 'front' | 'aerial' | 'patio' | 'garden') => {
    setCameraPreset(preset);
    if (!cameraRef.current) return;
    const cam = cameraRef.current;

    let targetPos = new THREE.Vector3(0, 6, 22);
    let lookTarget = new THREE.Vector3(0, 1.5, 0);

    if (preset === 'aerial') {
      targetPos = new THREE.Vector3(0, 28, 12);
      lookTarget = new THREE.Vector3(0, 0, -2);
    } else if (preset === 'patio') {
      targetPos = new THREE.Vector3(0, 3.5, 6);
      lookTarget = new THREE.Vector3(0, 1, -3);
    } else if (preset === 'garden') {
      targetPos = new THREE.Vector3(-10, 4, 10);
      lookTarget = new THREE.Vector3(-2, 2, 0);
    }

    cameraTargetRef.current = lookTarget;

    // Smooth lerp
    const startPos = cam.position.clone();
    let duration = 1000;
    let startTime = performance.now();

    const animateCam = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      cam.position.lerpVectors(startPos, targetPos, ease);
      cam.lookAt(lookTarget);

      if (progress < 1) {
        requestAnimationFrame(animateCam);
      }
    };
    requestAnimationFrame(animateCam);
  };

  return (
    <div className="relative w-full h-screen min-h-[700px] overflow-hidden bg-slate-950 text-white">
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between pt-28 pb-12 pointer-events-none">
        
        {/* Top Floating Badge */}
        <div className="pointer-events-auto self-start">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-500/30 backdrop-blur-md shadow-2xl text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Florida's Premier 3D Outdoor Living Architect</span>
          </div>
        </div>

        {/* Hero Main Headline & Call to Actions */}
        <div className="max-w-3xl my-auto pointer-events-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            Transforming Florida Properties Into{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-lime-300">
              Stunning Outdoor Spaces
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed font-light drop-shadow-md bg-slate-950/40 p-4 rounded-xl backdrop-blur-sm border border-slate-800/50">
            Professional Landscaping, Lawn Care, Hardscaping, Smart Irrigation, and Architectural Lighting Across Florida.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={onOpenEstimate}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold text-lg shadow-xl shadow-emerald-950/50 hover:scale-105 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Get Free Estimate</span>
            </button>

            <button
              onClick={onViewProjects}
              className="px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-lg border border-emerald-500/30 hover:border-emerald-400 backdrop-blur-md transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>View Our Projects</span>
            </button>
          </div>
        </div>

        {/* Interactive 3D Lighting & Camera Control Dock */}
        <div className="pointer-events-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-700/60 backdrop-blur-xl p-4 rounded-2xl shadow-2xl">
          
          {/* Lighting Simulator Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 hidden md:inline">
              3D Lighting:
            </span>
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setLightingMode('day')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  lightingMode === 'day'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Day</span>
              </button>

              <button
                onClick={() => setLightingMode('sunset')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  lightingMode === 'sunset'
                    ? 'bg-orange-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sunset className="w-3.5 h-3.5" />
                <span>Sunset</span>
              </button>

              <button
                onClick={() => setLightingMode('night')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  lightingMode === 'night'
                    ? 'bg-indigo-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>2700K Night</span>
              </button>
            </div>
          </div>

          {/* Camera Preset Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 hidden md:inline">
              3D Angles:
            </span>
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => handleCameraPreset('front')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'front' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => handleCameraPreset('patio')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'patio' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Travertine Pool
              </button>
              <button
                onClick={() => handleCameraPreset('garden')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'garden' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Palm Garden
              </button>
              <button
                onClick={() => handleCameraPreset('aerial')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'aerial' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Aerial 3D
              </button>
            </div>
          </div>

          {/* Hint */}
          <div className="text-xs text-slate-400 italic hidden lg:flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Drag to rotate 3D property in 360°</span>
          </div>
        </div>

      </div>
    </div>
  );
};
