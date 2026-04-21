"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Expectation cards ── */
const expectations = [
  {
    number: "01",
    title: "Free Discovery Call",
    desc: "We'll discuss your vision, use case, and how 3D can elevate your brand - zero pressure.",
  },
  {
    number: "02",
    title: "Concept & Prototype",
    desc: "Receive a tailored 3D concept mockup within 48 hours of our initial conversation.",
  },
  {
    number: "03",
    title: "Build & Launch",
    desc: "Production-grade 3D experience deployed on your domain, fully optimized for performance.",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessType: "",
    message: "",
  });

  /* ── GSAP Animations ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      const headerEls = gsap.utils.toArray<HTMLElement>(".ct-header > *");
      gsap.fromTo(headerEls,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".ct-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Form card — slides up
      gsap.fromTo(".ct-form",
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".ct-form",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      // Right column cards stagger
      gsap.fromTo(".ct-info-card",
        { x: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".ct-info-col",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Trust signal
      gsap.fromTo(".ct-trust",
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".ct-trust",
            start: "top 92%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Form submission ── */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbx6FsKxF5QSM_YZgBoEYuZ4lFfCrKChLJPlMdjMnMYpVbfAHuWfADX7D2UnMVNMgYaVwg/exec",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success || data.status === "success" || data.result === "success" || !data.error) {
        setSubmitted(true);
        setForm({ name: "", email: "", businessType: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error — please check your connection.");
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
    >
      {/* ── Atmospheric blurs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "-5%",
          width: "600px",
          height: "600px",
          background: "transparent",
          filter: "blur(120px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "5%",
          right: "-8%",
          width: "500px",
          height: "500px",
          background: "transparent",
          filter: "blur(120px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Section header ── */}
        <div className="ct-header mb-16 md:mb-20 max-w-2xl">
          <div className="section-label">
            Start a Project
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Let&apos;s make it{" "}
            <span className="gradient-text">real.</span>
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Tell us what you&apos;re building, and we&apos;ll figure out how 3D
            can make it unforgettable. No templates, no fluff - just precision-crafted
            immersive experiences.
          </p>
        </div>

        {/* ── Main grid: Left (form) + Right (info) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-start">
          {/* ────────── LEFT: Form Card ────────── */}
          <div>
            <form
              onSubmit={handleSubmit}
              id="contact-form"
              className="ct-form glass-panel relative"
              style={{ padding: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              {/* Form title */}
              <div className="mb-8">
                <h3
                  className="text-xl sm:text-2xl font-extrabold mb-1.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  Project Details
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Takes about 2 minutes to fill out.
                </p>
              </div>

              {/* ── Name + Email row ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    htmlFor="ct-name"
                    className="block text-[11px] font-bold uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono, monospace)" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="ct-name"
                    required
                    placeholder="John Doe"
                    className="glass-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="ct-email"
                    className="block text-[11px] font-bold uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono, monospace)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="ct-email"
                    required
                    placeholder="john@company.com"
                    className="glass-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              {/* ── Business Type ── */}
              <div className="mb-5">
                <label
                  htmlFor="ct-business"
                  className="block text-[11px] font-bold uppercase tracking-[0.12em] mb-2"
                  style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono, monospace)" }}
                >
                  Industry
                </label>
                <div className="relative">
                  <select
                    id="ct-business"
                    className="glass-input cursor-pointer appearance-none pr-10"
                    value={form.businessType}
                    onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                  >
                    <option value="" disabled className="bg-[#030812] text-white/50">
                      Select your industry
                    </option>
                    {[
                      ["SaaS", "SaaS"],
                      ["Ecommerce", "Ecommerce"],
                      ["Agency", "Agency"],
                      ["restaurant", "Restaurant / Cafe"],
                      ["realestate", "Real Estate / Construction"],
                      ["automotive", "Automotive"],
                      ["hotel", "Hotel / Resort"],
                      ["retail", "Retail / Showroom"],
                      ["education", "Education"],
                      ["healthcare", "Healthcare"],
                      ["other", "Other"],
                    ].map(([val, label]) => (
                      <option key={val} value={val} className="bg-[#030812] text-white">
                        {label}
                      </option>
                    ))}
                  </select>
                  {/* Chevron icon */}
                  <svg
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* ── Message ── */}
              <div className="mb-7">
                <label
                  htmlFor="ct-message"
                  className="block text-[11px] font-bold uppercase tracking-[0.12em] mb-2"
                  style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono, monospace)" }}
                >
                  Tell us about your project
                </label>
                <textarea
                  id="ct-message"
                  rows={5}
                  required
                  placeholder="Describe what you'd like to build - a virtual tour, 3D product showcase, interactive building walkthrough…"
                  className="glass-input resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {/* ── Submit button ── */}
              <button
                type="submit"
                className="btn-primary w-full text-base !py-4 group relative"
                id="contact-submit"
                disabled={loading}
                style={{
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "wait" : "pointer",
                }}
              >
                <span className="relative z-[1] flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : submitted ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              {/* Success feedback */}
              {submitted && (
                <p
                  className="mt-4 text-sm text-center"
                  style={{ color: "var(--primary)" }}
                >
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              )}
            </form>
          </div>

          {/* ────────── RIGHT: Info column ────────── */}
          <div className="ct-info-col flex flex-col gap-6">
            {/* ── "What to Expect" card ── */}
            <div className="ct-info-card glass-panel p-7 sm:p-8">
              <h3
                className="text-lg font-extrabold mb-6 uppercase tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                What to expect
              </h3>
              <div className="space-y-5">
                {expectations.map((item, i) => (
                  <div key={item.number} className="flex gap-4 group">
                    {/* Step number */}
                    <div
                      className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-extrabold transition-all duration-300"
                      style={{
                        background: i === 0
                          ? "rgba(var(--primary-rgb), 0.12)"
                          : "rgba(255,255,255,0.04)",
                        border: `1px solid ${i === 0 ? "rgba(var(--primary-rgb), 0.25)" : "var(--border)"}`,
                        color: i === 0 ? "var(--primary)" : "var(--text-muted)",
                        fontFamily: "var(--font-mono, monospace)",
                      }}
                    >
                      {item.number}
                    </div>
                    <div>
                      <div
                        className="text-sm font-bold mb-0.5"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </div>
                      <p
                        className="text-[13px] leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Direct contact card ── */}
            <div className="ct-info-card glass-panel p-7 sm:p-8">
              <h3
                className="text-lg font-extrabold mb-5 uppercase tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Or reach out directly
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: "Email",
                    value: "100xsolutions.team@gmail.com",
                    href: "mailto:100xsolutions.team@gmail.com",
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    ),
                    label: "Main Site",
                    value: "100xsolutions.in",
                    href: "https://100xsolutions.in",
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    ),
                    label: "Instagram",
                    value: "@100xsolutions.in",
                    href: "https://www.instagram.com/100xsolutions.in/",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group/link"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(var(--primary-rgb), 0.04)";
                      el.style.borderColor = "rgba(var(--primary-rgb), 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(255,255,255,0.02)";
                      el.style.borderColor = "var(--border)";
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm shrink-0"
                      style={{
                        background: "rgba(var(--primary-rgb), 0.08)",
                        border: "1px solid rgba(var(--primary-rgb), 0.15)",
                        color: "var(--primary)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-sm font-medium truncate transition-colors duration-300"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.value}
                      </div>
                    </div>
                    {/* Arrow */}
                    <svg
                      className="w-4 h-4 shrink-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-60 group-hover/link:translate-x-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ color: "var(--primary)" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* ── Micro trust signal ── */}
            <div className="ct-trust flex items-center gap-3 px-2">
              <div
                className="flex -space-x-1.5"
                aria-hidden="true"
              >
                {["var(--primary)", "var(--accent)", "#fd79a8"].map((bg, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold"
                    style={{
                      background: bg,
                      border: "2px solid var(--background)",
                      color: "#000",
                    }}
                  >
                    {["P", "A", "R"][i]}
                  </div>
                ))}
              </div>
              <p
                className="text-xs leading-snug"
                style={{ color: "var(--text-muted)" }}
              >
                Trusted by <span style={{ color: "var(--text-secondary)" }}>20+ businesses</span> across
                India for immersive 3D experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
