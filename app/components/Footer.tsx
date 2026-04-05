export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-lg">
                3D
              </div>
              <span className="text-text-primary font-bold text-xl tracking-tight">
                100x<span className="text-accent-primary">Solutions</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
              We build immersive 3D web experiences that help businesses attract
              more customers, increase engagement, and stand out in a crowded
              digital landscape.
            </p>
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-surface-elevated border border-white/5 flex items-center justify-center text-text-muted text-xs hover:border-accent-primary/30 hover:text-accent-primary transition-all duration-300"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
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
                    className="text-text-secondary text-sm hover:text-accent-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
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
                    className="text-text-secondary text-sm hover:text-accent-primary transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} 100xSolutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-text-muted text-sm hover:text-text-secondary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-text-muted text-sm hover:text-text-secondary transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
