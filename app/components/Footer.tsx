"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Columns stagger in
      gsap.fromTo(".footer-col", 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
        }
      );

      // Bottom bar
      gsap.fromTo(".footer-bottom", 
        { opacity: 0, y: 15 },
        {
          scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top 95%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-14 sm:py-18 z-10"
      style={{
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="footer-col md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-extrabold"
                style={{
                  background: "rgba(var(--primary-rgb), 0.12)",
                  border: "1px solid rgba(var(--primary-rgb), 0.25)",
                  color: "var(--primary)",
                }}
              >
                3D
              </div>
              <span
                className="font-extrabold text-lg tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                100x
                <span style={{ color: "var(--primary)" }}>Solutions</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-sm mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              We build immersive 3D web experiences that help businesses attract
              more customers, increase engagement, and stand out in a crowded
              digital landscape.
            </p>
            <div className="flex gap-3">
              {[
                { letter: "IG", href: "https://www.instagram.com/100xsolutions.in/" },
                { letter: "IN", href: "https://100xsolutions.in" },
              ].map((social) => (
                <a
                  key={social.letter}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono, monospace)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(var(--primary-rgb), 0.08)";
                    el.style.borderColor = "rgba(var(--primary-rgb), 0.25)";
                    el.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.03)";
                    el.style.borderColor = "var(--border)";
                    el.style.color = "var(--text-muted)";
                  }}
                >
                  {social.letter}
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="footer-col">
            <h4
              className="text-[11px] font-bold mb-5 uppercase tracking-[0.15em]"
              style={{ color: "var(--primary)", fontFamily: "var(--font-mono, monospace)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "3D Websites",
                "Building Tours",
                "Product Showcases",
                "Interactive Experiences",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-sm transition-colors duration-300"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "var(--text-secondary)";
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-col">
            <h4
              className="text-[11px] font-bold mb-5 uppercase tracking-[0.15em]"
              style={{ color: "var(--primary)", fontFamily: "var(--font-mono, monospace)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "https://100xsolutions.in" },
                { label: "Contact", href: "#contact" },
                { label: "Instagram", href: "https://www.instagram.com/100xsolutions.in/" },
                { label: "Main Site", href: "https://100xsolutions.in" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm transition-colors duration-300"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "var(--text-secondary)";
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
          style={{
            borderTop: "1px solid var(--border)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} 100xSolutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Privacy Policy", href: "https://100xsolutions.in/privacy-policy" },
              { label: "Terms of Service", href: "https://100xsolutions.in/terms-of-service" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-300"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-secondary)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-muted)";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
