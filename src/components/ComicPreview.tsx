import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ComicPage {
  id: string;
  photo: File;
  photoUrl: string;
  caption: string;
  story: string;
  isCover: boolean;
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
}

const ComicPreview = ({ title, summary, pages, characters }: ComicPreviewProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Comic Preview</h2>
        <p className="text-blue-200">Here's how your comic will look!</p>
      </div>

      {/* Cover Page */}
      <Card className="bg-white border-8 border-yellow-400 transform rotate-1">
        <CardContent className="p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-700 mb-6">{summary}</p>
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white font-bold text-2xl">COMIC</span>
          </div>
        </CardContent>
      </Card>

      {/* Comic Pages */}
      <div className="grid md:grid-cols-2 gap-6">
        {pages.map((page, index) => (
          <Card key={page.id} className="bg-white border-4 border-blue-300 transform hover:scale-105 transition-all">
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Page {index + 1}</h3>
              </div>
              
              {/* Photo */}
              {page.photoUrl && (
                <div className="mb-4">
                  <img
                    src={page.photoUrl}
                    alt={`Page ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                  />
                </div>
              )}

              {/* Caption */}
              {page.caption && (
                <div className="bg-yellow-200 border-2 border-yellow-400 rounded-lg p-3 mb-3 transform -rotate-1">
                  <p className="text-gray-900 font-semibold text-center">{page.caption}</p>
                </div>
              )}

              {/* Story */}
              {page.story && (
                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3 transform rotate-1">
                  <p className="text-gray-800 text-sm">{page.story}</p>
                </div>
              )}
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
  );
};

export default ComicPreview;
