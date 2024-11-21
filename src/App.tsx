import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ImageIcon } from 'lucide-react';
import { ImageGeneratorForm } from './components/ImageGeneratorForm';
import { GeneratedImage } from './components/GeneratedImage';

interface FormData {
  ref_image: string;
  prompt: string;
  width: number;
  height: number;
  steps: number;
  seed: number;
  model: string;
  similarity: number;
}

const API_URL = 'https://api.aimlapi.com/images/generations';

function App() {
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    ref_image: '',
    prompt: '',
    width: 1024,
    height: 1024,
    steps: 25,
    seed: 37,
    model: 'flux/schnell',
    similarity: 5
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: name === 'width' || name === 'height' || name === 'steps' || name === 'seed' || name === 'similarity'
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Sending request with data:', formData);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          width: Number(formData.width),
          height: Number(formData.height),
          steps: Number(formData.steps),
          seed: Number(formData.seed),
          similarity: Number(formData.similarity) / 10 // Convert 0-10 scale to 0-1 for API
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.images && data.images[0]?.url) {
        setGeneratedImage(data.images[0].url);
        toast.success('Image generated successfully!');
      } else {
        toast.error(data.message || 'Failed to generate image');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while generating the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#112240] rounded-lg shadow-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-blue-400">Flux Image Generator</h1>
          </div>

          <ImageGeneratorForm
            formData={formData}
            loading={loading}
            onSubmit={handleSubmit}
            onChange={handleInputChange}
          />
        </div>

        {generatedImage && <GeneratedImage imageUrl={generatedImage} />}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
