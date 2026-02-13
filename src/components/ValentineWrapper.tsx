
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import FallingEmojis from './FallingEmojis';
import LoveLetterSection from './LoveLetterSection';
import FloatingHearts from './FloatingHearts';
import JourneySection from './JourneySection';

gsap.registerPlugin(ScrollTrigger);

const ValentineWrapper = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [celebrationVisible, setCelebrationVisible] = useState(false);
    const [finalMessageVisible, setFinalMessageVisible] = useState(false);
    const [galleryExpanded, setGalleryExpanded] = useState(false);
    const [noBtnText, setNoBtnText] = useState("No...");
    const [showSadEmoji, setShowSadEmoji] = useState(false);
    const [sadEmojiPos, setSadEmojiPos] = useState({ x: 0, y: 0 });
    const [showCryingGif, setShowCryingGif] = useState(false);

    const noPhrases = [
        "Are you sure? 🥺",
        "Don't break my heart 💔",
        "Santosh will cry 😢",
        "Please Ashmi 😭",
        "No option disabled 😤",
        "Think again! 😖",
        "Really? 🥺"
    ];

    // No button escape logic
    const noBtnRef = useRef<HTMLButtonElement>(null);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

    // Organized Images (With Random Blank Images Interleaved)
    const rawImages = [
        // Batch 1 (Pic)
        '139016182_841503143077252_2673462837318732052_n.jpg',
        '268997062_651131489581145_5955260960338765613_n.jpg',
        '269748875_469830344497549_4326968646878669991_n.jpg',
        '272083330_1002334277296417_5256082829754581852_n.jpg',
        // Random Filler 1
        '2550e3683d49a83842116874afc8aef1.jpg',
        '272102897_339412791407241_1055473991891557496_n.jpg',
        '272111681_200914182198419_6711812204993730369_n.jpg',
        '272169499_428890215648986_3970856087835305930_n.jpg',
        '274798748_653894869005624_6040315056107687960_n.jpg',
        // Random Filler 2
        '2ba68c982eaf6be5a034cd0ed3dd0c23.jpg',
        '274966624_1760004747539878_2397793265014005944_n.jpg',
        '274980983_1120615092085249_5574979324503598642_n.jpg',
        '275032977_528404128615143_7478026935063965315_n.jpg',
        '275033010_1028000304467417_6897940158282635075_n.jpg',
        // Random Filler 3
        '514123809c18ac7b0915878a7e34ea33.jpg',
        '275061806_5426210700730450_4543260163573557529_n.jpg',
        '286419063_716419009692898_433505795906923709_n.jpg',
        '286741380_5817360958290420_2698394601892165720_n.jpg',
        '286926442_544665117370593_2107778563692033949_n.jpg',
        // Random Filler 4
        '5ffee11f50f9e9aaec1ee6c50ed3283e.jpg',
        '292677353_415636357001600_3787242594748251637_n.jpg',
        '315517361_865073851473176_5525979833014703622_n (1).jpg',
        '315525643_1121812245184349_9091265158411652021_n.jpg',
        '316438801_662453148900939_7749330337280118894_n (1).jpg',
        // Random Filler 5
        '6b0220fe26f0bcaaff37d9ba75eff8c5.jpg',
        '321545893_1215076995767679_4183452857425301623_n.jpg',
        '321603663_846372789908153_7662552418857843449_n.jpg',
        '342682891_222751200394369_8325479357866496527_n.jpg',
        '342873970_833491624929009_2605741730855289894_n.jpg',
        // Random Filler 6
        'b40e6e6134aa1182a1e27d6315761a0c.jpg',
        '343975780_1638478869972200_5816015947019794610_n.jpg',
        '346105580_936734460889283_4388398885700852583_n.jpg',
        '364550920_614927890787174_7004636952016339132_n.jpg',
        '366790661_3438134539783187_5817459129203263151_n.jpg',
        // Random Filler 7
        'cd586a90d4354a8ca67f9bab251b0bee.jpg',
        '371162086_1259143198100817_6771239383976372644_n.jpg',
        'WhatsApp Image 2026-02-13 at 11.13.46 PM (1).jpeg',
        'WhatsApp Image 2026-02-13 at 11.13.46 PM (2).jpeg',
        'WhatsApp Image 2026-02-13 at 11.13.46 PM.jpeg',
        // Random Filler 8
        'd27e6fcc71bae2f1339d0862bdb63616.jpg',
        'WhatsApp Image 2026-02-13 at 11.13.47 PM (1).jpeg',
        'WhatsApp Image 2026-02-13 at 11.13.47 PM (2).jpeg',
        'WhatsApp Image 2026-02-13 at 11.13.47 PM.jpeg',
        'WhatsApp Image 2026-02-13 at 11.13.48 PM (1).jpeg',
        // Random Filler 9
        'd48cbaccf485d127cc5f555df70fc40f.jpg',
        'WhatsApp Image 2026-02-13 at 11.13.48 PM.jpeg',
        'WhatsApp Image 2026-02-13 at 11.13.49 PM (1).jpeg',
        'WhatsApp Image 2026-02-13 at 11.13.49 PM.jpeg',
        'WhatsApp Image 2026-02-13 at 11.14.27 PM.jpeg',
        'WhatsApp Image 2026-02-13 at 11.15.30 PM.jpeg',
        // NEW Images (At End)
        '1630647726027.jpg',
        'WhatsApp Image 2026-02-13 at 11.15.29 PM.jpeg',
        'santosh.jpg'
    ];

    const rawVideos = [
        '315979185_5938836339513446_1333185649795373282_n.mp4',
        '357200906_6039291822864884_1593209135296553814_n.mp4',
        'AQN_WF-UdC0qy8ZoBTI-5bqY-my1Mo33jEHm5OFqU91tczUwX0PxtWsMfzwTymLR_ijUEodBpNBYf1n7F9LzxA7XIZ-fDpwA5fSc12d0Q4fBDidtIC8kptV2dGBEKQ.mp4'
    ];

    // GSAP Animations
    useEffect(() => {
        // Hero Rotation
        gsap.to('#hero-photo', {
            rotation: 360, duration: 20, repeat: -1, ease: 'none'
        });

        // Scroll Triggers
        gsap.from('#journey', {
            scrollTrigger: { trigger: '#journey', start: 'top 80%' },
            opacity: 0, y: 50, duration: 1
        });

        gsap.from('#main-letter', {
            scrollTrigger: { trigger: '#main-letter', start: 'top 80%' },
            opacity: 0, scale: 0.8, duration: 1.2, ease: 'power3.out'
        });

        gsap.from('#proposal-text span', {
            scrollTrigger: { trigger: '#proposal', start: 'top 60%' },
            opacity: 0, y: 20, stagger: 0.3, duration: 0.8
        });

    }, []);

    // Slideshow Logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<string[]>([]);

    useEffect(() => {
        setSlides([
            '343975780_1638478869972200_5816015947019794610_n.jpg',
            '268997062_651131489581145_5955260960338765613_n.jpg',
            'WhatsApp Image 2026-02-13 at 11.13.46 PM (1).jpeg',
            'WhatsApp Image 2026-02-13 at 11.13.47 PM.jpeg'
        ]);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides]);


    // Events
    // Unified No reaction logic
    const triggerNoReaction = () => {
        // Change text randomly
        setNoBtnText(noPhrases[Math.floor(Math.random() * noPhrases.length)]);

        // Show sad emoji at random position near button
        const btnRect = noBtnRef.current?.getBoundingClientRect();
        if (btnRect) {
            setSadEmojiPos({
                x: btnRect.left + (Math.random() * 200 - 100),
                y: btnRect.top + (Math.random() * 200 - 100)
            });
            setShowSadEmoji(true);
            setShowCryingGif(true);
            setTimeout(() => {
                setShowSadEmoji(false);
                setShowCryingGif(false);
            }, 1000);
        }

        // Move away Logic
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 100);

        if (noBtnRef.current) {
            gsap.to(noBtnRef.current, {
                x: x - noBtnRef.current.getBoundingClientRect().left,
                y: y - noBtnRef.current.getBoundingClientRect().top,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };

    const handleNoHover = (e: React.MouseEvent | React.TouchEvent) => {
        triggerNoReaction();
    };

    const handleMobileNoClick = (e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();
        triggerNoReaction();
    };

    // Advanced Proximity Logic for Desktop
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!noBtnRef.current || window.innerWidth < 768) return; // Skip on mobile

            const btnRect = noBtnRef.current.getBoundingClientRect();
            const btnCenter = {
                x: btnRect.left + btnRect.width / 2,
                y: btnRect.top + btnRect.height / 2
            };

            const dist = Math.hypot(e.clientX - btnCenter.x, e.clientY - btnCenter.y);

            // If cursor is NEAR (within 150px), move away
            if (dist < 150) {
                handleNoHover(e as any);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleYesClick = () => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setCelebrationVisible(true);
        // Reduced to exactly 2 seconds for an even snappier transition
        setTimeout(() => setFinalMessageVisible(true), 2000);
    };

    if (celebrationVisible) {
        return (
            <div className="fixed inset-0 bg-[#ffe5ec] z-50 overflow-y-auto flex flex-col items-center py-10 md:py-20 text-center px-4">
                <FallingEmojis />
                {!finalMessageVisible ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="animate-bounce text-9xl">🎉💖💍</div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
                        <div className="animate-in fade-in zoom-in duration-1000 mb-20">
                            <h1 className="text-5xl md:text-7xl font-dancing text-[#c9184a] mb-8">Yay! I Love You Ashmi! 💖</h1>
                            <img src="photos/santosh.jpg" className="w-[250px] h-[250px] md:w-[320px] md:h-[320px] object-cover rounded-full shadow-2xl mx-auto mb-8 border-8 border-white" alt="Happy Couple" />
                            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto italic mb-10">
                                Thank you for making me the happiest person alive. Here's to forever! 🥂
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-[#fff0f3] overflow-x-hidden disable-selection relative">
            <FloatingHearts />
            <FallingEmojis />
            <div className="max-w-7xl mx-auto">

                {/* HERO SECTION - FEATURED ROTATED IMAGE */}
                <section className="min-h-screen flex flex-col items-center justify-center relative py-20">
                    <div className="absolute top-10 left-10 text-6xl animate-pulse">🎈</div>
                    <div className="absolute top-20 right-20 text-6xl animate-bounce delay-1000">💕</div>

                    <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] mb-8 md:mb-12">
                        <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#ff4d6d] animate-[spin_10s_linear_infinite]"></div>
                        {/* SECOND IMAGE ROTATED */}
                        <img
                            id="hero-photo"
                            src="photos/hero_photo.jpg"
                            alt="Us"
                            className="w-full h-full object-cover rounded-full p-4 border-4 border-white shadow-2xl"
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-dancing text-[#c9184a] mb-4 md:mb-6 text-center drop-shadow-md">
                        Happy Valentine's Day,<br />My Love ❤️
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-light tracking-widest uppercase text-center">Forever & Always</p>
                </section>


                {/* OUR JOURNEY SLIDESHOW */}
                <section id="journey" className="py-8 md:py-20 bg-white rounded-[25px] md:rounded-[50px] shadow-xl mx-2 md:mx-4 my-2 md:my-8 p-4 md:p-8 relative overflow-hidden">
                    <h2 className="text-4xl md:text-5xl font-dancing text-center text-[#c9184a] mb-6 md:mb-12">My love of life 💑</h2>

                    <div className="relative w-full max-w-4xl mx-auto h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                        {slides.map((src, i) => (
                            <img
                                key={i}
                                src={`photos/${src}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                alt="Memory"
                            />
                        ))}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-white text-center">
                            <p className="text-xl font-light italic">"Every moment with you is a treasure..."</p>
                        </div>
                    </div>
                </section>

                <LoveLetterSection />



                {/* FEATURED FRAME */}
                <section className="py-10 md:py-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-dancing text-[#c9184a] mb-12 md:mb-16">My Favourite Person 💖</h2>
                    <div className="collection-frame inline-block p-4 md:p-8 bg-[#fdfbf7] relative shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                        <img src="photos/favorite_person.jpg" className="max-w-full h-auto max-h-[500px] shadow-lg block" alt="My Favorite Person" />
                    </div>
                </section>

                {/* GALLERY (IMAGES ONLY - NO QUOTES) */}
                <section id="gallery-section" className="py-10 md:py-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-dancing text-[#c9184a] mb-8 md:mb-12">All Our Memories 💖</h2>

                    {!galleryExpanded ? (
                        <div className="max-w-md mx-4 md:mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-pink-200 relative cursor-pointer" onClick={() => setGalleryExpanded(true)}>
                            {/* Sticker */}
                            <div className="absolute -top-10 -right-10 text-8xl animate-bounce filter drop-shadow-lg z-20">💌</div>
                            <div className="absolute -bottom-5 -left-5 text-6xl animate-pulse delay-700 z-20">✨</div>
                            <div className="text-6xl mb-6">📸</div>
                            <h3 className="text-3xl font-dancing text-[#c9184a] mb-4">A Secret Collection</h3>
                            <p className="text-xl text-gray-600 mb-8 font-light">
                                I have collected all our special moments here...<br />
                                Are you ready to see them?
                            </p>
                            <button
                                onClick={(e) => { e.stopPropagation(); setGalleryExpanded(true); }}
                                className="px-8 py-3 text-xl font-bold text-white bg-gradient-to-r from-[#ff4d6d] to-[#c9184a] rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
                            >
                                View Memories 💖
                            </button>
                        </div>
                    ) : (
                        <div className="memory-gallery bg-[#f7e1e6] p-3 md:p-8 rounded-3xl shadow-inner animate-in fade-in zoom-in duration-700">
                            <div id="gallery" className="gallery-grid flex flex-wrap justify-center gap-2 md:gap-8">
                                {rawImages.map((src, i) => (
                                    <div key={i} className="gallery-item w-[280px] bg-white p-4 pb-12 shadow-md relative cursor-pointer transform hover:scale-105 hover:z-50 transition-all duration-300"
                                        onClick={() => { setCurrentMediaIndex(i); setLightboxOpen(true); }}
                                    >
                                        <img src={`photos/${src}`} className="w-full h-[250px] object-cover border border-gray-200" loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* HAPPY MOMENTS (VIDEOS) */}
                {galleryExpanded && (
                    <section id="videos-section" className="py-10 md:py-20 text-center bg-white px-2">
                        <h2 className="text-4xl md:text-5xl font-dancing text-[#c9184a] mb-8 md:mb-12 animate-pulse">Our Happy Moments 🎬</h2>
                        <div className="flex flex-wrap justify-center gap-10 px-4">
                            {rawVideos.map((vid, i) => (
                                <div key={i} className="video-card w-[350px] bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-[#ff4d6d] relative group">
                                    <video
                                        src={`photos/${vid}`}
                                        className="w-full h-[250px] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                        controls
                                        playsInline
                                        webkit-playsinline="true"
                                        preload="auto"
                                        onClick={(e) => {
                                            const video = e.currentTarget;
                                            if (video.paused) {
                                                video.play();
                                            } else {
                                                video.pause();
                                            }
                                        }}
                                    />
                                    {/* <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent text-white pointer-events-none">
                                        <span className="text-3xl">▶️</span> Play Moment
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </section>
                )}


                {/* PROPOSAL */}
                <section id="proposal" className="min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center py-10 md:py-20 text-center px-4">
                    <img src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif" alt="Puppy Eyes" className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full object-cover shadow-xl mb-6 md:mb-10" />

                    <div id="proposal-text" className="text-3xl font-dancing text-[#c9184a] leading-relaxed mb-10">
                        <span>Ashmi… 🥺</span><br />
                        <span>Will you be my Valentine?</span><br />
                        <span>For every tomorrow? 💘</span>
                    </div>

                    <div className="flex gap-8 mt-8 relative">
                        <button
                            id="yes-btn"
                            onClick={handleYesClick}
                            className="px-10 py-3 text-xl md:px-8 md:py-2 md:text-lg font-bold text-white rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#c9184a] shadow-lg transform transition-transform hover:scale-110 animate-pulse"
                        >
                            YES SANTOSH.
                        </button>
                        <button
                            id="no-btn"
                            ref={noBtnRef}
                            onClick={handleMobileNoClick}
                            onTouchStart={handleMobileNoClick}
                            onMouseEnter={() => triggerNoReaction()}
                            className="px-8 py-4 text-xl font-bold text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors disable-selection"
                        >
                            {noBtnText}
                        </button>
                    </div>
                </section>
            </div>

            {/* SAD EMOJI POPUP */}
            {
                showSadEmoji && (
                    <div
                        className="fixed text-6xl pointer-events-none z-[9999] animate-bounce"
                        style={{ left: sadEmojiPos.x, top: sadEmojiPos.y }}
                    >
                        😢💔
                    </div>
                )
            }

            {/* CRYING GIF OVERLAY */}
            {
                showCryingGif && (
                    <div className="fixed bottom-10 right-10 z-[10000] pointer-events-none">
                        <img src="https://media.giphy.com/media/26ufcVAp3AiJJsrIs/giphy.gif" alt="Crying" className="w-[150px] h-[150px] rounded-full shadow-xl" />
                    </div>
                )
            }

            {/* LIGHTBOX (Images Only) */}
            {
                lightboxOpen && (
                    <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setLightboxOpen(false)}>
                        <img
                            src={`photos/${rawImages[currentMediaIndex]}`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                        <button className="absolute top-10 right-10 text-white text-4xl hover:text-[#ff4d6d] transition-colors">&times;</button>
                    </div>
                )
            }
        </div >
    );
};

export default ValentineWrapper;
