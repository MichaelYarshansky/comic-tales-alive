
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Book, Camera, Globe, Sparkles, Star, Heart, MessageCircle } from 'lucide-react';
import ComicIntro from '@/components/ComicIntro';
import ComicBuilder from '@/components/ComicBuilder';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showBuilder, setShowBuilder] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 8000);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-red-500">
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
                KEEPICS
              </span>
            </h1>
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-yellow-400 transform rotate-1 rounded-lg"></div>
              <p className="relative bg-white text-gray-900 text-xl md:text-2xl font-semibold px-6 py-3 rounded-lg transform -rotate-1">
                Create Your Own Comic Book
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={handleStartBuilding}
              className="bg-red-500 hover:bg-red-600 text-white text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 border-4 border-white"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              Start Creating Now!
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/90 text-gray-900 text-lg px-6 py-3 rounded-full hover:bg-white border-2 border-gray-900"
            >
              <Book className="mr-2 h-5 w-5" />
              View Sample Comics
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Story Generation</h3>
                <p className="text-gray-700">Automatic comic stories from your images</p>
              </CardContent>
            </Card>

            <Card className="bg-white/95 border-4 border-blue-400 transform hover:scale-105 transition-all duration-300 hover:rotate-1">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Delivery</h3>
                <p className="text-gray-700">Get your PDF comic in minutes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sample Comics Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Sample Comics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Summer Vacation", pages: "8 pages", theme: "Family Adventure" },
              { title: "Birthday Party", pages: "4 pages", theme: "Celebration" },
              { title: "Pet Adventures", pages: "12 pages", theme: "Comedy" }
            ].map((sample, index) => (
              <Card key={index} className="border-4 border-purple-300 hover:border-purple-500 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-full h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg mb-4 flex items-center justify-center">
                    <Book className="h-16 w-16 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{sample.title}</h3>
                  <p className="text-gray-600">{sample.pages} • {sample.theme}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", review: "KEEPICS turned our family vacation into an amazing comic book! The kids love it!", rating: 5 },
              { name: "Mike D.", review: "So easy to use and the quality is fantastic. Ordered 3 more for gifts!", rating: 5 },
              { name: "Emma L.", review: "Perfect way to preserve memories. The AI story generation is surprisingly good!", rating: 5 }
            ].map((review, index) => (
              <Card key={index} className="border-2 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.review}"</p>
                  <p className="font-semibold text-gray-900">- {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How long does it take to create a comic?", a: "Most comics are ready within minutes after you upload your content." },
              { q: "Can I edit my comic after it's created?", a: "Yes, there is an editing step before final approval and payment." },
              { q: "What file format will I receive?", a: "You'll get a high-quality PDF and optional print-ready files." },
              { q: "Is there a physical print option?", a: "We are working on adding this feature in the near future." }
            ].map((faq, index) => (
              <Card key={index} className="border-2 border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">KEEPICS</h3>
              <p className="text-gray-300">Create personalized comic books from your memories.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-300">support@keepics.com</p>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-3 py-2 bg-gray-800 rounded-l flex-1" />
                <Button className="bg-blue-500 hover:bg-blue-600 rounded-l-none">Subscribe</Button>
              </div>
              <div className="flex space-x-4 mt-4">
                <Heart className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <MessageCircle className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KEEPICS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
