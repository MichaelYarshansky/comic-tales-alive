import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Upload, X, Eye, CreditCard, Loader2 } from 'lucide-react';
import PhotoUpload from '@/components/PhotoUpload';
import ComicPreview from '@/components/ComicPreview';
import { generateComicImage, generateComicStory, fileToBase64 } from '@/utils/chatgptApi';
import { useToast } from '@/hooks/use-toast';

interface ComicBuilderProps {
  onBack: () => void;
}

interface ComicPage {
  id: string;
  title: string;
  photo: File | null;
  photoUrl: string;
  description: string;
  generatedStory: string;
  generatedImageUrl: string; // New field for AI-generated comic image
}

const ComicBuilder = ({ onBack }: ComicBuilderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pageCount, setPageCount] = useState(8);
  const [comicTitle, setComicTitle] = useState('');
  const [pages, setPages] = useState<ComicPage[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [generatingStory, setGeneratingStory] = useState<string | null>(null);
  const [generatingImage, setGeneratingImage] = useState<string | null>(null);
  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'Comic Setup', desc: 'Choose pages & title' },
    { id: 2, title: 'Create Pages', desc: 'Add your content' },
    { id: 3, title: 'Preview', desc: 'Review your comic' },
    { id: 4, title: 'Checkout', desc: 'Complete your order' }
  ];

  const initializePages = (count: number) => {
    const newPages: ComicPage[] = [];
    for (let i = 0; i < count; i++) {
      newPages.push({
        id: `page-${i}`,
        title: '',
        photo: null,
        photoUrl: '',
        description: '',
        generatedStory: '',
        generatedImageUrl: '' // Initialize new field
      });
    }
    setPages(newPages);
  };

  const updatePage = (pageId: string, updates: Partial<ComicPage>) => {
    setPages(prev => prev.map(page => 
      page.id === pageId ? { ...page, ...updates } : page
    ));
  };

  const generateComicImageWithAI = async (pageId: string, description: string, title: string, photo?: File) => {
    if (!description.trim()) return;

    setGeneratingImage(pageId);
    
    try {
      let imageBase64;
      if (photo) {
        imageBase64 = await fileToBase64(photo);
      }

      const generatedImageUrl = await generateComicImage(description, title, imageBase64);
      updatePage(pageId, { generatedImageUrl });
      
      toast({
        title: "Comic Image Generated!",
        description: "Your comic-style image has been created using AI.",
      });
    } catch (error) {
      console.error('Error generating comic image:', error);
      toast({
        title: "Error",
        description: "Failed to generate comic image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingImage(null);
    }
  };

  const generateStoryWithAI = async (pageId: string, description: string, title: string, photo?: File) => {
    if (!description.trim()) return;

    setGeneratingStory(pageId);
    
    try {
      let imageBase64;
      if (photo) {
        imageBase64 = await fileToBase64(photo);
      }

      const generatedStory = await generateComicStory(description, title, imageBase64);
      updatePage(pageId, { generatedStory });
      
      toast({
        title: "Story Generated!",
        description: "Your comic story has been created using AI.",
      });
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        title: "Error",
        description: "Failed to generate story. Using fallback content.",
        variant: "destructive",
      });
      
      const fallbackStory = `In this exciting moment titled "${title}", ${description}. The adventure continues as our hero faces new challenges and discovers amazing things along the way!`;
      updatePage(pageId, { generatedStory: fallbackStory });
    } finally {
      setGeneratingStory(null);
    }
  };

  const handleStepComplete = () => {
    if (currentStep === 1) {
      initializePages(pageCount);
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (showPreview) {
    return (
      <ComicPreview 
        title={comicTitle}
        summary={`A ${pageCount}-page comic adventure`}
        pages={pages}
        characters={[]}
        onBack={() => setShowPreview(false)}
        onProceedToCheckout={() => setCurrentStep(4)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="outline" className="border-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">KEEPICS Builder</h1>
            <Button 
              onClick={() => setShowPreview(true)}
              disabled={pages.length === 0}
              className="bg-green-500 hover:bg-green-600"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                currentStep >= step.id 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-500'
              }`}>
                {step.id}
              </div>
              <div className="ml-3 text-center">
                <div className={`font-semibold ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </div>
                <div className="text-sm text-gray-500">{step.desc}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-6 ${
                  currentStep > step.id ? 'bg-blue-500' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <Card className="border-4 border-blue-300">
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="text-2xl">Create Your KEEPICS Comic!</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      How many pages do you want?
                    </label>
                    <div className="flex gap-3">
                      {[1, 4, 8, 12, 16].map(count => (
                        <Button
                          key={count}
                          onClick={() => setPageCount(count)}
                          variant={pageCount === count ? "default" : "outline"}
                          className={`text-lg px-6 py-3 ${
                            pageCount === count ? 'bg-blue-500' : ''
                          }`}
                        >
                          {count} page{count > 1 ? 's' : ''}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      Comic Title
                    </label>
                    <Input
                      value={comicTitle}
                      onChange={(e) => setComicTitle(e.target.value)}
                      placeholder="e.g., My Amazing Adventure"
                      className="text-lg p-4 border-2"
                    />
                  </div>

                  <Button 
                    onClick={handleStepComplete}
                    disabled={!comicTitle}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-xl py-4"
                  >
                    Continue to Create Pages
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Comic Pages</h2>
                <p className="text-lg text-gray-600">Add images, titles, and descriptions for each page!</p>
                <p className="text-sm text-blue-600 mt-2">✨ AI will generate comic-style images and stories from your content</p>
              </div>

              <div className="grid gap-6">
                {pages.map((page, index) => (
                  <Card key={page.id} className="border-4 border-yellow-300">
                    <CardHeader className="bg-yellow-400">
                      <CardTitle className="text-xl">Page {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <PhotoUpload
                          onPhotoSelect={(file, url) => updatePage(page.id, { photo: file, photoUrl: url })}
                          currentPhoto={page.photoUrl}
                        />
                        <div className="space-y-4">
                          <div>
                            <label className="block font-semibold text-gray-700 mb-2">Page Title</label>
                            <Input
                              value={page.title}
                              onChange={(e) => updatePage(page.id, { title: e.target.value })}
                              placeholder="Add a title for this page..."
                              className="border-2"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-gray-700 mb-2">Description</label>
                            <Textarea
                              value={page.description}
                              onChange={(e) => updatePage(page.id, { description: e.target.value })}
                              placeholder="Describe what's happening in this image..."
                              rows={3}
                              className="border-2"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              onClick={() => generateComicImageWithAI(page.id, page.description, page.title, page.photo)}
                              disabled={!page.description.trim() || generatingImage === page.id}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              {generatingImage === page.id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  🎨 Generate Comic Image
                                </>
                              )}
                            </Button>
                            <Button
                              onClick={() => generateStoryWithAI(page.id, page.description, page.title, page.photo)}
                              disabled={!page.description.trim() || generatingStory === page.id}
                              className="bg-purple-500 hover:bg-purple-600"
                            >
                              {generatingStory === page.id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  ✨ Generate Story
                                </>
                              )}
                            </Button>
                          </div>
                          {page.generatedImageUrl && (
                            <div className="bg-red-50 p-3 rounded border-2 border-red-200">
                              <label className="block font-semibold text-red-700 mb-1">Generated Comic Image:</label>
                              <img src={page.generatedImageUrl} alt="Generated comic" className="w-full h-32 object-cover rounded" />
                            </div>
                          )}
                          {page.generatedStory && (
                            <div className="bg-blue-50 p-3 rounded border-2 border-blue-200">
                              <label className="block font-semibold text-blue-700 mb-1">Generated Story:</label>
                              <p className="text-sm text-blue-800">{page.generatedStory}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button 
                onClick={handleStepComplete}
                className="w-full bg-green-500 hover:bg-green-600 text-xl py-4"
              >
                Continue to Preview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <Card className="border-4 border-green-300">
              <CardHeader className="bg-green-500 text-white">
                <CardTitle className="text-2xl">Complete Your KEEPICS Order</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="bg-yellow-100 p-6 rounded-lg border-2 border-yellow-400">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Summary</h3>
                    <p className="text-lg">"{comicTitle}" - {pageCount} pages</p>
                    <p className="text-3xl font-bold text-green-600 mt-4">$29.99</p>
                    <p className="text-sm text-gray-600">Including worldwide shipping</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Bulk Discounts Available!</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• Buy 2 comics → 5% off</p>
                      <p>• Buy 3 comics → 10% off</p>
                      <p>• Buy 4+ comics → 20% off</p>
                    </div>
                  </div>

                  <Button className="w-full bg-red-500 hover:bg-red-600 text-xl py-4">
                    <CreditCard className="mr-2 h-6 w-6" />
                    Proceed to Payment
                  </Button>

                  <p className="text-sm text-gray-600">
                    Your KEEPICS comic will be delivered as a high-quality PDF within minutes!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComicBuilder;
