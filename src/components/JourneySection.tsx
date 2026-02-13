import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "The first time we talked…",
  "I didn't know you would become my whole world.",
  "",
  "We laughed together.",
  "We cried together.",
  "We fought sometimes.",
  "But we never left.",
  "",
  "4 years.",
  "Thousands of memories.",
  "One heart. ❤️",
];

const timeline = [
  "💕 First memory",
  "💕 First fight",
  "💕 First long night talk",
  '💕 Every "good night Ashmi" message',
];

const JourneySection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".journey-line").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 25,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: -30,
          duration: 0.5,
          delay: i * 0.15,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <h2 className="font-heading text-4xl md:text-6xl text-accent glow-text mb-12">Our Journey 💕</h2>

      <div className="max-w-lg text-center space-y-3 mb-12">
        {lines.map((line, i) =>
          line === "" ? (
            <div key={i} className="journey-line h-4" />
          ) : (
            <p key={i} className="journey-line font-body text-base md:text-lg text-foreground/80 leading-relaxed">
              {line}
            </p>
          )
        )}
      </div>

      <div className="section-divider w-48 mb-12" />

      <div className="space-y-4 max-w-sm">
        {timeline.map((item, i) => (
          <div key={i} className="timeline-item font-body text-lg md:text-xl text-foreground/70 bg-secondary/50 rounded-xl px-6 py-3 glow-box">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneySection;
