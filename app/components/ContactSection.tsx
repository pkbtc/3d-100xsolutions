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
    <section id="contact" className="relative py-20 md:py-36 grid-bg" ref={ref}>
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-accent-primary/5 rounded-full blur-[100px] sm:blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Info */}
          <div
            className="contact-animate transition-all duration-700 ease-out"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            <span className="text-accent-secondary text-sm font-semibold uppercase tracking-widest mb-4 block">
              Let&apos;s Build Together
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Ready to go{" "}
              <span className="gradient-text">3D?</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              Tell us about your project and we&apos;ll show you how a 3D web
              experience can transform your business. Free consultation, no
              obligations.
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-xl">
                  📧
                </div>
                <div>
                  <div className="text-text-muted text-sm">Email us at</div>
                  <a
                    href="mailto:hello@100xsolutions.in"
                    className="text-text-primary font-medium hover:text-accent-primary transition-colors"
                  >
                    hello@100xsolutions.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 border border-accent-secondary/20 flex items-center justify-center text-xl">
                  📱
                </div>
                <div>
                  <div className="text-text-muted text-sm">Call us</div>
                  <a
                    href="tel:+919876543210"
                    className="text-text-primary font-medium hover:text-accent-secondary transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-tertiary/10 border border-accent-tertiary/20 flex items-center justify-center text-xl">
                  🌐
                </div>
                <div>
                  <div className="text-text-muted text-sm">Visit</div>
                  <a
                    href="https://100xsolutions.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary font-medium hover:text-accent-tertiary transition-colors"
                  >
                    100xsolutions.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div
            className="contact-animate transition-all duration-700 ease-out"
            style={{ opacity: 0, transform: "translateY(30px)", transitionDelay: "200ms" }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 md:p-10 space-y-6"
              id="contact-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-text-secondary text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-white/5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-text-secondary text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-white/5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="business"
                  className="block text-text-secondary text-sm font-medium mb-2"
                >
                  Business Type
                </label>
                <select
                  id="business"
                  className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-white/5 text-text-primary focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all duration-300 appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled className="text-text-muted">
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
                  className="block text-text-secondary text-sm font-medium mb-2"
                >
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Describe what you'd like to build..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-white/5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all duration-300 resize-none"
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
                <p className="text-accent-secondary text-sm text-center animate-fade-in">
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
