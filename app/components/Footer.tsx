"use client";

export default function Footer() {
  return (
    <footer
      className="relative py-14 sm:py-18 z-10"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  color: "var(--text-primary)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
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
              {["T", "L", "I"].map((letter) => (
                <a
                  key={letter}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-medium transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "var(--text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.08)";
                    el.style.borderColor = "rgba(255,255,255,0.12)";
                    el.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.04)";
                    el.style.borderColor = "rgba(255,255,255,0.06)";
                    el.style.color = "var(--text-muted)";
                  }}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-xs font-semibold mb-5 uppercase tracking-[0.15em]"
              style={{ color: "var(--text-primary)" }}
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

          <div>
            <h4
              className="text-xs font-semibold mb-5 uppercase tracking-[0.15em]"
              style={{ color: "var(--text-primary)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "https://100xsolutions.in" },
                { label: "Contact", href: "#contact" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
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
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} 100xSolutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((text) => (
              <a
                key={text}
                href="#"
                className="text-sm transition-colors duration-300"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-secondary)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "var(--text-muted)";
                }}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
