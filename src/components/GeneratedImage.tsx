import React from 'react';

interface GeneratedImageProps {
  imageUrl: string;
}

export function GeneratedImage({ imageUrl }: GeneratedImageProps) {
  return (
    <div className="bg-[#112240] rounded-lg shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-400">Generated Image</h2>
      <img
        src={imageUrl}
        alt="Generated"
        className="w-full rounded-lg shadow-lg"
      />
    </div>
  );
}