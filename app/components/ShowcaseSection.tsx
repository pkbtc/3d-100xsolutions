"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type * as THREE_TYPE from "three";

const TABS = [
  {
    id: "city",
    label: "City Block",
    icon: "🏙",
    desc: "Architectural visualization - fly through entire city blocks before construction begins.",
    stats: [{ v: "40+", l: "Buildings" }, { v: "360°", l: "View" }, { v: "Real-time", l: "Render" }],
  },
  {
    id: "product",
    label: "Product 360°",
    icon: "📦",
    desc: "Interactive product configurator - customers inspect, rotate and customise from every angle.",
    stats: [{ v: "∞", l: "Rotation" }, { v: "4K", l: "Detail" }, { v: "AR-ready", l: "Export" }],
  },
  {
    id: "data",
    label: "Data World",
    icon: "🌐",
    desc: "Immersive data visualisation - turn abstract numbers into captivating 3D experiences.",
    stats: [{ v: "2K+", l: "Particles" }, { v: "Live", l: "Animation" }, { v: "60fps", l: "Smooth" }],
  },
];

export default function ShowcaseSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState("city");
  const [isLoading, setIsLoading] = useState(true);
  const infoRef = useRef<HTMLDivElement>(null);

  const sceneRef = useRef<{
    cleanup: () => void;
    switchScene: (tab: string) => void;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let animId: number;

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );
      const { EffectComposer } = await import(
        "three/examples/jsm/postprocessing/EffectComposer.js"
      );
      const { RenderPass } = await import(
        "three/examples/jsm/postprocessing/RenderPass.js"
      );
      const { UnrealBloomPass } = await import(
        "three/examples/jsm/postprocessing/UnrealBloomPass.js"
      );

      const canvas = canvasRef.current!;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;

      // ── Renderer ──
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H, false);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // ── Scene / Camera ──
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.04);

      const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200);
      camera.position.set(0, 3, 10);

      // ── Controls ──
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.minDistance = 4;
      controls.maxDistance = 18;
      controls.maxPolarAngle = Math.PI / 1.8;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;

      // ── Post-processing: Bloom ──
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(W, H),
        0.9,   // strength
        0.4,   // radius
        0.2    // threshold
      );
      composer.addPass(bloom);

      // ── Shared helpers ──
      const mkMat = (opts: THREE_TYPE.MeshPhysicalMaterialParameters) =>
        new THREE.MeshPhysicalMaterial(opts);

      const PRIMARY = 0x66f209;
      const ACCENT = 0x00f0ff;

      // ── Scene root ──
      let currentGroup: THREE_TYPE.Group | null = null;
      const addGroup = (g: THREE_TYPE.Group) => {
        if (currentGroup) scene.remove(currentGroup);
        currentGroup = g;
        scene.add(g);
      };

      // ────────────────────────────────────────
      // 🏙  SCENE 1 – CITY BLOCK
      // ────────────────────────────────────────
      const buildCity = () => {
        const g = new THREE.Group();

        // Ground plane
        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(40, 40),
          mkMat({ color: 0x050f05, roughness: 0.1, metalness: 0.9 })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        g.add(ground);

        // Grid lines on ground
        const grid = new THREE.GridHelper(40, 30, PRIMARY, 0x0a200a);
        (grid.material as THREE_TYPE.Material).transparent = true;
        (grid.material as THREE_TYPE.Material).opacity = 0.35;
        g.add(grid);

        // Buildings
        const buildings = [
          { x: 0, z: 0, w: 1.4, h: 6, d: 1.4, color: 0x0d2b0d },
          { x: -2.5, z: -1, w: 1.0, h: 4.2, d: 1.0, color: 0x091a09 },
          { x: 2.5, z: -0.5, w: 1.1, h: 3.8, d: 1.1, color: 0x0b200b },
          { x: -4, z: 1, w: 0.8, h: 5.1, d: 0.8, color: 0x0a1a0a },
          { x: 4, z: 0.5, w: 0.9, h: 4.6, d: 0.9, color: 0x0c220c },
          { x: -1.2, z: 2.5, w: 0.7, h: 2.8, d: 0.7, color: 0x081508 },
          { x: 1.5, z: 3, w: 0.8, h: 3.2, d: 0.8, color: 0x091808 },
          { x: -5.5, z: -2, w: 1.2, h: 3.9, d: 1.0, color: 0x0a1c0a },
          { x: 5.5, z: -1.5, w: 1.0, h: 5.5, d: 1.0, color: 0x0d2a0d },
        ];

        buildings.forEach(({ x, z, w, h, d, color }) => {
          // Body
          const body = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, d),
            mkMat({
              color,
              metalness: 0.9,
              roughness: 0.1,
              transparent: true,
              opacity: 0.88,
            })
          );
          body.position.set(x, h / 2, z);
          body.castShadow = true;
          g.add(body);

          // Glowing edges (wireframe thin box)
          const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
          const edgeLine = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({
              color: PRIMARY,
              transparent: true,
              opacity: 0.4,
            })
          );
          edgeLine.position.copy(body.position);
          g.add(edgeLine);

          // Window dots
          const wRows = Math.floor(h / 0.55);
          const wCols = 2;
          for (let r = 0; r < wRows; r++) {
            for (let c = 0; c < wCols; c++) {
              if (Math.random() < 0.35) continue; // some dark windows
              const win = new THREE.Mesh(
                new THREE.PlaneGeometry(0.12, 0.12),
                new THREE.MeshBasicMaterial({
                  color: Math.random() > 0.3 ? ACCENT : PRIMARY,
                  transparent: true,
                  opacity: 0.85,
                })
              );
              win.position.set(
                x + (c === 0 ? -0.2 : 0.2),
                0.35 + r * 0.55,
                z + d / 2 + 0.01
              );
              g.add(win);
            }
          }

          // Antenna / roof feature
          if (h > 4.5) {
            const ant = new THREE.Mesh(
              new THREE.CylinderGeometry(0.015, 0.015, 1.2),
              new THREE.MeshBasicMaterial({ color: PRIMARY })
            );
            ant.position.set(x, h + 0.6, z);
            g.add(ant);

            const tip = new THREE.Mesh(
              new THREE.SphereGeometry(0.04),
              new THREE.MeshBasicMaterial({ color: 0xff2222 })
            );
            tip.position.set(x, h + 1.2, z);
            g.add(tip);
          }
        });

        // Street lights
        [-3, 0, 3].forEach((x) => {
          const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 2),
            new THREE.MeshBasicMaterial({ color: 0x444444 })
          );
          pole.position.set(x, 1, 4.2);
          g.add(pole);

          const bulb = new THREE.PointLight(ACCENT, 0.6, 4);
          bulb.position.set(x, 2.1, 4.2);
          g.add(bulb);

          const glow = new THREE.Mesh(
            new THREE.SphereGeometry(0.08),
            new THREE.MeshBasicMaterial({ color: ACCENT })
          );
          glow.position.copy(bulb.position);
          g.add(glow);
        });

        g.position.y = -1.5;
        return g;
      };

      // ────────────────────────────────────────
      // 📦  SCENE 2 – PRODUCT 360°
      // ────────────────────────────────────────
      const buildProduct = () => {
        const g = new THREE.Group();

        // Pedestal
        const ped = new THREE.Mesh(
          new THREE.CylinderGeometry(1.4, 1.6, 0.18, 64),
          mkMat({ color: 0x0a0a0a, metalness: 1, roughness: 0.05 })
        );
        ped.position.y = -2;
        ped.receiveShadow = true;
        g.add(ped);

        const pedEdge = new THREE.Mesh(
          new THREE.TorusGeometry(1.5, 0.012, 16, 100),
          new THREE.MeshBasicMaterial({ color: PRIMARY })
        );
        pedEdge.position.y = -1.92;
        pedEdge.rotation.x = Math.PI / 2;
        g.add(pedEdge);

        // Phone body
        const phoneBody = new THREE.Mesh(
          new THREE.BoxGeometry(1.1, 2.3, 0.12),
          mkMat({
            color: 0x111111,
            metalness: 1,
            roughness: 0.0,
            clearcoat: 1,
            clearcoatRoughness: 0.02,
          })
        );
        phoneBody.castShadow = true;
        g.add(phoneBody);

        // Screen glow
        const screen = new THREE.Mesh(
          new THREE.BoxGeometry(0.96, 2.05, 0.01),
          mkMat({
            color: 0x001a33,
            emissive: new THREE.Color(ACCENT),
            emissiveIntensity: 0.6,
            roughness: 0.0,
            metalness: 0.1,
          })
        );
        screen.position.z = 0.065;
        g.add(screen);

        // Camera notch
        const cam = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 0.02, 32),
          new THREE.MeshBasicMaterial({ color: 0x000000 })
        );
        cam.rotation.x = Math.PI / 2;
        cam.position.set(0, 1.0, 0.065);
        g.add(cam);

        const camLens = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.005, 32),
          new THREE.MeshBasicMaterial({ color: 0x001133 })
        );
        camLens.rotation.x = Math.PI / 2;
        camLens.position.set(0, 1.0, 0.072);
        g.add(camLens);

        // Side buttons
        [-0.06, 0].forEach((y, i) => {
          const btn = new THREE.Mesh(
            new THREE.BoxGeometry(0.02, 0.2, 0.04),
            mkMat({ color: 0x1a1a1a, metalness: 1, roughness: 0.1 })
          );
          btn.position.set(-0.56, y + (i === 0 ? 0.35 : -0.1), 0);
          g.add(btn);
        });

        // Floating rings
        [1.8, 2.3, 2.9].forEach((r, i) => {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(r, 0.018 - i * 0.003, 16, 120),
            new THREE.MeshBasicMaterial({
              color: i === 0 ? PRIMARY : i === 1 ? ACCENT : PRIMARY,
              transparent: true,
              opacity: 0.6 - i * 0.1,
            })
          );
          const angle = (i * Math.PI) / 3.5;
          ring.rotation.x = angle;
          ring.rotation.y = angle * 0.5;
          g.add(ring);
        });

        // Floating particles around phone
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(200 * 3);
        for (let i = 0; i < 200; i++) {
          const theta = Math.random() * Math.PI * 2;
          const r = 1.5 + Math.random() * 2;
          pPos[i * 3] = Math.cos(theta) * r;
          pPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
          pPos[i * 3 + 2] = Math.sin(theta) * r;
        }
        pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
        const particles = new THREE.Points(
          pGeo,
          new THREE.PointsMaterial({ color: PRIMARY, size: 0.05, transparent: true, opacity: 0.7 })
        );
        g.add(particles);

        // Spec light
        const specLight = new THREE.PointLight(PRIMARY, 2.5, 8);
        specLight.position.set(3, 2, 3);
        g.add(specLight);

        g.position.y = -0.5;
        return g;
      };

      // ────────────────────────────────────────
      // 🌐  SCENE 3 – DATA WORLD / DNA HELIX
      // ────────────────────────────────────────
      const buildData = () => {
        const g = new THREE.Group();

        // DNA double helix
        const STRAND_POINTS = 80;
        const HELIX_H = 7;
        const HELIX_R = 1.2;
        const sphereMatA = mkMat({
          color: PRIMARY,
          emissive: new THREE.Color(PRIMARY),
          emissiveIntensity: 0.6,
          roughness: 0.2,
          metalness: 0.5,
        });
        const sphereMatB = mkMat({
          color: ACCENT,
          emissive: new THREE.Color(ACCENT),
          emissiveIntensity: 0.5,
          roughness: 0.2,
          metalness: 0.4,
        });

        const strandGeo = new THREE.SphereGeometry(0.06, 16, 16);

        for (let i = 0; i < STRAND_POINTS; i++) {
          const t = i / STRAND_POINTS;
          const angle = t * Math.PI * 6;
          const y = t * HELIX_H - HELIX_H / 2;

          // Strand A
          const sA = new THREE.Mesh(strandGeo, sphereMatA);
          sA.position.set(Math.cos(angle) * HELIX_R, y, Math.sin(angle) * HELIX_R);
          g.add(sA);

          // Strand B (opposite)
          const sB = new THREE.Mesh(strandGeo, sphereMatB);
          sB.position.set(
            Math.cos(angle + Math.PI) * HELIX_R,
            y,
            Math.sin(angle + Math.PI) * HELIX_R
          );
          g.add(sB);

          // Connecting rung every 4 nodes
          if (i % 4 === 0) {
            const start = sA.position.clone();
            const end = sB.position.clone();
            const dir = end.clone().sub(start);
            const length = dir.length();

            const rung = new THREE.Mesh(
              new THREE.CylinderGeometry(0.02, 0.02, length, 8),
              new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.15,
              })
            );
            rung.position.copy(start.clone().add(end).multiplyScalar(0.5));
            rung.quaternion.setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              dir.normalize()
            );
            g.add(rung);
          }
        }

        // Orbiting particles
        const COUNT = 600;
        const orbPos = new Float32Array(COUNT * 3);
        const orbCol = new Float32Array(COUNT * 3);
        const cA = new THREE.Color(PRIMARY);
        const cB = new THREE.Color(ACCENT);
        for (let i = 0; i < COUNT; i++) {
          const phi = Math.acos(2 * Math.random() - 1);
          const theta = Math.random() * Math.PI * 2;
          const r = 3.5 + Math.random() * 2;
          orbPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          orbPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          orbPos[i * 3 + 2] = r * Math.cos(phi);
          const c = cA.clone().lerp(cB, Math.random());
          orbCol[i * 3] = c.r;
          orbCol[i * 3 + 1] = c.g;
          orbCol[i * 3 + 2] = c.b;
        }
        const orbGeo = new THREE.BufferGeometry();
        orbGeo.setAttribute("position", new THREE.BufferAttribute(orbPos, 3));
        orbGeo.setAttribute("color", new THREE.BufferAttribute(orbCol, 3));
        g.add(
          new THREE.Points(
            orbGeo,
            new THREE.PointsMaterial({
              size: 0.05,
              vertexColors: true,
              transparent: true,
              opacity: 0.7,
            })
          )
        );

        // Equator ring
        const eRing = new THREE.Mesh(
          new THREE.TorusGeometry(3.2, 0.025, 16, 120),
          new THREE.MeshBasicMaterial({ color: PRIMARY, transparent: true, opacity: 0.45 })
        );
        eRing.rotation.x = Math.PI / 2;
        g.add(eRing);

        const eRing2 = new THREE.Mesh(
          new THREE.TorusGeometry(3.8, 0.018, 16, 120),
          new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.3 })
        );
        eRing2.rotation.x = Math.PI / 3;
        eRing2.rotation.y = Math.PI / 4;
        g.add(eRing2);

        return g;
      };

      // ── Lights ──
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      const dirLight = new THREE.DirectionalLight(PRIMARY, 1.2);
      dirLight.position.set(8, 12, 8);
      dirLight.castShadow = true;
      scene.add(dirLight);
      const ptA = new THREE.PointLight(ACCENT, 2, 25);
      ptA.position.set(-6, 5, 4);
      scene.add(ptA);
      const ptB = new THREE.PointLight(PRIMARY, 1.5, 20);
      ptB.position.set(6, -2, -6);
      scene.add(ptB);

      // ── Load initial scene ──
      const sceneBuilders: Record<string, () => THREE_TYPE.Group> = {
        city: buildCity,
        product: buildProduct,
        data: buildData,
      };

      const switchScene = (tab: string) => {
        const builder = sceneBuilders[tab];
        if (!builder) return;
        const newGroup = builder();
        newGroup.scale.set(0.01, 0.01, 0.01);
        addGroup(newGroup);
        // Animate scale in
        gsap.to(newGroup.scale, {
          x: 1, y: 1, z: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
        });
      };

      switchScene("city");
      setIsLoading(false);

      // ── Resize ──
      const onResize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        bloom.resolution.set(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── Animate ──
      let t = 0;
      const tick = () => {
        animId = requestAnimationFrame(tick);
        t += 0.008;
        controls.update();

        // Orbit lights
        ptA.position.x = Math.sin(t * 0.5) * 7;
        ptA.position.z = Math.cos(t * 0.5) * 7;
        ptB.position.x = Math.cos(t * 0.4) * 6;
        ptB.position.z = Math.sin(t * 0.4) * 6;

        // Float
        if (currentGroup) {
          currentGroup.position.y = Math.sin(t * 0.8) * 0.12;
        }

        composer.render();
      };
      tick();

      sceneRef.current = {
        cleanup: () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", onResize);
          controls.dispose();
          renderer.dispose();
        },
        switchScene,
      };
    };

    init();
    return () => sceneRef.current?.cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sceneRef.current && !isLoading) {
      sceneRef.current.switchScene(activeTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const activeData = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="showcase" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background glow removed for full black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "transparent",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mx-auto">Interactive 3D Demo</div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Drag. Rotate.{" "}
            <span className="gradient-text">Experience 3D.</span>
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Real WebGL in your browser - this is what we build for businesses like yours.
          </p>
        </div>

        {/* Main layout: canvas + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
          {/* Canvas */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              height: "520px",
              background: "linear-gradient(135deg, #030c03 0%, #010812 100%)",
              border: "1px solid rgba(102,242,9,0.18)",
              boxShadow:
                "0 0 100px rgba(102,242,9,0.07), 0 0 40px rgba(0,240,255,0.05), inset 0 1px 0 rgba(102,242,9,0.1)",
            }}
          >
            {/* Corner brackets */}
            {[
              "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg",
              "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
              "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
              "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute w-7 h-7 ${pos} z-20`}
                style={{ borderColor: "rgba(102,242,9,0.5)" }}
              />
            ))}

            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
              }}
            />

            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
                    style={{ borderColor: "rgba(102,242,9,0.6)", borderTopColor: "transparent" }}
                  />
                  <p className="text-xs font-mono" style={{ color: "rgba(102,242,9,0.6)" }}>
                    LOADING 3D ENGINE...
                  </p>
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* HUD Top left */}
            <div
              className="absolute top-4 left-5 z-20 font-mono text-[10px] space-y-1"
              style={{ color: "rgba(102,242,9,0.7)" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "rgba(102,242,9,0.9)" }}
                />
                LIVE RENDER
              </div>
              <div style={{ color: "rgba(0,240,255,0.5)" }}>
                WebGL 2.0 · Bloom · Shadows
              </div>
            </div>

            {/* HUD Bottom */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(102,242,9,0.2)",
                color: "rgba(102,242,9,0.5)",
              }}
            >
              DRAG TO ROTATE · SCROLL TO ZOOM
            </div>

            {/* Tab switcher overlaid bottom-left */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-300 text-left"
                  style={{
                    background:
                      activeTab === tab.id
                        ? "rgba(102,242,9,0.15)"
                        : "rgba(0,0,0,0.5)",
                    color:
                      activeTab === tab.id
                        ? "rgba(102,242,9,1)"
                        : "rgba(255,255,255,0.35)",
                    border:
                      activeTab === tab.id
                        ? "1px solid rgba(102,242,9,0.4)"
                        : "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div ref={infoRef} className="flex flex-col gap-4">
            {/* Scene info card */}
            <div
              className="glass-card p-6"
              key={activeTab}
            >
              <div className="text-3xl mb-3">{activeData.icon}</div>
              <h3
                className="text-xl font-extrabold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {activeData.label}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                {activeData.desc}
              </p>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {activeData.stats.map((s) => (
                  <div
                    key={s.l}
                    className="text-center py-3 rounded-xl"
                    style={{
                      background: "rgba(102,242,9,0.06)",
                      border: "1px solid rgba(102,242,9,0.12)",
                    }}
                  >
                    <div
                      className="text-lg font-extrabold"
                      style={{ color: "var(--primary)" }}
                    >
                      {s.v}
                    </div>
                    <div
                      className="text-[10px] font-semibold uppercase tracking-wider mt-0.5"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="glass-card p-5">
              <h4
                className="text-xs font-bold uppercase tracking-[0.15em] mb-4"
                style={{ color: "var(--primary)", fontFamily: "var(--font-mono, monospace)" }}
              >
                Powered By
              </h4>
              <div className="space-y-2.5">
                {[
                  { name: "WebGL / Three.js", desc: "3D rendering engine" },
                  { name: "GSAP", desc: "Smooth animations" },
                  { name: "UnrealBloomPass", desc: "Cinematic glow" },
                  { name: "OrbitControls", desc: "Drag interaction" },
                  { name: "PCSS Shadows", desc: "Soft realistic shadows" },
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {tech.name}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}
                    >
                      {tech.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a href="#contact" className="btn-primary text-center text-sm py-3.5 w-full block">
              Build This for My Business →
            </a>
          </div>
        </div>

        {/* Bottom chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {["Real-time WebGL", "Drag & Rotate", "Bloom Lighting", "60 FPS", "Mobile Optimized", "Custom Built"].map(
            (f) => (
              <span key={f} className="chip text-xs">{f}</span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
