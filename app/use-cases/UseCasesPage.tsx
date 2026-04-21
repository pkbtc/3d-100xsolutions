"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────── */
function useCountUp(target: number, duration = 1100, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let st: number | null = null;
    const tick = (ts: number) => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return val;
}

/* ─────────────────────────────────────────
   Generic Three.js canvas wrapper
───────────────────────────────────────── */
type SceneBuilderFn = (
  THREE: typeof import("three"),
  OC: import("three/examples/jsm/controls/OrbitControls.js")["OrbitControls"],
  canvas: HTMLCanvasElement
) => { cleanup: () => void };

function ThreeCanvas({ builder, id }: { builder: SceneBuilderFn; id: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    let cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const result = builder(THREE, OrbitControls, ref.current!);
      cleanup = result.cleanup;
    })();
    return () => cleanup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ═══════════════════════════════════════════════════════
   SCENE BUILDERS   (photorealistic colours — no brand green)
   ═══════════════════════════════════════════════════════ */

/* ── 1. E-Commerce: Luxury Product Configurator ────────
   A premium perfume / skincare bottle on a pedestal
   Colours: champagne gold, frosted glass, deep amber
─────────────────────────────────────────────────────── */
function buildEcommerceScene(
  THREE: typeof import("three"),
  OC: import("three/examples/jsm/controls/OrbitControls.js")["OrbitControls"],
  canvas: HTMLCanvasElement
) {
  const W = canvas.clientWidth || 600;
  const H = canvas.clientHeight || 380;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H, false);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
  camera.position.set(0, 1.2, 7);

  const ctrl = new OC(camera, canvas);
  ctrl.enableDamping = true;
  ctrl.autoRotate = true;
  ctrl.autoRotateSpeed = 0.7;
  ctrl.minDistance = 3; ctrl.maxDistance = 12;
  ctrl.maxPolarAngle = Math.PI / 1.7;

  const GOLD    = 0xc8a84b;
  const CREAM   = 0xfaf5ee;
  const AMBER   = 0x8b4513;

  /* pedestal */
  const pedMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(1.4, 1.6, 0.1, 64),
    new THREE.MeshPhysicalMaterial({ color: 0x111111, metalness: 1, roughness: 0.03 })
  );
  pedMesh.position.set(0, -2.2, 0);
  pedMesh.receiveShadow = true;
  scene.add(pedMesh);

  /* pedestal gold rim */
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.012, 8, 80),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.8 }));
  rim.rotation.x = Math.PI / 2; rim.position.y = -2.14;
  scene.add(rim);

  /* bottle body — tall rounded cylinder (frosted glass) */
  const bottle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.65, 3.2, 48),
    new THREE.MeshPhysicalMaterial({
      color: 0xffe8d0, transparent: true, opacity: 0.68,
      roughness: 0.05, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.02,
      transmission: 0.6, ior: 1.45,
    })
  );
  bottle.castShadow = true;
  scene.add(bottle);

  /* liquid inside */
  const liquid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.48, 0.58, 2.4, 48),
    new THREE.MeshPhysicalMaterial({ color: AMBER, transparent: true, opacity: 0.55, roughness: 0.1 })
  );
  liquid.position.y = -0.3;
  scene.add(liquid);

  /* gold neck ring */
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.52, 0.28, 32),
    new THREE.MeshPhysicalMaterial({ color: GOLD, metalness: 1, roughness: 0.08 }));
  neck.position.y = 1.65;
  scene.add(neck);

  /* cap */
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.55, 32),
    new THREE.MeshPhysicalMaterial({ color: 0x222222, metalness: 0.95, roughness: 0.06, clearcoat: 1 }));
  cap.position.y = 2.1;
  scene.add(cap);

  /* brand label plate */
  const label = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.7, 0.01),
    new THREE.MeshPhysicalMaterial({ color: CREAM, roughness: 0.6 }));
  label.position.set(0, 0, 0.57);
  scene.add(label);

  /* floating rings */
  [1.5, 2.0, 2.7].forEach((r, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.01, 8, 80),
      new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.25 - i * 0.05 }));
    ring.rotation.x = (i * Math.PI) / 4;
    ring.rotation.y = (i * Math.PI) / 3;
    scene.add(ring);
  });

  /* ambient dust */
  const pPos = new Float32Array(180 * 3);
  for (let i = 0; i < 180; i++) {
    const r = 1.2 + Math.random() * 2; const a = Math.random() * Math.PI * 2;
    pPos[i * 3] = Math.cos(a) * r; pPos[i * 3 + 1] = (Math.random() - 0.5) * 5; pPos[i * 3 + 2] = Math.sin(a) * r;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: GOLD, size: 0.025, transparent: true, opacity: 0.5 })));

  /* lights */
  scene.add(new THREE.AmbientLight(0xfff8f0, 0.3));
  const key = new THREE.PointLight(0xfff4e0, 5, 18); key.position.set(4, 6, 5); key.castShadow = true; scene.add(key);
  const fill = new THREE.PointLight(0xd4c0ff, 2, 14); fill.position.set(-5, 2, -4); scene.add(fill);
  const rim2 = new THREE.PointLight(GOLD, 1.5, 10); rim2.position.set(0, -3, 4); scene.add(rim2);

  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  window.addEventListener("resize", onResize);

  let t = 0, animId = 0;
  const tick = () => {
    animId = requestAnimationFrame(tick); t += 0.008;
    ctrl.update();
    key.position.x = Math.sin(t * 0.4) * 5; key.position.z = Math.cos(t * 0.4) * 5;
    renderer.render(scene, camera);
  };
  tick();
  return { cleanup: () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); ctrl.dispose(); renderer.dispose(); } };
}

