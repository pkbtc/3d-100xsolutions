"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type * as THREE_TYPE from "three";

const MiniScene = dynamic(() => import("./MiniScene"), { ssr: false });

// ─── Scene builders ─────────────────────────────────────────────────────────

type BuildFn = (THREE: typeof THREE_TYPE, scene: THREE_TYPE.Scene) => void;

const buildSkyscraper: BuildFn = (THREE, scene) => {
  const g = new THREE.Group();
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x0a1f0a, metalness: 0.95, roughness: 0.05, transparent: true, opacity: 0.85 });
  const edgeMat = new THREE.MeshBasicMaterial({ color: 0x66f209, transparent: true, opacity: 0.5 });

  [[0, 4.5, 1.4], [-2, 3.2, 1], [2, 3.8, 1]].forEach(([x, h, w]) => {
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), glassMat);
    body.position.set(x, h / 2, 0);
    g.add(body);
    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, w));
    const el = new THREE.LineSegments(edges, edgeMat);
    el.position.copy(body.position);
    g.add(el);
    for (let i = 0; i < 6; i++) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, 0.03, w + 0.02), new THREE.MeshBasicMaterial({ color: 0x66f209 }));
      band.position.set(x, i * (h / 6) + 0.3, 0);
      g.add(band);
    }
  });
  const grid = new THREE.GridHelper(8, 12, 0x66f209, 0x0a200a);
  (grid.material as THREE_TYPE.Material).opacity = 0.3;
  (grid.material as THREE_TYPE.Material).transparent = true;
  g.add(grid);
  g.position.y = -1.5;
  scene.add(g);
};

const buildPlanet: BuildFn = (THREE, scene) => {
  scene.fog = new THREE.FogExp2(0x000010, 0.035);
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 64, 64),
    new THREE.MeshPhysicalMaterial({ color: 0x0a2a3a, emissive: new THREE.Color(0x003355), emissiveIntensity: 0.3, metalness: 0.3, roughness: 0.7 })
  );
  scene.add(planet);
  // Atmosphere glow ring
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(1.52, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.06, side: THREE.BackSide })
  );
  scene.add(atmo);
  // Rings
  [1.9, 2.3, 2.7].forEach((r, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.015, 8, 100),
      new THREE.MeshBasicMaterial({ color: i === 1 ? 0x00f0ff : 0x66f209, transparent: true, opacity: 0.5 }));
    ring.rotation.x = Math.PI / 2.2;
    scene.add(ring);
  });
  // Stars
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 30;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.7 })));
  scene.add(new THREE.PointLight(0x00f0ff, 2, 20));
};

const buildDNA: BuildFn = (THREE, scene) => {
  const matA = new THREE.MeshPhysicalMaterial({ color: 0x66f209, emissive: new THREE.Color(0x66f209), emissiveIntensity: 0.7, roughness: 0.2, metalness: 0.5 });
  const matB = new THREE.MeshPhysicalMaterial({ color: 0x00f0ff, emissive: new THREE.Color(0x00f0ff), emissiveIntensity: 0.6, roughness: 0.2, metalness: 0.4 });
  const sGeo = new THREE.SphereGeometry(0.07, 12, 12);
  const N = 60;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const angle = t * Math.PI * 5;
    const y = t * 5 - 2.5;
    const sA = new THREE.Mesh(sGeo, matA);
    sA.position.set(Math.cos(angle) * 1.0, y, Math.sin(angle) * 1.0);
    scene.add(sA);
    const sB = new THREE.Mesh(sGeo, matB);
    sB.position.set(Math.cos(angle + Math.PI) * 1.0, y, Math.sin(angle + Math.PI) * 1.0);
    scene.add(sB);
    if (i % 3 === 0) {
      const dir = sB.position.clone().sub(sA.position);
      const len = dir.length();
      const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, len, 6),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 }));
      rung.position.copy(sA.position.clone().add(sB.position).multiplyScalar(0.5));
      rung.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      scene.add(rung);
    }
  }
};

const buildGem: BuildFn = (THREE, scene) => {
  const gem = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.4, 2),
    new THREE.MeshPhysicalMaterial({ color: 0x001122, metalness: 0.1, roughness: 0.0, transparent: true, opacity: 0.82, reflectivity: 1, clearcoat: 1, clearcoatRoughness: 0.0 })
  );
  scene.add(gem);
  const wireGem = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.42, 2),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.3 })
  );
  scene.add(wireGem);
  // Inner glow sphere
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 })
  );
  scene.add(glow);
  // Floating particles
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(300 * 3);
  for (let i = 0; i < 300; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 2 + Math.random();
    pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPos[i * 3 + 2] = r * Math.cos(phi);
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.05, transparent: true, opacity: 0.7 })));
  scene.add(new THREE.PointLight(0x00f0ff, 3, 12));
};

