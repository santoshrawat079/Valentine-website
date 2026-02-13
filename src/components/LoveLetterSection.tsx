import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LoveLetterSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Animate letter lines when opened
      if (isOpen) {
        gsap.utils.toArray<HTMLElement>(".letter-line").forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 15,
            duration: 0.5,
            delay: i * 0.08,
          });
        });
        gsap.from(".letter-forever", {
          scale: 0.5,
          opacity: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          delay: 1.5,
        });
      }
    }, ref);
    return () => ctx.revert();
  }, [isOpen]);

  const handleOpen = () => {
    setShowPreview(false);

    // Create celebration effect
    createCelebration();

    // Animate envelope opening
    gsap.to(".envelope", {
      rotationX: -180,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(".letter-content", {
      y: -100,
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });

    setTimeout(() => setIsOpen(true), 1500);
  };

  const createCelebration = () => {
    const container = document.querySelector('.celebration-container');
    if (!container) return;

    // Create heart confetti
    for (let i = 0; i < 30; i++) {
      const heart = document.createElement('div');
      heart.className = 'celebration-heart';
      heart.innerHTML = ['❤️', '💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 6)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
      container.appendChild(heart);

      gsap.to(heart, {
        y: -window.innerHeight,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: Math.random() * 2 + 2,
        ease: "power1.out",
        onComplete: () => heart.remove(),
      });
    }

    // Create sparkles
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'celebration-sparkle';
      sparkle.innerHTML = '✨';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      container.appendChild(sparkle);

      gsap.to(sparkle, {
        scale: 2,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => sparkle.remove(),
      });
    }
  };

  return (
    <section ref={ref} className="flex flex-col items-center justify-center px-4 py-10 md:py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-glow-pink/10 blur-3xl heart-pulse" />
      </div>

      {/* Celebration container */}
      <div className="celebration-container absolute inset-0 pointer-events-none z-50" />

      {/* <h2 className="font-heading text-4xl md:text-6xl text-accent glow-text mb-10 relative z-10">
        💌 A Love Letter
      </h2> */}

      {!isOpen ? (
        <div key="envelope-container" className="relative z-10">
          {/* Preview message */}
          {showPreview && (
            <div className="text-center mb-8 space-y-4 preview-message">
              <p className="text-3xl font-heading text-accent animate-pulse">
                💌 A Love Letter 💌
              </p>
              <p className="text-xl text-foreground font-body font-medium">
                I have something to say...
              </p>
              <p className="text-lg text-foreground/80 font-body">
                Open card to view
              </p>
            </div>
          )}

          {/* Envelope */}
          <div
            onClick={handleOpen}
            className="envelope-wrapper cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
          >
            <div className="envelope relative w-80 h-52 perspective-1000">
              {/* Envelope body */}
              <div className="envelope-body absolute inset-0 bg-gradient-to-br from-pink-100 to-red-100 rounded-lg shadow-2xl border-4 border-red-200">
                {/* Decorative hearts */}
                <div className="absolute top-4 left-4 text-2xl animate-bounce">💝</div>
                <div className="absolute top-4 right-4 text-2xl animate-bounce delay-100">💝</div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl heart-pulse">
                  💌
                </div>

                {/* Seal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-red-300 hover:scale-110 transition-transform">
                  <span className="text-2xl">💗</span>
                </div>
              </div>

              {/* Envelope flap */}
              <div className="envelope-flap absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-red-200 to-pink-200 origin-top border-4 border-red-200 border-b-0 clip-flap shadow-lg" />
            </div>

            {/* Hover hint */}
            <p className="text-center mt-6 text-sm text-foreground/60 font-body hover-hint">
              ✨ Click to open ✨
            </p>
          </div>
        </div>
      ) : (
        // Letter content
        <div key="letter-container" className="letter-content max-w-2xl relative z-10" style={{ transform: 'none' }}>
          <div className="bg-gradient-to-br from-pink-50/90 to-red-50/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl border-4 border-red-200">
            <div className="space-y-4 font-body text-foreground/80 leading-relaxed">
              <p className="letter-line text-xl text-accent font-bold">✨ Happy Valentine’s Day, Ashmi..!! ✨</p>
              <p className="letter-line font-medium text-lg text-center">My love of my life. ❤️</p>

              <div className="letter-line h-4" />

              <p className="letter-line" style={{ transform: 'none' }}>I feel so truly blessed to have you and to be a part of your beautiful life.</p>
              <p className="letter-line" style={{ transform: 'none' }}>Thank you for your endless love, support, care, and for everything you do for me.</p>
              <p className="letter-line font-semibold text-accent text-lg" style={{ transform: 'none' }}>You are my strength in difficult times and my happiness in the brightest moments.</p>

              <div className="letter-line h-4" />

              <p className="letter-line" style={{ transform: 'none' }}>I promise to always stand by you, especially in every hard time.</p>
              <p className="letter-line" style={{ transform: 'none' }}>I cherish your presence beside me — it gives my heart peace and my life meaning.</p>

              <div className="letter-line h-4" />

              <p className="letter-line text-lg font-medium" style={{ transform: 'none' }}>I love you today, tomorrow, and forever…</p>
              <p className="letter-line text-xl font-bold text-accent" style={{ transform: 'none' }}>In every lifetime and every moment. ❤️✨</p>

              <p className="letter-forever font-heading text-5xl md:text-6xl text-accent glow-text mt-8 mb-6 heart-pulse text-center" style={{ transform: 'none' }}>
                Always Yours ❤️
              </p>

              <p className="letter-line text-xl text-right text-accent mt-8" style={{ transform: 'none' }}>
                — Your Santosh 💕
              </p>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-1000 {
          perspective: 1000px;
        }

        .clip-flap {
          clip-path: polygon(0 0, 100% 0, 50% 100%);
        }

        .envelope-flap {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .envelope-body {
          backface-visibility: hidden;
        }

        .letter-content {
          animation: letter-appear 1s ease-out;
          backface-visibility: visible !important;
          transform: none !important;
          transform-style: flat;
        }

        @keyframes letter-appear {
          from { opacity: 0; transform: scale(0.9) translateY(50px) !important; }
          to { opacity: 1; transform: scale(1) translateY(0) !important; }
        }

        .hover-hint {
          animation: gentle-bounce 2s ease-in-out infinite;
        }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .celebration-heart,
        .celebration-sparkle {
          position: absolute;
          pointer-events: none;
          z-index: 100;
        }

        .preview-message {
          animation: fade-in 1s ease-out;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
      `}} />
    </section>
  );
};

export default LoveLetterSection;