/* ── 2. Real Estate: Modern Villa Exterior ─────────────
   Cream walls, dark concrete, warm amber interior glow,
   natural trees, turquoise pool
─────────────────────────────────────────────────────── */
function buildRealEstateScene(
  THREE: typeof import("three"),
  OC: import("three/examples/jsm/controls/OrbitControls.js")["OrbitControls"],
  canvas: HTMLCanvasElement
) {
  const W = canvas.clientWidth || 600, H = canvas.clientHeight || 380;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H, false);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 200);
  camera.position.set(7, 4, 14);

  const ctrl = new OC(camera, canvas);
  ctrl.enableDamping = true; ctrl.autoRotate = true; ctrl.autoRotateSpeed = 0.3;
  ctrl.maxPolarAngle = Math.PI / 1.8; ctrl.minDistance = 6; ctrl.maxDistance = 20;

  const m = (c: number, r = 0.85, mt = 0) =>
    new THREE.MeshPhysicalMaterial({ color: c, roughness: r, metalness: mt });

  /* ground */
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(32, 32), m(0x0e1a0e, 0.95));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -2.8; ground.receiveShadow = true;
  scene.add(ground);

  /* main body */
  const body = new THREE.Mesh(new THREE.BoxGeometry(7, 2.8, 4), m(0xf4ede3, 0.88));
  body.position.set(0, -1.4, 0); body.castShadow = true; scene.add(body);

  /* roof slab */
  const roof = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.18, 4.4), m(0x3e3e3e, 0.6));
  roof.position.set(0, 0.0, 0); scene.add(roof);

  /* upper floor */
  const upper = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.9, 4), m(0xede6da, 0.84));
  upper.position.set(-1.2, 1.05, 0); upper.castShadow = true; scene.add(upper);
  const upperRoof = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.14, 4.4), m(0x3a3a3a, 0.55));
  upperRoof.position.set(-1.2, 2.05, 0);
  scene.add(upperRoof);

  /* glowing windows */
  const winM = new THREE.MeshPhysicalMaterial({ color: 0xfff3cc, emissive: new THREE.Color(0xffb840), emissiveIntensity: 1.5, roughness: 0 });
  [[-2.3, -1.2], [-0.8, -1.2], [0.7, -1.2], [2.2, -1.2]].forEach(([x, y]) => {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.1, 0.04), winM);
    w.position.set(x, y, 2.05); scene.add(w);
    const wl = new THREE.PointLight(0xffa030, 0.6, 4.5); wl.position.set(x, y, 1.7); scene.add(wl);
    const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.0, 1.15, 0.05)), new THREE.LineBasicMaterial({ color: 0x888888 }));
    frame.position.copy(w.position); scene.add(frame);
  });

  /* glass door */
  const doorM = new THREE.MeshPhysicalMaterial({ color: 0x88aacc, transparent: true, opacity: 0.35, roughness: 0, emissive: new THREE.Color(0xffa030), emissiveIntensity: 0.2 });
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.4, 0.04), doorM);
  door.position.set(3.0, -1.3, 2.05); scene.add(door);

  /* upper windows */
  [[-2.4, 1.05], [-0.6, 1.05]].forEach(([x, y]) => {
    const uw = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.75, 0.04), winM);
    uw.position.set(x, y, 2.05); scene.add(uw);
  });

  /* garage */
  const garage = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 4), m(0xeae2d5, 0.82));
  garage.position.set(4.8, -1.7, 0); garage.castShadow = true; scene.add(garage);
  const garageRoof = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 4.4), m(0x3a3a3a, 0.55));
  garageRoof.position.set(4.8, -0.6, 0);
  scene.add(garageRoof);
  const gd = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.8, 0.05), m(0x777777, 0.4, 0.3));
  gd.position.set(4.8, -1.8, 2.05); scene.add(gd);

  /* trees */
  const addTree = (x: number, z: number, h = 1.3) => {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, h * 0.5, 8), m(0x4a2e0a));
    trunk.position.set(x, -2.8 + h * 0.25, z);
    scene.add(trunk);
    [1.0, 0.72, 0.48].forEach((s, i) => {
      const nc = new THREE.Mesh(new THREE.SphereGeometry(s * 0.6, 10, 10), m([0x2d5a27, 0x336b2d, 0x256020][i], 0.93));
      nc.position.set(x, -2.8 + h * 0.5 + i * 0.35, z); scene.add(nc);
    });
  };
  addTree(-5.0, -0.8, 1.5); addTree(-5.4, 1.0, 1.1); addTree(7.0, -1.0, 1.8); addTree(7.2, 1.3, 1.2);

  /* pool */
  const pool = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.18, 2.0),
    new THREE.MeshPhysicalMaterial({ color: 0x006994, emissive: new THREE.Color(0x003d5c), emissiveIntensity: 0.5, transparent: true, opacity: 0.82, roughness: 0 }));
  pool.position.set(-2.5, -2.72, -2.4); scene.add(pool);
  const pl = new THREE.PointLight(0x00aacc, 1.0, 5); pl.position.set(-2.5, -2.4, -2.4); scene.add(pl);

  /* path lights */
  [- 1.4, 0, 1.4].forEach((z) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8), m(0x333333, 0.5, 0.5));
    pole.position.set(6.4, -2.45, z);
    scene.add(pole);
    const gb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffcc66 }));
    gb.position.set(6.4, -2.0, z); scene.add(gb);
    const pl2 = new THREE.PointLight(0xffcc66, 0.6, 4); pl2.position.copy(gb.position); scene.add(pl2);
  });

  /* lights */
  scene.add(new THREE.AmbientLight(0x1a2a3a, 0.7));
  const moon = new THREE.DirectionalLight(0xbbd4ff, 1.1); moon.position.set(-8, 14, 6); moon.castShadow = true; scene.add(moon);

  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false);
  };
  window.addEventListener("resize", onResize);
  let animId = 0;
  const tick = () => { animId = requestAnimationFrame(tick); ctrl.update(); renderer.render(scene, camera); };
  tick();
  return { cleanup: () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); ctrl.dispose(); renderer.dispose(); } };
}

