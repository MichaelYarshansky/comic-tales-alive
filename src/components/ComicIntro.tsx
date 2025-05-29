
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ComicIntroProps {
  onComplete: () => void;
}

const ComicIntro = ({ onComplete }: ComicIntroProps) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const panels = [
    {
      text: "Welcome to...",
      background: "bg-gradient-to-br from-blue-500 to-purple-600",
      textColor: "text-white",
    },
    {
      text: "YOUR LIFE",
      background: "bg-gradient-to-br from-yellow-400 to-orange-500",
      textColor: "text-black",
    },
    {
      text: "YOUR COMIC",
      background: "bg-gradient-to-br from-red-500 to-pink-600",
      textColor: "text-white",
    },
    {
      text: "Turn memories into magic!",
      background: "bg-gradient-to-br from-green-500 to-blue-500",
      textColor: "text-white",
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    const panelTimer = setInterval(() => {
      setCurrentPanel((prev) => {
        if (prev < panels.length - 1) {
          return prev + 1;
        } else {
          clearInterval(panelTimer);
          setTimeout(onComplete, 2000);
          return prev;
        }
      });
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearInterval(panelTimer);
    };
  }, [onComplete, panels.length]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {showSkip && (
        <Button
          onClick={onComplete}
          className="absolute top-6 right-6 z-50 bg-black/50 text-white hover:bg-black/70"
          variant="outline"
        >
          Skip Intro
        </Button>
      )}
      
      <div className="relative w-full h-full">
        {panels.map((panel, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${panel.background} flex items-center justify-center transform transition-all duration-1000 ${
              currentPanel === index 
                ? 'scale-100 opacity-100 rotate-0' 
                : currentPanel > index 
                  ? 'scale-110 opacity-0 -rotate-12' 
                  : 'scale-90 opacity-0 rotate-12'
            }`}
          >
            {/* Comic-style border */}
            <div className="absolute inset-4 border-8 border-black rounded-3xl"></div>
            <div className="absolute inset-8 border-4 border-white rounded-2xl"></div>
            
            {/* Content */}
            <div className="text-center z-10">
              <h1 className={`text-6xl md:text-8xl font-black ${panel.textColor} drop-shadow-2xl animate-pulse comic-text`}>
                {panel.text}
              </h1>
              
              {/* Comic-style effects */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-70 animate-bounce"></div>
              <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-red-400 rotate-45 opacity-60 animate-spin"></div>
            </div>

            {/* Comic dots pattern */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-black rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicIntro;
