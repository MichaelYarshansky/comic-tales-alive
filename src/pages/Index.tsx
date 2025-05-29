
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Book, Camera, Globe, Sparkles } from 'lucide-react';
import ComicIntro from '@/components/ComicIntro';
import ComicBuilder from '@/components/ComicBuilder';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showBuilder, setShowBuilder] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 8000); // Show intro for 8 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleStartBuilding = () => {
    setShowBuilder(true);
  };

  if (showIntro) {
    return <ComicIntro onComplete={() => setShowIntro(false)} />;
  }

  if (showBuilder) {
    return <ComicBuilder onBack={() => setShowBuilder(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Comic-style background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-red-400 rotate-45 opacity-20 animate-bounce"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-blue-400 opacity-25 animate-spin"></div>

        <div className="relative z-10 text-center max-w-4xl animate-fade-in">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg animate-scale-in">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Your Life
              </span>
              <br />
              <span className="text-white">
                Your Comic
              </span>
            </h1>
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-yellow-400 transform rotate-1 rounded-lg"></div>
              <p className="relative bg-white text-gray-900 text-xl md:text-2xl font-semibold px-6 py-3 rounded-lg transform -rotate-1">
                Turn your memories into a personalized comic book!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={handleStartBuilding}
              className="bg-red-500 hover:bg-red-600 text-white text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border-4 border-white"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              Create Your Comic Now!
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/90 text-gray-900 text-lg px-6 py-3 rounded-full hover:bg-white border-2 border-gray-900"
            >
              <Book className="mr-2 h-5 w-5" />
              See Examples
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white/95 border-4 border-yellow-400 transform hover:scale-105 transition-all duration-300 hover:rotate-1">
              <CardContent className="p-6 text-center">
                <Camera className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Photos</h3>
                <p className="text-gray-700">Add your favorite memories and moments</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 border-4 border-red-400 transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
              <CardContent className="p-6 text-center">
                <Book className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tell Your Story</h3>
                <p className="text-gray-700">Add captions and bring your photos to life</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 border-4 border-blue-400 transform hover:scale-105 transition-all duration-300 hover:rotate-1">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Global Shipping</h3>
                <p className="text-gray-700">Delivered anywhere in the world</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
