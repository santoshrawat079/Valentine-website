import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LoveLetterSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".letter-line").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
      gsap.from(".letter-forever", {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: ".letter-forever", start: "top 85%", toggleActions: "play none none none" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-glow-pink/10 blur-3xl heart-pulse" />
      </div>

      <h2 className="font-heading text-4xl md:text-6xl text-accent glow-text mb-10 relative z-10">
        💌 A Love Letter
      </h2>

      <div className="max-w-lg text-center space-y-4 relative z-10 font-body text-foreground/80 leading-relaxed">
        <p className="letter-line text-lg italic">My Dearest Ashmi,</p>
        <p className="letter-line">These four years changed me.</p>
        <p className="letter-line">You are not just my girlfriend.</p>
        <p className="letter-line font-semibold text-accent">You are my peace.</p>
        <p className="letter-line font-semibold text-accent">You are my strength.</p>
        <p className="letter-line font-semibold text-accent">You are my home.</p>

        <div className="letter-line h-4" />

        <p className="letter-line">When life becomes hard —</p>
        <p className="letter-line font-medium">I promise I will not run.</p>

        <div className="letter-line h-2" />

        <p className="letter-line">When you feel tired —</p>
        <p className="letter-line font-medium">I will hold you stronger.</p>

        <div className="letter-line h-2" />

        <p className="letter-line">When the world feels heavy —</p>
        <p className="letter-line font-medium">I will stand between you and the storm.</p>

        <div className="letter-line h-4" />

        <p className="letter-line text-lg">I choose you.</p>
        <p className="letter-line">Not just today.</p>
        <p className="letter-line font-semibold">But every single day.</p>

        <div className="letter-line h-4" />

        <p className="letter-line">I will stay.</p>
        <p className="letter-line">I will fight.</p>
        <p className="letter-line">I will love you.</p>

        <p className="letter-forever font-heading text-4xl md:text-5xl text-accent glow-text mt-6 heart-pulse">
          Forever. ❤️
        </p>

        <p className="letter-line text-lg italic mt-6">— Santosh ❤️</p>
      </div>
    </section>
  );
};

export default LoveLetterSection;