/* ── 3. Restaurant: Dining Table Scene ─────────────────
   Warm mahogany table, white plates, candle centre-piece
   Colours: mahogany, ivory, warm amber candlelight
─────────────────────────────────────────────────────── */
function buildRestaurantScene(
  THREE: typeof import("three"),
  OC: import("three/examples/jsm/controls/OrbitControls.js")["OrbitControls"],
  canvas: HTMLCanvasElement
) {
  const W = canvas.clientWidth || 600, H = canvas.clientHeight || 380;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H, false);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0404, 0.06);
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 60);
  camera.position.set(0, 3.5, 8);

  const ctrl = new OC(camera, canvas);
  ctrl.enableDamping = true; ctrl.autoRotate = true; ctrl.autoRotateSpeed = 0.35;
  ctrl.maxPolarAngle = Math.PI / 1.9; ctrl.minDistance = 4; ctrl.maxDistance = 14;

  const m = (c: number, r = 0.8, mt = 0) =>
    new THREE.MeshPhysicalMaterial({ color: c, roughness: r, metalness: mt });

  /* floor (dark marble) */
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), m(0x1a1009, 0.25, 0.1));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -2.5; floor.receiveShadow = true; scene.add(floor);

  /* table */
  const table = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.1, 48), m(0x5c2e0a, 0.35, 0.05));
  table.position.y = -0.6; table.castShadow = true; table.receiveShadow = true; scene.add(table);

  /* table edge ring */
  const tRim = new THREE.Mesh(new THREE.TorusGeometry(2.22, 0.04, 8, 80), m(0x3d1f06));
  tRim.rotation.x = Math.PI / 2; tRim.position.y = -0.55; scene.add(tRim);

  /* table cloth (white) */
  const cloth = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.02, 48), m(0xf8f4ee, 0.75));
  cloth.position.y = -0.54; scene.add(cloth);

  /* table leg */
  const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 2.0, 16), m(0x3d1f06, 0.4));
  tableLeg.position.set(0, -1.6, 0);
  scene.add(tableLeg);

  /* plates */
  const plateM = m(0xffffff, 0.15);
  [-0.9, 0.9].forEach((x) => {
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.04, 40), plateM);
    plate.position.set(x, -0.52, 0); plate.castShadow = true; scene.add(plate);
    /* inner rim */
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.015, 8, 40), m(0xe8e0d8, 0.2));
    rim.rotation.x = Math.PI / 2; rim.position.set(x, -0.5, 0); scene.add(rim);
    /* food blob */
    const food = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), m(0xd4733a, 0.7));
    food.scale.y = 0.35; food.position.set(x, -0.48, 0); scene.add(food);
  });

  /* wine glasses */
  [-1.4, 1.4].forEach((x) => {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.025, 0.8, 12), m(0xcccccc, 0.05, 0.1));
    stem.position.set(x, -0.1, 0.3); scene.add(stem);
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 20),
      new THREE.MeshPhysicalMaterial({ color: 0xaaddff, transparent: true, opacity: 0.25, roughness: 0, metalness: 0, transmission: 0.8, ior: 1.5 }));
    bowl.position.set(x, 0.18, 0.3); bowl.scale.y = 0.9; scene.add(bowl);
    /* wine */
    const wine = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), m(0x6b0f1a, 0.15));
    wine.scale.y = 0.3; wine.position.set(x, 0.06, 0.3); scene.add(wine);
    /* base */
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 24), m(0xcccccc, 0.05, 0.1));
    base.position.set(x, -0.51, 0.3); scene.add(base);
  });

  /* candle centrepiece */
  const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.9, 16), m(0xfff8f0, 0.7));
  candle.position.y = -0.07; scene.add(candle);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.14, 12), m(0xffcc44, 0.1));
  flame.position.y = 0.44; scene.add(flame);
  const candleLight = new THREE.PointLight(0xffaa33, 2.5, 8);
  candleLight.position.y = 0.55; scene.add(candleLight);

  /* candle plate */
  const cPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.025, 24), m(0xd4af37, 0.1, 0.9));
  cPlate.position.y = -0.53; scene.add(cPlate);

  /* cutlery (fork/knife lines) */
  [[-0.2, 0.9, -0.3], [0.2, 0.9, -0.3], [-0.2, -0.9, -0.3], [0.2, -0.9, -0.3]].forEach(([x, z, _y]) => {
    const utensil = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.005, 0.55), m(0xd0d0d0, 0.1, 0.9));
    utensil.position.set(x, -0.51, z); scene.add(utensil);
  });

  /* ambient lighting (warm restaurant) */
  scene.add(new THREE.AmbientLight(0x3a1a05, 0.6));
  const overhead = new THREE.PointLight(0xffe8cc, 1.5, 12); overhead.position.set(0, 4, 0); overhead.castShadow = true; scene.add(overhead);
  const fill = new THREE.PointLight(0xff9955, 1.2, 10); fill.position.set(-5, 2, -3); scene.add(fill);

  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false);
  };
  window.addEventListener("resize", onResize);
  let t = 0, animId = 0;
  const tick = () => {
    animId = requestAnimationFrame(tick); t += 0.01;
    ctrl.update();
    candleLight.intensity = 2.5 + Math.sin(t * 3.5) * 0.3;
    flame.scale.y = 1 + Math.sin(t * 5) * 0.12;
    renderer.render(scene, camera);
  };
  tick();
  return { cleanup: () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); ctrl.dispose(); renderer.dispose(); } };
}

