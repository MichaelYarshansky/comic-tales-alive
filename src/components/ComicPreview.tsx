
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';

interface ComicPage {
  id: string;
  photo: File | null;
  photoUrl: string;
  caption: string;
  story: string;
}

interface ComicPreviewProps {
  pages: ComicPage[];
  coverTitle: string;
  coverSummary: string;
  onBack: () => void;
  onProceedToCheckout: () => void;
}

const ComicPreview = ({ pages, coverTitle, coverSummary, onBack, onProceedToCheckout }: ComicPreviewProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const allPages = [{ isCover: true }, ...pages.map(p => ({ ...p, isCover: false }))];

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, allPages.length - 1));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
            <h1 className="text-3xl font-bold">Comic Preview</h1>
            <Button onClick={onProceedToCheckout} className="bg-green-500 hover:bg-green-600">
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Your Comic Book Preview</h2>
          <p className="text-lg opacity-80">
            Page {currentPage + 1} of {allPages.length}
          </p>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            onClick={prevPage}
            disabled={currentPage === 0}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {allPages.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  currentPage === index ? 'bg-yellow-400' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>

          <Button
            onClick={nextPage}
            disabled={currentPage === allPages.length - 1}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Comic Page Display */}
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl bg-white border-8 border-black shadow-2xl transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              {currentPage === 0 ? (
                // Cover Page
                <div className="bg-gradient-to-br from-red-500 to-purple-600 text-white p-8 min-h-[600px] flex flex-col justify-center items-center text-center">
                  <div className="border-4 border-white rounded-lg p-6 bg-black/20 backdrop-blur-sm">
                    <h1 className="text-4xl font-bold mb-4">{coverTitle}</h1>
                    <p className="text-lg mb-6">{coverSummary}</p>
                    <div className="text-sm opacity-80">
                      A Personalized Comic Book
                    </div>
                  </div>
                  
                  {/* Comic-style decorations */}
                  <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-70"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-400 rotate-45 opacity-60"></div>
                </div>
              ) : (
                // Content Page
                <div className="p-6 min-h-[600px]">
                  {/* Page Header */}
                  <div className="border-b-4 border-blue-500 pb-4 mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Page {currentPage}
                    </h3>
                  </div>

                  {/* Photo Section */}
                  {allPages[currentPage].photoUrl && (
                    <div className="mb-6">
                      <img
                        src={allPages[currentPage].photoUrl}
                        alt={`Page ${currentPage} photo`}
                        className="w-full h-64 object-cover rounded-lg border-4 border-yellow-400"
                      />
                    </div>
                  )}

                  {/* Caption */}
                  {allPages[currentPage].caption && (
                    <div className="mb-4">
                      <div className="bg-yellow-200 border-4 border-black rounded-lg p-4 relative">
                        <p className="text-xl font-bold text-gray-900">
                          "{allPages[currentPage].caption}"
                        </p>
                        {/* Speech bubble tail */}
                        <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-black"></div>
                        <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-yellow-200"></div>
                      </div>
                    </div>
                  )}

                  {/* Story */}
                  {allPages[currentPage].story && (
                    <div className="bg-blue-50 border-4 border-blue-300 rounded-lg p-4">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {allPages[currentPage].story}
                      </p>
                    </div>
                  )}

                  {/* Comic-style elements */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-red-400 rounded-full opacity-50"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-green-400 rotate-45 opacity-40"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-2">Ready to order?</h3>
            <p className="mb-4 opacity-80">Your comic will be professionally printed and shipped worldwide!</p>
            <Button
              onClick={onProceedToCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-xl py-3"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Order Your Comic - $29.99
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicPreview;
