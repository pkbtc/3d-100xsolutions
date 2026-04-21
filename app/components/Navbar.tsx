"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Why 3D", href: "/#why-3d" },
  { label: "Services", href: "/#services" },
  { label: "Real Use Cases", href: "/use-cases" },
  { label: "3D Gallery", href: "/showcase" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP entrance
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, 
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "top-3 px-4 sm:px-8" : "top-0 px-0"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-500 ease-out ${
          scrolled
            ? "nav-glass px-5 py-2.5"
            : "bg-transparent px-6 py-4"
        }`}
        style={{
          borderRadius: scrolled ? "var(--radius-lg)" : "0",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo — styled like main 100x site */}
          <a href="#" className="flex items-center gap-2.5 group" id="logo-link">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold transition-all duration-300 group-hover:scale-105"
              style={{
                background: "rgba(var(--primary-rgb), 0.12)",
                border: "1px solid rgba(var(--primary-rgb), 0.25)",
                color: "var(--primary)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              3D
            </div>
            <div className="flex flex-col">
              <span
                className="font-extrabold text-lg tracking-tight leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                100x
                <span style={{ color: "var(--primary)" }}>Solutions</span>
              </span>
              <span
                className="text-[9px] font-semibold uppercase tracking-[0.18em] hidden sm:block"
                style={{ color: "var(--text-muted)" }}
              >
                3D Experiences Division
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`nav-${link.href.slice(1)}`}
                className="px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.04em] transition-all duration-300"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono, monospace)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--primary)";
                  el.style.background = "rgba(var(--primary-rgb), 0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--text-secondary)";
                  el.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Main site link */}
            <a
              href="https://100xsolutions.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.04em] transition-all duration-300 flex items-center gap-1.5"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono, monospace)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.background = "rgba(var(--accent-rgb), 0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Main Site
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="#contact"
              className="btn-primary text-xs !py-2 !px-5 ml-2"
              id="nav-cta"
            >
              <span>Get Started</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors hover:bg-white/[0.05]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[1.5px] rounded-full transition-all duration-400 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
              style={{ background: "var(--primary)" }}
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
              style={{ background: "var(--primary)" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden mx-4 sm:mx-8 ${
          mobileOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
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
              className="px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-[0.04em] transition-all duration-300 hover:bg-white/[0.05]"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono, monospace)",
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* Main site link in mobile */}
          <a
            href="https://100xsolutions.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-[0.04em] transition-all duration-300 hover:bg-white/[0.05] flex items-center gap-2"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            Visit Main Site
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

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