/* ── 4. Automotive: Car Showroom ───────────────────────
   A sleek car body in metallic midnight black on a
   showroom platform, studio lighting
─────────────────────────────────────────────────────── */
function buildCarScene(
  THREE: typeof import("three"),
  OC: import("three/examples/jsm/controls/OrbitControls.js")["OrbitControls"],
  canvas: HTMLCanvasElement
) {
  const W = canvas.clientWidth || 600, H = canvas.clientHeight || 380;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H, false);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 80);
  camera.position.set(0, 1.5, 9);

  const ctrl = new OC(camera, canvas);
  ctrl.enableDamping = true; ctrl.autoRotate = true; ctrl.autoRotateSpeed = 0.55;
  ctrl.maxPolarAngle = Math.PI / 1.85; ctrl.minDistance = 5; ctrl.maxDistance = 15;

  const m = (c: number, r = 0.5, mt = 0.5) =>
    new THREE.MeshPhysicalMaterial({ color: c, roughness: r, metalness: mt });

  /* showroom platform */
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 4.0, 0.12, 64), m(0x1a1a1a, 0.02, 0.9));
  platform.position.y = -1.25; platform.receiveShadow = true; scene.add(platform);
  const pRim = new THREE.Mesh(new THREE.TorusGeometry(3.9, 0.02, 8, 80), new THREE.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.5 }));
  pRim.rotation.x = Math.PI / 2; pRim.position.y = -1.19; scene.add(pRim);

  /* car body — low poly sport car shape */
  const BODYC = 0x0d0d14; // deep midnight blue-black
  const bodyM = new THREE.MeshPhysicalMaterial({ color: BODYC, metalness: 0.95, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.04 });

  /* main chassis */
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.55, 1.7), bodyM);
  chassis.position.y = -0.5; chassis.castShadow = true; scene.add(chassis);

  /* cabin */
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.65, 1.55), bodyM);
  cabin.position.set(-0.2, 0.05, 0); cabin.castShadow = true; scene.add(cabin);

  /* windshield */
  const windM = new THREE.MeshPhysicalMaterial({ color: 0x88aacc, transparent: true, opacity: 0.28, roughness: 0, metalness: 0.05 });
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.55, 1.4), windM);
  windshield.position.set(0.8, 0.07, 0); windshield.rotation.z = -0.35; scene.add(windshield);

  /* rear window */
  const rearW = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 1.4), windM);
  rearW.position.set(-1.3, 0.07, 0); rearW.rotation.z = 0.3; scene.add(rearW);

  /* side windows */
  [-0.3, 0.3].forEach((z) => {
    const sideW = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.02), windM);
    sideW.position.set(-0.15, 0.1, z * 2.58); scene.add(sideW);
  });

  /* hood */
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 1.65), bodyM);
  hood.position.set(1.05, -0.19, 0); scene.add(hood);

  /* trunk */
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.14, 1.65), bodyM);
  trunk.position.set(-1.75, -0.15, 0); scene.add(trunk);

  /* headlights */
  const headlightM = new THREE.MeshPhysicalMaterial({ color: 0xfff4e0, emissive: new THREE.Color(0xffeecc), emissiveIntensity: 1.2, roughness: 0 });
  [[1.87, -0.45, 0.65], [1.87, -0.45, -0.65]].forEach(([x, y, z]) => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.28), headlightM);
    hl.position.set(x, y, z); scene.add(hl);
    const hll = new THREE.PointLight(0xfff0cc, 0.8, 6); hll.position.set(x + 0.3, y, z); scene.add(hll);
  });

  /* tail lights */
  const tailM = new THREE.MeshPhysicalMaterial({ color: 0xff2200, emissive: new THREE.Color(0xff2200), emissiveIntensity: 0.7, roughness: 0.1 });
  [[-1.87, -0.45, 0.65], [-1.87, -0.45, -0.65]].forEach(([x, y, z]) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.26), tailM);
    tl.position.set(x, y, z); scene.add(tl);
  });

  /* wheels */
  const wheelM = m(0x111111, 0.6, 0.1);
  const rimM   = m(0xd0d0d0, 0.04, 0.96);
  [[1.1, -0.78, 0.9], [1.1, -0.78, -0.9], [-1.1, -0.78, 0.9], [-1.1, -0.78, -0.9]].forEach(([x, y, z]) => {
    const tyre = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.16, 16, 40), wheelM);
    tyre.rotation.y = Math.PI / 2; tyre.position.set(x, y, z); tyre.castShadow = true; scene.add(tyre);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.14, 24), rimM);
    rim.rotation.z = Math.PI / 2; rim.position.set(x, y, z); scene.add(rim);
    /* spokes */
    for (let s = 0; s < 5; s++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.52, 0.04), rimM);
      spoke.rotation.z = Math.PI / 2; spoke.rotation.x = (s / 5) * Math.PI * 2;
      spoke.position.set(x, y, z); scene.add(spoke);
    }
  });

  /* studio lights */
  scene.add(new THREE.AmbientLight(0x222233, 0.5));
  const k1 = new THREE.SpotLight(0xfff8f0, 4, 25, Math.PI / 6, 0.3); k1.position.set(6, 8, 4); k1.castShadow = true; scene.add(k1);
  const k2 = new THREE.PointLight(0x5588ff, 2, 18); k2.position.set(-6, 4, -5); scene.add(k2);
  const k3 = new THREE.PointLight(0xffd080, 1.5, 14); k3.position.set(3, -2, 6); scene.add(k3);

  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false);
  };
  window.addEventListener("resize", onResize);
  let t = 0, animId = 0;
  const tick = () => {
    animId = requestAnimationFrame(tick); t += 0.008;
    ctrl.update();
    k1.position.x = Math.sin(t * 0.3) * 7; k1.position.z = Math.cos(t * 0.3) * 5;
    renderer.render(scene, camera);
  };
  tick();
  return { cleanup: () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); ctrl.dispose(); renderer.dispose(); } };
}

