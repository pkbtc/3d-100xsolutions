"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    icon: "🌐",
    title: "3D Websites",
    description:
      "Fully interactive 3D websites that let users explore your business in an immersive environment. From landing pages to full-scale web apps with real-time 3D rendering.",
    features: ["Interactive Navigation", "Real-time Rendering", "Mobile Responsive", "SEO Optimized"],
    gradient: "from-[#6c5ce7] to-[#a29bfe]",
  },
  {
    icon: "🏢",
    title: "3D Building Tours",
    description:
      "Virtual walkthroughs of buildings, housing societies, and real estate properties. Let potential buyers explore every floor, apartment, and amenity before visiting.",
    features: ["Floor-by-floor Tours", "Amenity Highlights", "Day/Night Views", "Measurement Tools"],
    gradient: "from-[#00cec9] to-[#81ecec]",
  },
  {
    icon: "🍽️",
    title: "3D Restaurant & Retail",
    description:
      "Bring your restaurant, cafe, or retail space online in stunning 3D. Customers can explore your ambiance, menu spots, and seating areas before making a reservation.",
    features: ["Ambiance Preview", "Menu Integration", "Seating Layouts", "Booking Integration"],
    gradient: "from-[#fd79a8] to-[#fab1a0]",
  },
  {
    icon: "🚗",
    title: "3D Product Showcases",
    description:
      "Interactive 3D models of your products — cars, furniture, electronics, and more. Let customers inspect every detail with 360° rotation, zoom, and customization.",
    features: ["360° Rotation", "Zoom & Inspect", "Color Customization", "AR Preview"],
    gradient: "from-[#fdcb6e] to-[#f9ca24]",
  },
  {
    icon: "🎮",
    title: "Interactive Experiences",
    description:
      "Gamified and interactive 3D web experiences that tell your brand story. From virtual events to interactive showcases, we create experiences that users remember.",
    features: ["Brand Storytelling", "Virtual Events", "User Interaction", "Analytics"],
    gradient: "from-[#6c5ce7] to-[#00cec9]",
  },
  {
    icon: "📱",
    title: "3D Mobile Apps",
    description:
      "Cross-platform 3D applications that run smoothly on mobile devices. Optimized for performance with stunning visuals on both iOS and Android browsers.",
    features: ["Cross-platform", "Touch Optimized", "Offline Support", "Push Notifications"],
    gradient: "from-[#00cec9] to-[#fd79a8]",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const cards = sectionRef.current?.querySelectorAll(".service-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-28 md:py-36" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-accent-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
            What We Build
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Our <span className="gradient-text">3D Services</span>
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From concept to deployment, we build complete 3D web solutions
            tailored to your business needs.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card glass-card rounded-2xl p-8 group relative overflow-hidden transition-all duration-700 ease-out"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Gradient accent on hover */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="text-4xl mb-5">{service.icon}</div>
              <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-3 py-1.5 rounded-full border border-accent-primary/15 text-text-muted bg-accent-primary/5 group-hover:border-accent-primary/30 group-hover:text-text-secondary transition-all duration-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