const buildPhone: BuildFn = (THREE, scene) => {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.1, 0.11),
    new THREE.MeshPhysicalMaterial({ color: 0x111111, metalness: 1, roughness: 0.0, clearcoat: 1 })));
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.88, 0.01),
    new THREE.MeshPhysicalMaterial({ color: 0x001133, emissive: new THREE.Color(0x00f0ff), emissiveIntensity: 0.7 }));
  screen.position.z = 0.058;
  g.add(screen);
  // Camera
  const cam = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 32),
    new THREE.MeshBasicMaterial({ color: 0x000000 }));
  cam.rotation.x = Math.PI / 2;
  cam.position.set(0, 0.9, 0.055);
  g.add(cam);
  // Rings
  [1.4, 1.8, 2.2].forEach((r, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.016, 10, 80),
      new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x66f209 : 0x00f0ff, transparent: true, opacity: 0.5 }));
    ring.rotation.x = (i * Math.PI) / 3.5;
    g.add(ring);
  });
  // Pedestal
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.2, 0.12, 64),
    new THREE.MeshPhysicalMaterial({ color: 0x080808, metalness: 1, roughness: 0.05 }));
  ped.position.y = -1.5;
  g.add(ped);
  g.add(new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.01, 8, 80),
    new THREE.MeshBasicMaterial({ color: 0x66f209 })));
  (g.children[g.children.length - 1] as THREE_TYPE.Mesh).position.y = -1.44;
  (g.children[g.children.length - 1] as THREE_TYPE.Mesh).rotation.x = Math.PI / 2;
  g.position.y = -0.3;
  scene.add(g);
};

const buildCar: BuildFn = (THREE, scene) => {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0x0a1a00, metalness: 1, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.01 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x001122, transparent: true, opacity: 0.5, metalness: 0.1, roughness: 0.0, clearcoat: 1 });
  const wheelMat = new THREE.MeshPhysicalMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.2 });

  // Body lower
  const lower = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.6, 1.6), bodyMat);
  lower.position.y = 0.3;
  g.add(lower);
  // Body upper (cabin)
  const upper = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.6, 1.4), bodyMat);
  upper.position.set(-0.1, 0.9, 0);
  g.add(upper);
  // Windshield
  const wind = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.5, 1.3), glassMat);
  wind.position.set(0.85, 0.85, 0);
  wind.rotation.z = -0.3;
  g.add(wind);
  // Rear window
  const rear = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.5, 1.3), glassMat);
  rear.position.set(-1.0, 0.85, 0);
  rear.rotation.z = 0.3;
  g.add(rear);
  // Wheels
  [[-1.2, -1.0], [-1.2, 1.0], [1.1, -1.0], [1.1, 1.0]].forEach(([x, z]) => {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.22, 32), wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(x, 0, z);
    g.add(wheel);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 8, 24),
      new THREE.MeshBasicMaterial({ color: 0x888888 }));
    rim.position.copy(wheel.position);
    rim.rotation.x = Math.PI / 2;
    g.add(rim);
  });
  // Headlights
  [-0.4, 0.4].forEach(z => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.25),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
    hl.position.set(1.78, 0.5, z);
    g.add(hl);
    const light = new THREE.PointLight(0x00f0ff, 1.2, 6);
    light.position.set(1.9, 0.5, z);
    scene.add(light);
  });
  // Tail lights
  [-0.4, 0.4].forEach(z => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.18),
      new THREE.MeshBasicMaterial({ color: 0xff2200 }));
    tl.position.set(-1.81, 0.5, z);
    g.add(tl);
  });
  // Edge lines
  const edgesGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.6, 0.6, 1.6));
  const edgeLines = new THREE.LineSegments(edgesGeo,
    new THREE.LineBasicMaterial({ color: 0x66f209, transparent: true, opacity: 0.3 }));
  edgeLines.position.y = 0.3;
  g.add(edgeLines);
  // Ground grid
  const grid = new THREE.GridHelper(8, 10, 0x66f209, 0x0a200a);
  (grid.material as THREE_TYPE.Material).transparent = true;
  (grid.material as THREE_TYPE.Material).opacity = 0.2;
  g.add(grid);
  g.position.y = -0.8;
  scene.add(g);
};