/* ── 5. Beauty / Wellness: Skincare Shelf ──────────────
   Three elegant product bottles on a marble shelf
   Colours: white marble, rose gold accents, pearl white
─────────────────────────────────────────────────────── */
function buildBeautyScene(
  THREE: typeof import("three"),
  OC: import("three/examples/jsm/controls/OrbitControls.js")["OrbitControls"],
  canvas: HTMLCanvasElement
) {
  const W = canvas.clientWidth || 600, H = canvas.clientHeight || 380;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H, false);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 60);
  camera.position.set(0, 1.0, 8);

  const ctrl = new OC(camera, canvas);
  ctrl.enableDamping = true; ctrl.autoRotate = true; ctrl.autoRotateSpeed = 0.4;
  ctrl.maxPolarAngle = Math.PI / 1.8; ctrl.minDistance = 4; ctrl.maxDistance = 14;

  const m = (c: number, r = 0.6, mt = 0) =>
    new THREE.MeshPhysicalMaterial({ color: c, roughness: r, metalness: mt });

  /* marble shelf */
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.12, 1.4), m(0xf5f0ec, 0.12, 0.0));
  shelf.position.y = -1.5; shelf.receiveShadow = true; scene.add(shelf);
  /* shelf edge rim */
  const sRim = new THREE.Mesh(new THREE.BoxGeometry(5.52, 0.02, 0.04), m(0xd4c4b4, 0.1));
  sRim.position.set(0, -1.43, 0.72); scene.add(sRim);

  /* back wall panel */
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), m(0x1a1a22, 0.9));
  wall.position.set(0, 0, -0.8); scene.add(wall);

  const ROSE_GOLD = 0xb76e79;
  const PEARL     = 0xf0ebe0;
  const IVORY     = 0xfff8ee;

  /* bottle helper */
  const addBottle = (x: number, bodyColor: number, capColor: number, h: number) => {
    const bodyM = new THREE.MeshPhysicalMaterial({ color: bodyColor, roughness: 0.1, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.04, transparent: true, opacity: 0.88 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, h, 32), bodyM);
    body.position.set(x, -1.5 + h / 2, 0); body.castShadow = true; scene.add(body);

    /* shoulder taper */
    const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.28, 0.22, 32), bodyM);
    shoulder.position.set(x, -1.5 + h + 0.1, 0); scene.add(shoulder);

    /* neck */
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 0.3, 24), m(capColor, 0.08, 0.9));
    neck.position.set(x, -1.5 + h + 0.32, 0); scene.add(neck);

    /* cap */
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.4, 24), m(capColor, 0.06, 0.95));
    cap.position.set(x, -1.5 + h + 0.62, 0); scene.add(cap);

    /* label */
    const label = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.55, 0.01), m(IVORY, 0.55));
    label.position.set(x, -1.5 + h / 2, 0.3); scene.add(label);

    /* label decorative line */
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.006, 0.01), m(capColor, 0.1, 0.8));
    line.position.set(x, -1.5 + h / 2 - 0.15, 0.305); scene.add(line);
  };

  addBottle(-1.5, PEARL,     0x222222, 1.8);
  addBottle(0,    0xf8e8d8,  ROSE_GOLD, 2.2);
  addBottle(1.5,  0xe8ddd0,  0x555555, 1.6);

  /* floating petals / dust */
  const pPos = new Float32Array(120 * 3);
  for (let i = 0; i < 120; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 5; pPos[i * 3 + 1] = (Math.random() - 0.5) * 4; pPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: ROSE_GOLD, size: 0.022, transparent: true, opacity: 0.4 })));

  /* lights */
  scene.add(new THREE.AmbientLight(0xfff0f0, 0.5));
  const key = new THREE.SpotLight(0xfff8f0, 4, 20, Math.PI / 5, 0.2); key.position.set(3, 6, 5); key.castShadow = true; scene.add(key);
  const fill2 = new THREE.PointLight(0xffd0e0, 2, 12); fill2.position.set(-4, 3, 3); scene.add(fill2);
  const under = new THREE.PointLight(ROSE_GOLD, 1.2, 8); under.position.set(0, -3, 2); scene.add(under);

  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false);
  };
  window.addEventListener("resize", onResize);
  let t = 0, animId = 0;
  const tick = () => {
    animId = requestAnimationFrame(tick); t += 0.008;
    ctrl.update();
    key.position.x = Math.sin(t * 0.3) * 4; key.position.z = Math.cos(t * 0.3) * 5;
    renderer.render(scene, camera);
  };
  tick();
  return { cleanup: () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); ctrl.dispose(); renderer.dispose(); } };
}

/* ── 6. Fitness: Indoor Basketball Court ───────────────
   Polished hardwood floor, scoreboard, hoops
   Colours: orange hardwood, white lines, silver hoops
─────────────────────────────────────────────────────── */
function buildGymScene(
  THREE: typeof import("three"),
  OC: import("three/examples/jsm/controls/OrbitControls.js")["OrbitControls"],
  canvas: HTMLCanvasElement
) {
  const W = canvas.clientWidth || 600, H = canvas.clientHeight || 380;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H, false);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
  camera.position.set(0, 5, 14);

  const ctrl = new OC(camera, canvas);
  ctrl.enableDamping = true; ctrl.autoRotate = true; ctrl.autoRotateSpeed = 0.25;
  ctrl.maxPolarAngle = Math.PI / 2.1; ctrl.minDistance = 6; ctrl.maxDistance = 22;

  const m = (c: number, r = 0.7, mt = 0) =>
    new THREE.MeshPhysicalMaterial({ color: c, roughness: r, metalness: mt });

  /* court floor (hardwood) */
  const court = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 8), m(0xb5651d, 0.28, 0.05));
  court.position.y = -2.0; court.receiveShadow = true; scene.add(court);

  /* hardwood plank lines */
  for (let i = -6; i <= 6; i++) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.005, 8), m(0x9a5215, 0.35));
    plank.position.set(i, -1.94, 0); scene.add(plank);
  }

  /* court lines (white) */
  const lineM = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const addLine = (x: number, z: number, w: number, d: number) => {
    const l = new THREE.Mesh(new THREE.PlaneGeometry(w, d), lineM);
    l.rotation.x = -Math.PI / 2; l.position.set(x, -1.94, z); scene.add(l);
  };
  addLine(0, 0, 13.5, 0.06); // centre
  addLine(0, 0, 0.06, 7.5);   // halfway
  const centreCircle = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.04, 8, 64), lineM);
  centreCircle.rotation.x = -Math.PI / 2;
  centreCircle.position.set(0, -1.93, 0);
  scene.add(centreCircle);
  // 3-point arcs
  [- 5.5, 5.5].forEach((x) => {
    const arc = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.04, 8, 64, Math.PI), lineM);
    arc.rotation.x = -Math.PI / 2; arc.rotation.z = x > 0 ? 0 : Math.PI;
    arc.position.set(x, -1.93, 0); scene.add(arc);
  });

  /* baskets */
  const addBasket = (x: number, side: number) => {
    /* backboard */
    const bb = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 1.7), new THREE.MeshPhysicalMaterial({ color: 0xddddff, transparent: true, opacity: 0.55, roughness: 0.05 }));
    bb.position.set(x, 1.3, 0); scene.add(bb);
    /* pole */
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 5, 12), m(0x888888, 0.3, 0.7));
    pole.position.set(x + side * 0.6, -0.5, 0); scene.add(pole);
    /* arm */
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.06), m(0x888888, 0.3, 0.7));
    arm.position.set(x + side * 0.18, 1.8, 0); scene.add(arm);
    /* rim */
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.025, 8, 40), m(0xcc5500, 0.1, 0.8));
    rim.rotation.x = Math.PI / 2; rim.position.set(x - side * 0.12, 1.5, 0); scene.add(rim);
    /* net (vertical lines) */
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const net = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.5, 4),
        new THREE.MeshBasicMaterial({ color: 0xdddddd, transparent: true, opacity: 0.6 }));
      net.position.set(x - side * 0.12 + Math.cos(a) * 0.32, 1.22, Math.sin(a) * 0.32); scene.add(net);
    }
  };
  addBasket(-6.5, 1); addBasket(6.5, -1);

  /* ceiling lamps */
  [-4, 0, 4].forEach((x) => {
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.3), m(0x333333, 0.3, 0.8));
    lamp.position.set(x, 4.2, 0); scene.add(lamp);
    const l = new THREE.PointLight(0xfff4e0, 2.5, 14); l.position.set(x, 4.0, 0); l.castShadow = true; scene.add(l);
    /* light bloom disc */
    const disc = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.2), new THREE.MeshBasicMaterial({ color: 0xfff4cc, transparent: true, opacity: 0.9 }));
    disc.rotation.x = Math.PI / 2; disc.position.set(x, 4.14, 0); scene.add(disc);
  });

  /* basketball */
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 32), m(0xcc6600, 0.4, 0.05));
  ball.position.set(1, -1.5, 1.5); ball.castShadow = true; scene.add(ball);
  /* seams */
  [0, Math.PI / 2].forEach((rot) => {
    const seam = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.008, 8, 40),
      new THREE.MeshBasicMaterial({ color: 0x222222 }));
    seam.rotation.y = rot; ball.add(seam);
  });

  scene.add(new THREE.AmbientLight(0x445566, 0.4));

  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false);
  };
  window.addEventListener("resize", onResize);
  let t = 0, animId = 0;
  const tick = () => {
    animId = requestAnimationFrame(tick); t += 0.012;
    ctrl.update();
    ball.position.y = -1.5 + Math.abs(Math.sin(t * 1.8)) * 1.2;
    ball.rotation.z += 0.03;
    renderer.render(scene, camera);
  };
  tick();
  return { cleanup: () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); ctrl.dispose(); renderer.dispose(); } };
}

