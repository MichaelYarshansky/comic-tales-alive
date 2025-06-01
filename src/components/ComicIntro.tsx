
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ComicIntroProps {
  onComplete: () => void;
}

const ComicIntro = ({ onComplete }: ComicIntroProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const comicPages = [
    {
      leftPage: {
        title: "KEEPICS",
        subtitle: "THE ADVENTURE BEGINS",
        illustration: "🦸‍♂️",
        text: "Transform your memories into comic magic!",
        background: "bg-gradient-to-br from-red-500 to-orange-500"
      },
      rightPage: {
        title: "CHAPTER 1",
        subtitle: "YOUR STORY",
        illustration: "📸",
        text: "Every photo has a story waiting to be told...",
        background: "bg-gradient-to-br from-blue-500 to-purple-500"
      }
    },
    {
      leftPage: {
        title: "UPLOAD",
        subtitle: "YOUR PHOTOS",
        illustration: "⚡",
        text: "POW! Upload your favorite memories!",
        background: "bg-gradient-to-br from-green-500 to-teal-500"
      },
      rightPage: {
        title: "AI MAGIC",
        subtitle: "STORY TIME",
        illustration: "✨",
        text: "BOOM! Our AI transforms them into epic comic stories!",
        background: "bg-gradient-to-br from-purple-500 to-pink-500"
      }
    },
    {
      leftPage: {
        title: "CREATE",
        subtitle: "YOUR COMIC",
        illustration: "📚",
        text: "Build your personalized comic book in minutes!",
        background: "bg-gradient-to-br from-yellow-500 to-red-500"
      },
      rightPage: {
        title: "READY?",
        subtitle: "LET'S GO!",
        illustration: "🚀",
        text: "Your comic adventure awaits!",
        background: "bg-gradient-to-br from-indigo-500 to-blue-500"
      }
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    const autoFlip = setInterval(() => {
      if (currentPage < comicPages.length - 1) {
        flipToNextPage();
      } else {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(autoFlip);
    };
  }, [currentPage, onComplete]);

  const flipToNextPage = () => {
    if (currentPage < comicPages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const ComicPage = ({ page, side }: { page: any; side: 'left' | 'right' }) => (
    <div className={`w-full h-full ${page.background} p-8 flex flex-col justify-center items-center text-white relative overflow-hidden`}>
      {/* Comic panel border */}
      <div className="absolute inset-4 border-4 border-white rounded-lg"></div>
      
      {/* Comic dots pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Title */}
        <h1 className="text-4xl font-black mb-2 transform -rotate-2 drop-shadow-lg">
          {page.title}
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-2xl font-bold mb-6 transform rotate-1">
          {page.subtitle}
        </h2>
        
        {/* Illustration */}
        <div className="text-8xl mb-6 animate-bounce">
          {page.illustration}
        </div>
        
        {/* Speech bubble */}
        <div className="relative bg-white text-gray-900 p-4 rounded-2xl max-w-xs mx-auto font-bold text-lg">
          {page.text}
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-white"></div>
        </div>
      </div>
      
      {/* Comic action words */}
      {side === 'right' && (
        <div className="absolute top-4 right-4 text-yellow-300 font-black text-2xl transform rotate-12 drop-shadow-lg">
          {currentPage === 0 ? 'WOW!' : currentPage === 1 ? 'AMAZING!' : 'EPIC!'}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
      {showSkip && (
        <Button
          onClick={onComplete}
          className="absolute top-6 right-6 z-50 bg-white/20 text-white hover:bg-white/30 border-2 border-white"
          variant="outline"
        >
          Skip Intro
        </Button>
      )}
      
      {/* Comic Book */}
      <div className="relative w-full max-w-6xl h-96 mx-4" style={{ perspective: '1500px' }}>
        
        {/* Book Base */}
        <div className="relative w-full h-full bg-gray-800 rounded-lg shadow-2xl">
          
          {/* Left Page */}
          <div className="absolute left-0 w-1/2 h-full bg-white rounded-l-lg border-r-2 border-gray-300 shadow-lg">
            <ComicPage page={comicPages[currentPage].leftPage} side="left" />
          </div>
          
          {/* Right Page */}
          <div 
            className={`absolute right-0 w-1/2 h-full bg-white rounded-r-lg shadow-lg transition-transform duration-600 origin-left ${
              isFlipping ? 'transform rotateY-180' : ''
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: isFlipping ? 'rotateY(-180deg)' : 'rotateY(0deg)'
            }}
          >
            <ComicPage page={comicPages[currentPage].rightPage} side="right" />
          </div>
          
          {/* Page numbers */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-600 font-bold">
            Page {currentPage * 2 + 1} - {currentPage * 2 + 2}
          </div>
        </div>
        
        {/* Book spine */}
        <div className="absolute left-1/2 top-0 w-4 h-full bg-gray-700 transform -translate-x-1/2 rounded-sm shadow-lg z-10"></div>
      </div>
      
      {/* Click indicator */}
      {currentPage < comicPages.length - 1 && (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-pulse"
          onClick={flipToNextPage}
        >
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-full">
            Flip Page →
          </Button>
        </div>
      )}
    </div>
  );
};

export default ComicIntro;