const buildGalaxy: BuildFn = (THREE, scene) => {
  const COUNT = 2500;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const cA = new THREE.Color(0x66f209), cB = new THREE.Color(0x00f0ff);
  for (let i = 0; i < COUNT; i++) {
    const arm = Math.floor(Math.random() * 3);
    const a = arm * ((Math.PI * 2) / 3) + Math.random() * 0.8;
    const r = 0.3 + Math.pow(Math.random(), 0.5) * 3.5;
    const spin = r * 0.5;
    positions[i * 3] = Math.cos(a + spin) * r + (Math.random() - 0.5) * 0.3;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
    positions[i * 3 + 2] = Math.sin(a + spin) * r + (Math.random() - 0.5) * 0.3;
    const t = r / 3.5;
    const c = cA.clone().lerp(cB, t);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true })));
  // Core glow
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(0.18, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff })));
  scene.add(new THREE.PointLight(0xffffff, 2, 5));
};

const buildCrystalCave: BuildFn = (THREE, scene) => {
  const matA = new THREE.MeshPhysicalMaterial({ color: 0x002233, emissive: new THREE.Color(0x00f0ff), emissiveIntensity: 0.4, metalness: 0.2, roughness: 0.0, transparent: true, opacity: 0.8, clearcoat: 1 });
  const matB = new THREE.MeshPhysicalMaterial({ color: 0x0a1a00, emissive: new THREE.Color(0x66f209), emissiveIntensity: 0.35, metalness: 0.3, roughness: 0.0, transparent: true, opacity: 0.75, clearcoat: 1 });
  // Central large crystal
  const bigXtal = new THREE.Mesh(new THREE.ConeGeometry(0.5, 2.5, 6), matA);
  bigXtal.position.y = 0.5;
  scene.add(bigXtal);
  const bigXtalBot = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.5, 6), matA);
  bigXtalBot.rotation.z = Math.PI;
  bigXtalBot.position.y = -1.0;
  scene.add(bigXtalBot);

  // Surrounding crystals
  [0, 1, 2, 3, 4, 5].forEach(i => {
    const angle = (i / 6) * Math.PI * 2;
    const r = 1.5;
    const h = 0.8 + Math.random() * 1.4;
    const xtal = new THREE.Mesh(new THREE.ConeGeometry(0.18, h, 6), i % 2 === 0 ? matA : matB);
    xtal.position.set(Math.cos(angle) * r, h / 2 - 1.2, Math.sin(angle) * r);
    xtal.rotation.x = (Math.random() - 0.5) * 0.3;
    xtal.rotation.z = (Math.random() - 0.5) * 0.3;
    scene.add(xtal);
    const xtalBot = new THREE.Mesh(new THREE.ConeGeometry(0.18, h * 0.6, 6), i % 2 === 0 ? matA : matB);
    xtalBot.rotation.z = Math.PI;
    xtalBot.position.set(Math.cos(angle) * r, -h * 0.3 - 1.2, Math.sin(angle) * r);
    scene.add(xtalBot);
  });
  // Ground
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(8, 8),
    new THREE.MeshPhysicalMaterial({ color: 0x020c0c, metalness: 0.9, roughness: 0.1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.5;
  scene.add(ground);
  scene.add(new THREE.PointLight(0x00f0ff, 2.5, 10));
  scene.add(new THREE.PointLight(0x66f209, 1.5, 8));
};

const buildDataNetwork: BuildFn = (THREE, scene) => {
  const nodes: THREE_TYPE.Vector3[] = [];
  const NODE_COUNT = 24;
  const nodeMat = new THREE.MeshPhysicalMaterial({ color: 0x66f209, emissive: new THREE.Color(0x66f209), emissiveIntensity: 0.8, roughness: 0.2, metalness: 0.5 });
  const accentMat = new THREE.MeshPhysicalMaterial({ color: 0x00f0ff, emissive: new THREE.Color(0x00f0ff), emissiveIntensity: 0.6, roughness: 0.2, metalness: 0.4 });
  const nGeo = new THREE.SphereGeometry(0.08, 12, 12);

  for (let i = 0; i < NODE_COUNT; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 1.5 + Math.random() * 1.5;
    const pos = new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    nodes.push(pos);
    const mesh = new THREE.Mesh(nGeo, i % 4 === 0 ? accentMat : nodeMat);
    mesh.position.copy(pos);
    mesh.scale.setScalar(i % 4 === 0 ? 1.8 : 1);
    scene.add(mesh);
  }
  // Edges (connect nearby nodes)
  const edgePos: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < 1.8 && Math.random() > 0.3) {
        edgePos.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }
  const edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edgePos), 3));
  scene.add(new THREE.LineSegments(edgeGeo,
    new THREE.LineBasicMaterial({ color: 0x66f209, transparent: true, opacity: 0.25 })));
  // Central hub
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff })));
  scene.add(new THREE.PointLight(0x66f209, 2, 12));
};

