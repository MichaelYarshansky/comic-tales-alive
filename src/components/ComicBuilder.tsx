
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Upload, X, Eye, CreditCard } from 'lucide-react';
import PhotoUpload from '@/components/PhotoUpload';
import ComicPreview from '@/components/ComicPreview';

interface ComicBuilderProps {
  onBack: () => void;
}

interface ComicPage {
  id: string;
  photo: File | null;
  photoUrl: string;
  caption: string;
  story: string;
}

const ComicBuilder = ({ onBack }: ComicBuilderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pageCount, setPageCount] = useState(8);
  const [coverTitle, setCoverTitle] = useState('');
  const [coverSummary, setCoverSummary] = useState('');
  const [pages, setPages] = useState<ComicPage[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const steps = [
    { id: 1, title: 'Comic Details', desc: 'Choose pages & title' },
    { id: 2, title: 'Add Photos', desc: 'Upload your memories' },
    { id: 3, title: 'Preview', desc: 'Review your comic' },
    { id: 4, title: 'Checkout', desc: 'Complete your order' }
  ];

  const initializePages = (count: number) => {
    const newPages: ComicPage[] = [];
    for (let i = 0; i < count; i++) {
      newPages.push({
        id: `page-${i}`,
        photo: null,
        photoUrl: '',
        caption: '',
        story: ''
      });
    }
    setPages(newPages);
  };

  const updatePage = (pageId: string, updates: Partial<ComicPage>) => {
    setPages(prev => prev.map(page => 
      page.id === pageId ? { ...page, ...updates } : page
    ));
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
        pages={pages}
        coverTitle={coverTitle}
        coverSummary={coverSummary}
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
            <h1 className="text-3xl font-bold text-gray-900">Comic Builder</h1>
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
                <CardTitle className="text-2xl">Let's Create Your Comic!</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      How many pages do you want?
                    </label>
                    <div className="flex gap-3">
                      {[4, 8, 12, 16].map(count => (
                        <Button
                          key={count}
                          onClick={() => setPageCount(count)}
                          variant={pageCount === count ? "default" : "outline"}
                          className={`text-lg px-6 py-3 ${
                            pageCount === count ? 'bg-blue-500' : ''
                          }`}
                        >
                          {count} pages
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      Comic Title
                    </label>
                    <Input
                      value={coverTitle}
                      onChange={(e) => setCoverTitle(e.target.value)}
                      placeholder="e.g., My Amazing Adventure"
                      className="text-lg p-4 border-2"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      Cover Summary
                    </label>
                    <Textarea
                      value={coverSummary}
                      onChange={(e) => setCoverSummary(e.target.value)}
                      placeholder="Write a short description of your story..."
                      rows={4}
                      className="text-lg p-4 border-2"
                    />
                  </div>

                  <Button 
                    onClick={handleStepComplete}
                    disabled={!coverTitle || !coverSummary}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-xl py-4"
                  >
                    Continue to Photos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Add Your Photos & Stories</h2>
                <p className="text-lg text-gray-600">Upload photos and add captions to bring your comic to life!</p>
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
                            <label className="block font-semibold text-gray-700 mb-2">Caption</label>
                            <Input
                              value={page.caption}
                              onChange={(e) => updatePage(page.id, { caption: e.target.value })}
                              placeholder="Add a fun caption..."
                              className="border-2"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-gray-700 mb-2">Story</label>
                            <Textarea
                              value={page.story}
                              onChange={(e) => updatePage(page.id, { story: e.target.value })}
                              placeholder="Tell the story behind this moment..."
                              rows={3}
                              className="border-2"
                            />
                          </div>
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
                <CardTitle className="text-2xl">Complete Your Order</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="bg-yellow-100 p-6 rounded-lg border-2 border-yellow-400">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Summary</h3>
                    <p className="text-lg">"{coverTitle}" - {pageCount} pages</p>
                    <p className="text-3xl font-bold text-green-600 mt-4">$29.99</p>
                    <p className="text-sm text-gray-600">Including worldwide shipping</p>
                  </div>

                  <Button className="w-full bg-red-500 hover:bg-red-600 text-xl py-4">
                    <CreditCard className="mr-2 h-6 w-6" />
                    Proceed to Payment
                  </Button>

                  <p className="text-sm text-gray-600">
                    Your comic will be professionally printed and shipped to your address within 7-10 business days.
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
