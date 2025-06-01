
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard } from 'lucide-react';

interface ComicPage {
  id: string;
  title: string;
  photo: File | null;
  photoUrl: string;
  description: string;
  generatedStory: string;
}

interface ComicPreviewProps {
  title: string;
  summary: string;
  pages: ComicPage[];
  characters: Array<{
    name: string;
    description: string;
    photo?: File;
    photoUrl?: string;
  }>;
  onBack?: () => void;
  onProceedToCheckout?: () => void;
}

const ComicPreview = ({ title, summary, pages, characters, onBack, onProceedToCheckout }: ComicPreviewProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {onBack && (
            <Button onClick={onBack} variant="outline" className="border-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
          )}
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">KEEPICS Preview</h2>
            <p className="text-blue-600">Here's how your comic will look!</p>
          </div>
          {onProceedToCheckout && (
            <Button onClick={onProceedToCheckout} className="bg-green-500 hover:bg-green-600">
              <CreditCard className="mr-2 h-4 w-4" />
              Checkout
            </Button>
          )}
        </div>

        {/* Cover Page */}
        <Card className="bg-white border-8 border-yellow-400 transform rotate-1 shadow-2xl">
          <CardContent className="p-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-700 mb-6">{summary}</p>
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center">
              <span className="text-white font-bold text-xl">KEEPICS</span>
            </div>
          </CardContent>
        </Card>

        {/* Comic Pages */}
        <div className="grid md:grid-cols-2 gap-6">
          {pages.map((page, index) => (
            <Card key={page.id} className="bg-white border-4 border-blue-300 transform hover:scale-105 transition-all shadow-lg">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Page {index + 1}</h3>
                  {page.title && (
                    <h4 className="text-lg font-semibold text-blue-600">{page.title}</h4>
                  )}
                </div>
                
                {/* Main Comic Area */}
                <div className="bg-yellow-50 border-4 border-yellow-300 rounded-lg p-4 mb-4 min-h-64">
                  {/* Original Image - Top Right Corner */}
                  {page.photoUrl && (
                    <div className="float-right ml-3 mb-2">
                      <img
                        src={page.photoUrl}
                        alt={`Original for page ${index + 1}`}
                        className="w-16 h-16 object-cover rounded border-2 border-gray-400"
                      />
                      <p className="text-xs text-gray-500 text-center mt-1">Original</p>
                    </div>
                  )}
                  
                  {/* Generated Story */}
                  {page.generatedStory && (
                    <div className="bg-white border-2 border-gray-300 rounded p-3 shadow-sm">
                      <p className="text-gray-800 text-sm leading-relaxed">{page.generatedStory}</p>
                    </div>
                  )}
                  
                  {/* Description if no generated story */}
                  {!page.generatedStory && page.description && (
                    <div className="bg-blue-100 border-2 border-blue-300 rounded p-3">
                      <p className="text-blue-800 text-sm italic">"{page.description}"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Characters Section */}
        {characters.length > 0 && (
          <Card className="bg-white border-4 border-green-300">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Meet the Characters</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {characters.map((character, index) => (
                  <div key={index} className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    {character.photoUrl && (
                      <img
                        src={character.photoUrl}
                        alt={character.name}
                        className="w-20 h-20 object-cover rounded-full mx-auto mb-2 border-4 border-green-300"
                      />
                    )}
                    <h4 className="font-bold text-gray-900">{character.name}</h4>
                    <p className="text-sm text-gray-700">{character.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ComicPreview;
