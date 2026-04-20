"use client";

import { useEffect, useRef } from "react";

interface MiniSceneProps {
  buildScene: (THREE: typeof import("three"), scene: import("three").Scene) => void;
  title: string;
  tag: string;
  desc: string;
  accentColor?: string;
}

export default function MiniScene({ buildScene, title, tag, desc, accentColor = "#66f209" }: MiniSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let animId: number;
    let cleanup: (() => void) | null = null;

    const init = async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const { EffectComposer } = await import("three/examples/jsm/postprocessing/EffectComposer.js");
      const { RenderPass } = await import("three/examples/jsm/postprocessing/RenderPass.js");
      const { UnrealBloomPass } = await import("three/examples/jsm/postprocessing/UnrealBloomPass.js");

      const canvas = canvasRef.current!;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
      camera.position.set(0, 1.5, 5.5);

      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
      controls.enablePan = false;
      controls.minDistance = 2;
      controls.maxDistance = 10;

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), 0.8, 0.35, 0.18));

      // Base lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const dl = new THREE.DirectionalLight(0x66f209, 1.0);
      dl.position.set(5, 8, 5);
      scene.add(dl);
      const pl = new THREE.PointLight(0x00f0ff, 1.6, 20);
      pl.position.set(-4, 3, 2);
      scene.add(pl);

      buildScene(THREE, scene);

      const onResize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      let t = 0;
      const tick = () => {
        animId = requestAnimationFrame(tick);
        t += 0.006;
        controls.update();
        pl.position.x = Math.sin(t) * 5;
        pl.position.z = Math.cos(t) * 5;
        composer.render();
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        controls.dispose();
        renderer.dispose();
      };
    };

    init();
    return () => cleanup?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, #030c03 0%, #010812 100%)",
        border: `1px solid rgba(${accentColor === "#66f209" ? "102,242,9" : "0,240,255"},0.18)`,
        boxShadow: `0 0 40px rgba(${accentColor === "#66f209" ? "102,242,9" : "0,240,255"},0.05)`,
      }}
    >
      {/* Corner brackets */}
      {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((pos, i) => (
        <div key={i} className={`absolute w-4 h-4 ${pos} z-10`}
          style={{ borderColor: `${accentColor}66` }} />
      ))}

      <canvas ref={canvasRef} className="w-full h-56 cursor-grab active:cursor-grabbing" />

      {/* Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded font-mono"
          style={{
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}33`,
            color: accentColor,
          }}
        >
          {tag}
        </span>
      </div>

      {/* Info */}
      <div
        className="p-4 border-t"
        style={{ borderColor: `${accentColor}18` }}
      >
        <h3 className="text-sm font-bold mb-1" style={{ color: "#fff" }}>{title}</h3>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{desc}</p>
      </div>

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${accentColor}08 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
