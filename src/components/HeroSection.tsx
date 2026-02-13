import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ashmi1 from "@/assets/ashmi-1.jpg";
import ashmi2 from "@/assets/ashmi-2.jpg";
import ashmi3 from "@/assets/ashmi-3.jpg";
import ashmi4 from "@/assets/ashmi-4.jpg";
import ashmi5 from "@/assets/ashmi-5.jpg";
import ashmi6 from "@/assets/ashmi-6.jpg";
import ashmi7 from "@/assets/ashmi-7.jpg";

const images = [ashmi1, ashmi2, ashmi3, ashmi4, ashmi5, ashmi6, ashmi7];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { opacity: 0, y: 40, duration: 1.2, delay: 0.3 });
      gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 1, delay: 0.8 });
      gsap.from(".hero-text", { opacity: 0, y: 20, duration: 1, delay: 1.2 });
      gsap.from(".hero-image", { opacity: 0, scale: 0.8, duration: 1.5, delay: 0.2, ease: "back.out(1.4)" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="hero-image relative mb-8">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden photo-ring slow-rotate">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Ashmi"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === currentImg ? 1 : 0 }}
            />
          ))}
        </div>
        <div className="absolute -inset-4 rounded-full bg-glow-pink/20 blur-2xl -z-10" />
      </div>

      <h1 className="hero-title font-heading text-6xl md:text-8xl lg:text-9xl text-accent glow-text mb-2">
        Ashmi ❤️
      </h1>

      <p className="hero-subtitle font-heading text-2xl md:text-3xl text-deep-red mt-2 mb-6">
        From Santosh… Your Forever Person 💘
      </p>

      <p className="hero-text font-body text-base md:text-lg text-muted-foreground text-center max-w-md leading-relaxed">
        4+ years together…<br />
        And I still fall for you every single day.
      </p>

      <div className="mt-8 flex gap-3 text-2xl md:text-3xl">
        {["❤️", "💖", "💕", "💘", "💞", "🥺"].map((e, i) => (
          <span key={i} className="sparkle" style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
