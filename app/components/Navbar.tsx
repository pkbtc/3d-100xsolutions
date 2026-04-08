"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Why 3D", href: "#why-3d" },
  { label: "Services", href: "#services" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Examples", href: "#examples" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled ? "top-3 px-4 sm:px-8" : "top-0 px-0"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${
          scrolled
            ? "nav-glass px-6 py-3"
            : "bg-transparent px-6 py-5"
        }`}
        style={{
          borderRadius: scrolled ? "var(--radius-lg)" : "0",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" id="logo-link">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-400 group-hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.10)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "var(--text-primary)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              3D
            </div>
            <span
              className="font-semibold text-lg tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              100x
              <span style={{ color: "var(--accent)" }}>Solutions</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`nav-${link.href.slice(1)}`}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/[0.06]"
                style={{
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary text-sm !py-2 !px-5 ml-3"
              id="nav-cta"
            >
              <span>Get Started</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl transition-colors hover:bg-white/[0.05]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-400 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
              style={{ background: "var(--text-primary)" }}
            />
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-400 ${
                mobileOpen ? "opacity-0" : ""
              }`}
              style={{ background: "var(--text-primary)" }}
            />
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-400 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
              style={{ background: "var(--text-primary)" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden mx-4 sm:mx-8 ${
          mobileOpen ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div
          className="px-4 pb-5 pt-3 flex flex-col gap-1 nav-glass"
          style={{ borderRadius: "var(--radius-lg)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-white/[0.05]"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary text-sm !py-3 mt-2"
            onClick={() => setMobileOpen(false)}
          >
            <span>Get Started</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