/* ── 7. Hotel: Luxury Hotel Room Interior ──────────────
   King bed, side tables, pendant lights, marble floor
   Colours: warm ivory, walnut wood, brass, soft cream
─────────────────────────────────────────────────────── */
function buildHotelScene(
  THREE: typeof import("three"),
  OC: import("three/examples/jsm/controls/OrbitControls.js")["OrbitControls"],
  canvas: HTMLCanvasElement
) {
  const W = canvas.clientWidth || 600, H = canvas.clientHeight || 380;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H, false);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 60);
  camera.position.set(0, 2, 10);

  const ctrl = new OC(camera, canvas);
  ctrl.enableDamping = true; ctrl.autoRotate = true; ctrl.autoRotateSpeed = 0.22;
  ctrl.maxPolarAngle = Math.PI / 1.9; ctrl.minDistance = 5; ctrl.maxDistance = 16;

  const m = (c: number, r = 0.8, mt = 0) =>
    new THREE.MeshPhysicalMaterial({ color: c, roughness: r, metalness: mt });

  const WALNUT  = 0x5c3317;
  const IVORY   = 0xfaf5ee;
  const BRASS   = 0xb5860d;
  const CREAM   = 0xf0ebe0;

  /* floor (marble) */
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), m(0xd0c8bc, 0.06, 0.02));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -2.5; floor.receiveShadow = true; scene.add(floor);

  /* walls */
  const wallM = m(0x2a1f16, 0.95); // deep warm charcoal
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 7), wallM);
  backWall.position.set(0, 0.5, -3.5); scene.add(backWall);
  const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 7), wallM);
  sideWall.rotation.y = Math.PI / 2; sideWall.position.set(-4.5, 0.5, -0.5); scene.add(sideWall);

  /* bed frame */
  const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.28, 2.4), m(WALNUT, 0.3, 0.05));
  bedFrame.position.y = -1.72; bedFrame.castShadow = true; scene.add(bedFrame);

  /* mattress */
  const mattress = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.3, 2.2), m(IVORY, 0.9));
  mattress.position.y = -1.46; scene.add(mattress);

  /* duvet */
  const duvet = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.22, 1.6), m(CREAM, 0.85));
  duvet.position.set(0, -1.29, -0.2); scene.add(duvet);

  /* pillows */
  [-0.9, 0, 0.9].forEach((x) => {
    const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.22, 0.55),
      new THREE.MeshPhysicalMaterial({ color: IVORY, roughness: 0.8 }));
    pillow.position.set(x, -1.22, -0.9); scene.add(pillow);
  });

  /* headboard */
  const headboard = new THREE.Mesh(new THREE.BoxGeometry(3.9, 1.2, 0.14), m(WALNUT, 0.28, 0.05));
  headboard.position.set(0, -0.68, -1.27); scene.add(headboard);
  /* headboard panel detail */
  const panel = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.7, 0.06), m(0x7a4420, 0.35));
  panel.position.set(0, -0.6, -1.2); scene.add(panel);

  /* bedside tables */
  [-2.15, 2.15].forEach((x) => {
    const table = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.7, 0.6), m(WALNUT, 0.3, 0.05));
    table.position.set(x, -2.1, -0.7); table.castShadow = true; scene.add(table);
    /* lamp body */
    const lBody = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.055, 0.5, 16), m(BRASS, 0.06, 0.96));
    lBody.position.set(x, -1.55, -0.7); scene.add(lBody);
    /* lamp shade */
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.3, 24, 1, true), m(0xe8d8c0, 0.6));
    shade.position.set(x, -1.2, -0.7); scene.add(shade);
    const ll = new THREE.PointLight(0xffcc88, 0.8, 4); ll.position.set(x, -1.0, -0.7); scene.add(ll);
  });

  /* pendant ceiling light */
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.8, 8), m(0xd4af37, 0.1, 0.9));
  cord.position.set(0, 2.0, -0.5); scene.add(cord);
  const pendant = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24),
    new THREE.MeshPhysicalMaterial({ color: 0xf8e8cc, transparent: true, opacity: 0.6, roughness: 0.05, emissive: new THREE.Color(0xffcc88), emissiveIntensity: 0.8 }));
  pendant.position.set(0, 1.1, -0.5); scene.add(pendant);
  const overhead = new THREE.PointLight(0xffd080, 2.5, 14); overhead.position.copy(pendant.position); overhead.castShadow = true; scene.add(overhead);

  /* window (daylight glow) */
  const window3D = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.0),
    new THREE.MeshPhysicalMaterial({ color: 0xbbddff, transparent: true, opacity: 0.25, emissive: new THREE.Color(0x88bbff), emissiveIntensity: 0.5 }));
  window3D.position.set(3.8, 0.3, -0.5); window3D.rotation.y = Math.PI / 2; scene.add(window3D);
  const daylight = new THREE.PointLight(0xaaccff, 2, 14); daylight.position.set(3.5, 0.3, -0.5); scene.add(daylight);
  const curtainL = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 2.1), m(0x8a7a6a, 0.8));
  curtainL.rotation.y = Math.PI / 2; curtainL.position.set(4.0, 0.3, 0.63); scene.add(curtainL);
  const curtainR = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 2.1), m(0x8a7a6a, 0.8));
  curtainR.rotation.y = Math.PI / 2; curtainR.position.set(4.0, 0.3, -1.83); scene.add(curtainR);

  /* rug */
  const rug = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.8), m(0x7a5c42, 0.95));
  rug.rotation.x = -Math.PI / 2; rug.position.set(0, -2.48, 1.5); scene.add(rug);

  scene.add(new THREE.AmbientLight(0x1a1208, 0.5));

  const onResize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false);
  };
  window.addEventListener("resize", onResize);
  let animId = 0;
  const tick = () => { animId = requestAnimationFrame(tick); ctrl.update(); renderer.render(scene, camera); };
  tick();
  return { cleanup: () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); ctrl.dispose(); renderer.dispose(); } };
}

