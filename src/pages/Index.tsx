
import { useState } from 'react';
import ValentineWrapper from '@/components/ValentineWrapper';
import FallingEmojis from '@/components/FallingEmojis';

const Index = () => {
  const [started, setStarted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStarted(true);
    }, 1000); // Wait for fade-out
  };

  if (started) {
    return <ValentineWrapper />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#ffe5ec] via-[#ff4d6d] to-[#ffe5ec] flex flex-col items-center justify-center relative overflow-hidden transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <FallingEmojis />

      {/* Floating Hearts BG */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute animate-pulse text-4xl opacity-50" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}>❤️</div>
        ))}
      </div>

      <div className="z-10 text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500 max-w-lg w-full">
        {/* User Provided Cover Image */}
        <div className="mb-8 w-64 h-64 mx-auto relative animate-in fade-in zoom-in duration-700">
          <div className="absolute inset-0 bg-pink-200 rounded-full blur-2xl opacity-40 animate-pulse"></div>
          <img
            src="photos/white_bear.png"
            alt="Open for Ashmi"
            className="w-full h-full object-contain relative z-10 drop-shadow-xl transform hover:scale-110 transition-transform duration-500"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-dancing text-[#c9184a] mb-8 drop-shadow-md">
          Just open it Ashmi ❤️
        </h1>

        <button
          onClick={handleStart}
          className="px-12 py-4 text-2xl font-bold text-white bg-gradient-to-r from-[#ff4d6d] to-[#c9184a] rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce"
        >
          OPEN ❤️
        </button>
      </div>

      <div className="absolute bottom-10 text-[#c9184a] font-dancing text-2xl opacity-80">
        Made with love by Santosh
      </div>
    </div>
  );
};

export default Index;
