
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ComicIntroProps {
  onComplete: () => void;
}

const ComicIntro = ({ onComplete }: ComicIntroProps) => {
  const [phase, setPhase] = useState('closed'); // closed -> opening -> opened -> scene
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    const phaseTimer = setTimeout(() => {
      setPhase('opening');
    }, 2000);

    const openTimer = setTimeout(() => {
      setPhase('opened');
    }, 4000);

    const sceneTimer = setTimeout(() => {
      setPhase('scene');
    }, 6000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 9000);

    return () => {
      clearTimeout(timer);
      clearTimeout(phaseTimer);
      clearTimeout(openTimer);
      clearTimeout(sceneTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {showSkip && (
        <Button
          onClick={onComplete}
          className="absolute top-6 right-6 z-50 bg-black/50 text-white hover:bg-black/70"
          variant="outline"
        >
          Skip Intro
        </Button>
      )}
      
      {/* Comic Book */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        
        {/* Closed Book */}
        {phase === 'closed' && (
          <div className="animate-scale-in">
            <div className="w-80 h-96 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-2xl border-8 border-yellow-400 transform rotate-3 hover:rotate-0 transition-all duration-1000">
              <div className="p-8 text-center h-full flex flex-col justify-center">
                <h1 className="text-4xl font-black text-yellow-300 mb-4 drop-shadow-lg">
                  YOUR LIFE
                </h1>
                <h2 className="text-3xl font-bold text-white mb-6">
                  YOUR COMIC
                </h2>
                <div className="w-20 h-20 bg-yellow-400 rounded-full mx-auto flex items-center justify-center animate-pulse">
                  <span className="text-red-600 font-bold text-2xl">★</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Opening Book */}
        {phase === 'opening' && (
          <div className="relative w-80 h-96" style={{ perspective: '1000px' }}>
            {/* Left Cover */}
            <div 
              className="absolute w-40 h-96 bg-gradient-to-br from-red-600 to-red-800 rounded-l-lg border-l-8 border-t-8 border-b-8 border-yellow-400 origin-left transition-all duration-2000 transform"
              style={{ transform: 'rotateY(-180deg)' }}
            >
            </div>
            
            {/* Right Cover with Content */}
            <div className="absolute right-0 w-40 h-96 bg-gradient-to-br from-red-600 to-red-800 rounded-r-lg border-r-8 border-t-8 border-b-8 border-yellow-400">
              <div className="p-4 text-center h-full flex flex-col justify-center">
                <h1 className="text-2xl font-black text-yellow-300 mb-2">
                  YOUR LIFE
                </h1>
                <h2 className="text-xl font-bold text-white">
                  YOUR COMIC
                </h2>
              </div>
            </div>

            {/* Inner Pages Visible */}
            <div className="absolute left-20 w-40 h-96 bg-white rounded shadow-lg flex items-center justify-center">
              <div className="text-center animate-fade-in">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h3>
                <p className="text-gray-600">Let's create magic...</p>
              </div>
            </div>
          </div>
        )}

        {/* Fully Opened Book */}
        {phase === 'opened' && (
          <div className="relative w-full max-w-4xl h-96 flex animate-scale-in">
            {/* Left Page */}
            <div className="w-1/2 h-full bg-white rounded-l-lg border-8 border-yellow-400 p-8 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Chapter 1</h2>
                <p className="text-lg text-gray-600">Your story begins here...</p>
                <div className="mt-6 w-16 h-16 bg-blue-400 rounded-full mx-auto animate-bounce"></div>
              </div>
            </div>
            
            {/* Right Page */}
            <div className="w-1/2 h-full bg-white rounded-r-lg border-8 border-yellow-400 border-l-4 p-8 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Turn memories</h2>
                <h3 className="text-3xl font-bold text-blue-600 mb-4">into magic!</h3>
                <div className="flex justify-center space-x-2">
                  <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scene Transition */}
        {phase === 'scene' && (
          <div className="w-full h-full animate-fade-in">
            {/* Magical Scene Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
              {/* Floating Elements */}
              <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute top-40 right-32 w-12 h-12 bg-pink-300 rotate-45 animate-spin opacity-70"></div>
              <div className="absolute bottom-32 left-40 w-20 h-20 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
              
              {/* Stars */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Central Message */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-8xl font-black mb-6 drop-shadow-2xl animate-pulse">
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Ready?
                  </span>
                </h1>
                <p className="text-2xl font-semibold mb-8 drop-shadow-lg">
                  Let's create your masterpiece!
                </p>
                <div className="flex justify-center space-x-4">
                  {['📸', '✨', '📖', '🚀'].map((emoji, i) => (
                    <div
                      key={i}
                      className="text-4xl animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicIntro;