/* ═══════════════════════════════════════════════════════
   USE-CASE DATA
   ═══════════════════════════════════════════════════════ */
const USE_CASES = [
  {
    id: "ecommerce",
    industry: "E-Commerce & Retail",
    title: "Interactive Product Configurator",
    description:
      "Customers rotate, customise colour/material and see exactly what they're buying — before adding to cart. Brands using 3D product viewers see up to 40% fewer returns and 3× longer session time.",
    impact: [
      { value: 40, suffix: "%", label: "Fewer Returns" },
      { value: 3,  suffix: "×", label: "Session Time" },
      { value: 27, suffix: "%", label: "Conversion Lift" },
    ],
    builder: buildEcommerceScene,
    tag: "DRAG TO ROTATE",
  },
  {
    id: "realestate",
    industry: "Real Estate & Property",
    title: "Property Exterior Walkthrough",
    description:
      "Buyers orbit a photorealistic villa — warm interior lights, landscaping, pool — before ever visiting. 3D property showcases generate 2× more qualified leads than static images.",
    impact: [
      { value: 2,  suffix: "×", label: "Qualified Leads" },
      { value: 58, suffix: "%", label: "Faster Close" },
      { value: 70, suffix: "%", label: "Fewer Cancellations" },
    ],
    builder: buildRealEstateScene,
    tag: "ORBIT THE PROPERTY",
  },
  {
    id: "restaurant",
    industry: "Restaurants & F&B",
    title: "3D Dining Atmosphere Preview",
    description:
      "Let diners experience your ambiance — candlelit tables, plated dishes, glassware — before they book. Restaurants with immersive previews see 28% more online reservations.",
    impact: [
      { value: 28, suffix: "%", label: "More Reservations" },
      { value: 35, suffix: "%", label: "Upsell Rate" },
      { value: 22, suffix: "%", label: "Avg Order Value" },
    ],
    builder: buildRestaurantScene,
    tag: "EXPLORE THE AMBIANCE",
  },
  {
    id: "automotive",
    industry: "Automotive & Showrooms",
    title: "Virtual Car Showroom",
    description:
      "Customers inspect paint, wheels and interior from every angle — no dealership visit needed. Test-drive intent increases 4× after a digital configuration session.",
    impact: [
      { value: 4,  suffix: "×", label: "Test-Drive Intent" },
      { value: 68, suffix: "%", label: "Time on Site" },
      { value: 31, suffix: "%", label: "Online Bookings" },
    ],
    builder: buildCarScene,
    tag: "360° STUDIO VIEW",
  },
  {
    id: "beauty",
    industry: "Beauty & Wellness",
    title: "3D Product Shelf Display",
    description:
      "Bring the store shelf online. Customers inspect every product, read ingredients and checkout — as natural as in-store shopping. Doubles mobile conversion on average.",
    impact: [
      { value: 2,  suffix: "×", label: "Mobile Conversions" },
      { value: 45, suffix: "%", label: "Product Discovery" },
      { value: 60, suffix: "%", label: "Larger Cart" },
    ],
    builder: buildBeautyScene,
    tag: "INSPECT PRODUCTS",
  },
  {
    id: "fitness",
    industry: "Gyms & Sports",
    title: "Facility Virtual Tour",
    description:
      "Let prospects explore your courts, courts and equipment in full 3D before they sign up. Gyms using virtual tours see 50% more membership inquiries from online traffic.",
    impact: [
      { value: 50, suffix: "%", label: "More Inquiries" },
      { value: 80, suffix: "%", label: "Show-Up Rate" },
      { value: 90, suffix: "%", label: "Reduced No-Shows" },
    ],
    builder: buildGymScene,
    tag: "TOUR THE FACILITY",
  },
  {
    id: "hospitality",
    industry: "Hotels & Hospitality",
    title: "Luxury Room Visualisation",
    description:
      "Guests explore the exact room they're booking — bed, views, amenities — before confirming. Hotels with room tours see 67% more direct bookings and higher upgrade revenue.",
    impact: [
      { value: 67, suffix: "%", label: "Direct Bookings" },
      { value: 40, suffix: "%", label: "Upgrade Revenue" },
      { value: 89, suffix: "%", label: "Confidence Score" },
    ],
    builder: buildHotelScene,
    tag: "WALK THROUGH THE ROOM",
  },
] as const;

/* ═══════════════════════════════════════════════════════
   Stat badge
   ═══════════════════════════════════════════════════════ */