// ─── Items config ────────────────────────────────────────────────────────────

const ITEMS = [
  { build: buildSkyscraper, title: "Architectural Visualization", tag: "Architecture", desc: "Walk through buildings before they are built. Investors, buyers, and tenants can explore every floor.", accent: "#66f209" },
  { build: buildPlanet, title: "Planetary Experience", tag: "Education", desc: "Immersive educational content — perfect for science museums, e-learning, and planetariums.", accent: "#00f0ff" },
  { build: buildDNA, title: "DNA Double Helix", tag: "Healthcare", desc: "Visualise complex biological structures for medical training and pharmaceutical presentations.", accent: "#66f209" },
  { build: buildGem, title: "Crystal Gemstone", tag: "Jewellery Retail", desc: "Let customers inspect gemstones from every facet before purchase. Reduce returns, increase trust.", accent: "#00f0ff" },
  { build: buildPhone, title: "Product Configurator", tag: "E-Commerce", desc: "360° product view with customisation. Customers choose colour, size, and style before buying.", accent: "#66f209" },
  { build: buildCar, title: "Automotive Showcase", tag: "Automotive", desc: "Configure your dream car live on the web — paint colour, wheels, trim — with photorealistic 3D.", accent: "#00f0ff" },
  { build: buildGalaxy, title: "Galaxy Data Viz", tag: "Data / SaaS", desc: "Turn complex datasets into stunning 3D visualisations that tell a story your audience remembers.", accent: "#66f209" },
  { build: buildCrystalCave, title: "Crystal Cave", tag: "Gaming / Metaverse", desc: "Game environments, virtual worlds, and metaverse assets — all rendered directly in the browser.", accent: "#00f0ff" },
  { build: buildDataNetwork, title: "Network Graph", tag: "Tech / AI", desc: "Visualise AI models, network topologies, and knowledge graphs as living, interactive 3D diagrams.", accent: "#66f209" },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Back nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(102,242,9,0.08)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold"
            style={{ background: "rgba(102,242,9,0.12)", border: "1px solid rgba(102,242,9,0.25)", color: "#66f209" }}
          >
            3D
          </div>
          <span className="font-extrabold text-sm" style={{ color: "#fff" }}>
            100x<span style={{ color: "#66f209" }}>Solutions</span>
          </span>
        </div>

        <Link
          href="/#contact"
          className="text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200"
          style={{
            background: "rgba(102,242,9,0.12)",
            border: "1px solid rgba(102,242,9,0.25)",
            color: "#66f209",
          }}
        >
          Get a Quote →
        </Link>
      </div>

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "transparent" }}
        />
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "linear-gradient(rgba(102,242,9,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(102,242,9,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="inline-block mb-5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] font-mono"
            style={{ background: "rgba(102,242,9,0.08)", border: "1px solid rgba(102,242,9,0.2)", color: "#66f209" }}
          >
            3D Showcase Gallery
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 tracking-tight"
            style={{ color: "#fff" }}
          >
            9 Interactive{" "}
            <span style={{ background: "linear-gradient(90deg, #66f209, #00f0ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              3D Experiences
            </span>
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            Every canvas below is live WebGL — drag to rotate, scroll to zoom.
            This is exactly what we build for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Drag & Rotate", "Scroll to Zoom", "Bloom Lighting", "60 FPS", "WebGL 2.0"].map(f => (
              <span
                key={f}
                className="text-[11px] font-semibold px-3 py-1 rounded-full font-mono"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of 3D cards */}
      <section className="px-4 sm:px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item) => (
            <MiniScene
              key={item.title}
              buildScene={item.build}
              title={item.title}
              tag={item.tag}
              desc={item.desc}
              accentColor={item.accent}
            />
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(102,242,9,0.06) 0%, rgba(0,240,255,0.04) 100%)",
            border: "1px solid rgba(102,242,9,0.15)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "transparent" }}
          />
          <div className="relative z-10">
            <div
              className="inline-block mb-4 text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded font-mono"
              style={{ color: "#66f209", background: "rgba(102,242,9,0.08)", border: "1px solid rgba(102,242,9,0.2)" }}
            >
              Ready to Build?
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#fff" }}>
              Pick a 3D experience for{" "}
              <span style={{ color: "#66f209" }}>your business</span>
            </h2>
            <p className="text-base max-w-lg mx-auto mb-7" style={{ color: "rgba(255,255,255,0.5)" }}>
              We design and deliver custom 3D web experiences in under 2 weeks. Free discovery call, no commitment.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300"
              style={{
                background: "#66f209",
                color: "#000",
              }}
            >
              Start Your Project →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
