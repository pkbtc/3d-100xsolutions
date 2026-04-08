"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    const items = ref.current?.querySelectorAll(".contact-animate");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-36" ref={ref}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-1/4 pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(94,158,255,0.04) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Info */}
          <div
            className="contact-animate transition-all duration-700 ease-out"
            style={{ opacity: 0, transform: "translateY(24px)" }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 block"
              style={{ color: "var(--accent)" }}
            >
              Let&apos;s Build Together
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Ready to go{" "}
              <span className="gradient-text">3D?</span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-12"
              style={{ color: "var(--text-secondary)" }}
            >
              Tell us about your project and we&apos;ll show you how a 3D web
              experience can transform your business. Free consultation, no
              obligations.
            </p>

            {/* Contact info — glass cards */}
            <div className="space-y-4">
              {[
                {
                  icon: "📧",
                  label: "Email us at",
                  value: "hello@100xsolutions.in",
                  href: "mailto:hello@100xsolutions.in",
                },
                {
                  icon: "📱",
                  label: "Call us",
                  value: "+91 98765 43210",
                  href: "tel:+919876543210",
                },
                {
                  icon: "🌐",
                  label: "Visit",
                  value: "100xsolutions.in",
                  href: "https://100xsolutions.in",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div className="glass-icon !w-11 !h-11 text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="text-xs mb-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.label}
                    </div>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm font-medium transition-colors duration-300"
                      style={{ color: "var(--text-primary)" }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.color = "var(--text-primary)";
                      }}
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div
            className="contact-animate transition-all duration-700 ease-out"
            style={{ opacity: 0, transform: "translateY(24px)", transitionDelay: "200ms" }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-7 md:p-10 space-y-5"
              id="contact-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="John Doe"
                    className="glass-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="john@company.com"
                    className="glass-input"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="business"
                  className="block text-xs font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Business Type
                </label>
                <select
                  id="business"
                  className="glass-input cursor-pointer appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled style={{ color: "var(--text-muted)" }}>
                    Select your industry
                  </option>
                  <option value="restaurant">Restaurant / Cafe</option>
                  <option value="realestate">Real Estate / Construction</option>
                  <option value="automotive">Automotive</option>
                  <option value="hotel">Hotel / Resort</option>
                  <option value="retail">Retail / Showroom</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Describe what you'd like to build..."
                  className="glass-input resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-base !py-4"
                id="contact-submit"
              >
                <span>{submitted ? "✓ Message Sent!" : "Send Message"}</span>
              </button>

              {submitted && (
                <p
                  className="text-sm text-center animate-fade-in"
                  style={{ color: "var(--accent)" }}
                >
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