function StatBadge({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, 900, active);
  return (
    <div style={{ flex: 1, minWidth: 80, background: "rgba(200,168,75,0.06)", border: "1px solid rgba(200,168,75,0.16)", borderRadius: 10, padding: "14px 10px", textAlign: "center" }}>
      <div style={{ fontWeight: 900, fontSize: "1.35rem", color: "#c8a84b", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{count}{suffix}</div>
      <div style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "monospace", marginTop: 5, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function UseCasesPage() {
  const [active, setActive] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStatsVisible(false);
    const t = setTimeout(() => setStatsVisible(true), 150);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const uc = USE_CASES[active];

  return (
    <>
      <Navbar />
      <main className="flex-1 relative z-10" style={{ paddingTop: 90 }}>

        {/* ── Hero ── */}
        <section style={{ maxWidth: 860, margin: "0 auto", padding: "56px 24px 40px", textAlign: "center" }}>
          <div className="section-label mx-auto" style={{ marginBottom: 20 }}>
            <span style={{ color: "var(--primary)" }}>◆</span> Real-World Use Cases
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5.5vw, 3.6rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: 20, letterSpacing: "-0.03em" }}>
            <span className="gradient-text">3D Experiences</span> Your Business
            <br />Can Deploy Tomorrow
          </h1>
          <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "var(--text-secondary)", lineHeight: 1.78, maxWidth: 600, margin: "0 auto 32px" }}>
            Forget decorative spinning cubes. These are production-grade 3D web interactions — live demos built with WebGL, running natively in your browser, for real businesses in every industry.
          </p>
          {/* industry pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {USE_CASES.map((u, i) => (
              <button key={u.id} onClick={() => setActive(i)} style={{
                fontSize: 11, padding: "6px 14px", borderRadius: 20, cursor: "pointer",
                background: active === i ? "var(--primary)" : "rgba(255,255,255,0.04)",
                color: active === i ? "#000" : "var(--text-secondary)",
                border: active === i ? "1px solid var(--primary)" : "1px solid rgba(255,255,255,0.1)",
                fontWeight: active === i ? 700 : 500,
                transition: "all 0.22s", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.04em",
              }}>
                {u.industry.split(" ")[0]}
              </button>
            ))}
          </div>
        </section>

        {/* ── Main interactive section ── */}
        <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px 100px" }}>
          <div className="uc-main-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 28, alignItems: "start" }}>

            {/* Left: industry selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 8, paddingLeft: 2 }}>
                SELECT INDUSTRY →
              </div>
              {USE_CASES.map((u, i) => (
                <button key={u.id} id={`use-case-${u.id}`} onClick={() => setActive(i)} className="text-left" style={{
                  padding: "11px 14px",
                  background: active === i ? "rgba(200,168,75,0.06)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${active === i ? "rgba(200,168,75,0.3)" : "rgba(255,255,255,0.07)"}`,
                  borderLeft: active === i ? "3px solid #c8a84b" : "3px solid transparent",
                  borderRadius: 10, cursor: "pointer", transition: "all 0.22s ease",
                }}>
                  <div style={{ fontSize: 8, color: active === i ? "#c8a84b" : "var(--text-muted)", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>
                    {u.industry}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: active === i ? "var(--text-primary)" : "var(--text-secondary)", transition: "color 0.22s" }}>
                    {u.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Right: 3D scene + details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* 3D canvas card */}
              <div className="glass-card" style={{ height: 400, overflow: "hidden", position: "relative" }}>
                {/* corner brackets (gold accent) */}
                {["top-0 left-0 border-t-2 border-l-2 rounded-tl-lg","top-0 right-0 border-t-2 border-r-2 rounded-tr-lg","bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg","bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg"].map((cls, k) => (
                  <div key={k} className={`absolute w-6 h-6 ${cls} z-20`} style={{ borderColor: "rgba(200,168,75,0.5)" }} />
                ))}

                {/* interaction tag */}
                <div style={{ position: "absolute", top: 14, right: 14, zIndex: 10, fontSize: 9, padding: "4px 11px", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(200,168,75,0.3)", borderRadius: 6, color: "#c8a84b", fontFamily: "monospace", letterSpacing: "0.1em" }}>
                  {uc.tag}
                </div>
                {/* industry label */}
                <div style={{ position: "absolute", top: 14, left: 14, zIndex: 10, fontSize: 8, padding: "4px 10px", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "var(--text-muted)", fontFamily: "monospace", letterSpacing: "0.08em" }}>
                  {uc.industry.toUpperCase()}
                </div>
                {/* live dot */}
                <div style={{ position: "absolute", bottom: 14, left: 14, zIndex: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontFamily: "monospace", color: "rgba(200,168,75,0.75)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(200,168,75,0.9)", animation: "pulse 2s infinite" }} />
                  LIVE 3D · DRAG TO ORBIT
                </div>

                {/* Three.js canvas */}
                <ThreeCanvas key={`${uc.id}-${active}`} builder={uc.builder} id={`${uc.id}-${active}`} />
              </div>

              {/* Details card */}
              <div className="glass-card" style={{ padding: "28px 30px" }}>
                <h2 style={{ fontSize: "1.45rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: 12, letterSpacing: "-0.025em" }}>
                  {uc.title}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.84, marginBottom: 24 }}>
                  {uc.description}
                </p>
                {/* animated stats */}
                <div ref={statsRef} style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                  {uc.impact.map((imp, i) => (
                    <StatBadge key={i} value={imp.value} suffix={imp.suffix} label={imp.label} active={statsVisible} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="/#contact" className="btn-primary" style={{ fontSize: 13, display: "inline-flex", gap: 8, alignItems: "center" }} id={`cta-${uc.id}`}>
                    <span>Build This For My Business</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <a href="/showcase" className="btn-secondary" style={{ fontSize: 13, display: "inline-flex", gap: 8, alignItems: "center" }}>
                    <span>View 3D Gallery</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px" }}>
          <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
            {[["7+","Industries Covered"],["60fps","Performance"],["100%","Custom Built"],["0","External App Required"],["∞","Design Possibilities"]].map(([v, l], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 900, fontSize: "1.6rem", color: "#c8a84b", lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "monospace", marginTop: 5, letterSpacing: "0.08em" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{ padding: "80px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div className="section-label mx-auto" style={{ marginBottom: 24 }}>
              <span style={{ color: "var(--primary)" }}>◆</span> Your Industry Not Listed?
            </div>
            <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.8rem)", fontWeight: 900, color: "var(--text-primary)", marginBottom: 18, letterSpacing: "-0.025em", lineHeight: 1.12 }}>
              We Build Custom 3D Experiences<br />
              <span className="gradient-text">For Any Business Vertical</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.82, marginBottom: 36 }}>
              From clinic appointment systems to law-firm case visualisers — if your business has a web presence, we can upgrade it with a 3D experience that converts.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/#contact" className="btn-primary" id="bottom-cta-contact" style={{ fontSize: 14 }}>
                <span>Get a Free Consultation</span>
              </a>
              <a href="/showcase" className="btn-secondary" id="bottom-cta-gallery" style={{ fontSize: 14 }}>
                <span>View Full 3D Gallery</span>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 860px) {
          .uc-main-grid { grid-template-columns: 1fr !important; }
          .uc-main-grid > div:first-child {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 6px !important;
            padding-bottom: 6px;
          }
          .uc-main-grid > div:first-child > div:first-child { display: none; }
        }
      `}</style>
    </>
  );
}
