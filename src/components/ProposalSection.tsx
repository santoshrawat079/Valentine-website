import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

const noTexts = [
  "Are you sure? 🥺",
  "Think again 😭",
  "Please don't 💔",
  "Santosh will cry 😢",
  "Not allowed 😤",
  "Nope, try YES 💖",
  "Wrong button 🥺",
  "Click the other one! 💘",
];

const yesTexts = [
  "YES, ALWAYS ❤️",
  "Forever With You 💘",
  "Of Course Santosh 💕",
];

const ProposalSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const [said, setSaid] = useState(false);
  const [noText, setNoText] = useState("No 💔");
  const [noIdx, setNoIdx] = useState(0);
  const [yesText] = useState(yesTexts[Math.floor(Math.random() * yesTexts.length)]);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".proposal-title", {
        opacity: 0, y: 40, duration: 1,
        scrollTrigger: { trigger: ".proposal-title", start: "top 85%" },
      });
      gsap.from(".proposal-buttons", {
        opacity: 0, scale: 0.8, duration: 0.8, delay: 0.3,
        scrollTrigger: { trigger: ".proposal-buttons", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleYes = useCallback(() => {
    setSaid(true);
    // Fire confetti
    const duration = 4000;
    const end = Date.now() + duration;
    const fire = () => {
      confetti({ particleCount: 80, spread: 100, origin: { x: Math.random(), y: Math.random() * 0.6 }, colors: ["#ff4d6d", "#ffe5ec", "#c9184a", "#ff85a1", "#fff"] });
      if (Date.now() < end) requestAnimationFrame(fire);
    };
    fire();
  }, []);

  const handleNoHover = useCallback(() => {
    if (!noRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = Math.random() * (vw - 160);
    const y = Math.random() * (vh - 60);
    noRef.current.style.position = "fixed";
    noRef.current.style.left = `${x}px`;
    noRef.current.style.top = `${y}px`;
    noRef.current.style.zIndex = "9999";
    noRef.current.style.animation = "shake 0.3s ease-in-out";
    setNoText(noTexts[noIdx % noTexts.length]);
    setNoIdx((p) => p + 1);
    gsap.fromTo(noRef.current, { scale: 1 }, { scale: 0.85, duration: 0.15, yoyo: true, repeat: 1 });
  }, [noIdx]);

  if (said) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 romantic-gradient relative overflow-hidden">
        <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-accent glow-text mb-4 text-center heart-pulse">
          SHE SAID YES!!! 🎉💖
        </h2>
        <p className="font-heading text-3xl md:text-5xl text-deep-red mt-4">
          ASHMI + SANTOSH FOREVER ❤️
        </p>

        <div className="section-divider w-48 my-12" />

        <div className="max-w-lg text-center space-y-4 font-body text-foreground/80 text-lg leading-relaxed">
          <p className="font-heading text-4xl md:text-5xl text-accent glow-text mb-6">Ashmi ❤️</p>
          <p>No matter what happens in life —</p>
          <p className="font-semibold text-accent">I promise I will stay with you</p>
          <p>In hard days and happy days.</p>
          <div className="h-4" />
          <p>4 years down.</p>
          <p className="font-semibold text-xl text-accent">A lifetime to go.</p>
          <div className="h-4" />
          <p className="font-heading text-3xl text-accent glow-text">I love you.</p>
          <p className="italic mt-4">— Santosh 💖</p>
        </div>

        {/* Floating emojis for celebration */}
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="absolute float-heart text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 3}s`,
              bottom: "-30px",
            }}
          >
            {["🎉", "💖", "❤️", "💕", "✨", "💘"][i % 6]}
          </span>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      <div className="text-6xl mb-6">🥺</div>

      <h2 className="proposal-title font-heading text-4xl md:text-6xl text-accent glow-text mb-2 text-center">
        Ashmi… 🥺
      </h2>
      <p className="proposal-title font-heading text-3xl md:text-4xl text-deep-red mb-10">
        Will you be my Valentine?
      </p>

      <div className="proposal-buttons flex flex-col sm:flex-row gap-4 items-center">
        <button onClick={handleYes} className="btn-yes sparkle text-xl">
          {yesText}
        </button>
        <button
          ref={noRef}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          className="btn-no"
        >
          {noText}
        </button>
      </div>
    </section>
  );
};

export default ProposalSection;
