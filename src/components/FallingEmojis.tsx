
import { useEffect, useState } from 'react';

const FallingEmojis = () => {
    const emojis = ["🌸", "🌹", "🌺", "💐", "❤️", "💕", "😍", "💘"];
    const [drops, setDrops] = useState<{ id: number, emoji: string, left: string, duration: string, delay: string, fontSize: string }[]>([]);

    useEffect(() => {
        const newDrops = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            left: Math.random() * 100 + "vw",
            duration: (Math.random() * 5 + 5) + "s",
            delay: -(Math.random() * 10) + "s",
            fontSize: (Math.random() * 1.5 + 1) + "rem"
        }));
        setDrops(newDrops);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {drops.map(drop => (
                <div
                    key={drop.id}
                    className="falling-emoji absolute"
                    style={{
                        left: drop.left,
                        animationDuration: drop.duration,
                        animationDelay: drop.delay,
                        fontSize: drop.fontSize
                    }}
                >
                    {drop.emoji}
                </div>
            ))}
        </div>
    );
};

export default FallingEmojis;
