import React from 'react';
import { Loader2 } from 'lucide-react';
import { FormInput } from './FormInput';
import { RangeInput } from './RangeInput';

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

interface ImageGeneratorFormProps {
  formData: FormData;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ImageGeneratorForm({ formData, loading, onSubmit, onChange }: ImageGeneratorFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormInput
        label="Reference Image URL"
        name="ref_image"
        value={formData.ref_image}
        onChange={onChange}
        placeholder="https://example.com/image.jpg"
        required={formData.similarity > 0}
        hint={formData.similarity > 0 ? "Required when similarity is enabled" : undefined}
      />

      <div>
        <label className="block text-sm font-medium mb-2">Image Generation Prompt</label>
        <textarea
          name="prompt"
          value={formData.prompt}
          onChange={onChange}
          className="w-full px-4 py-2 bg-[#1e293b] border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
          placeholder="Describe the image you want to generate..."
          required
        />
      </div>

      <RangeInput
        label="Similarity to Reference"
        name="similarity"
        value={formData.similarity}
        onChange={onChange}
        min={0}
        max={10}
        hint={formData.ref_image ? "0 = Minimal similarity, 10 = Almost identical" : "Reference image required for similarity"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Width"
          name="width"
          type="number"
          value={formData.width}
          onChange={onChange}
          hint="Default: 1024px"
        />

        <FormInput
          label="Height"
          name="height"
          type="number"
          value={formData.height}
          onChange={onChange}
          hint="Default: 1024px"
        />

        <FormInput
          label="Steps"
          name="steps"
          type="number"
          value={formData.steps}
          onChange={onChange}
          hint="Default: 25 steps"
        />

        <FormInput
          label="Seed"
          name="seed"
          type="number"
          value={formData.seed}
          onChange={onChange}
          hint="Default: 37"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Model Selection</label>
        <select
          name="model"
          value={formData.model}
          onChange={onChange}
          className="w-full px-4 py-2 bg-[#1e293b] border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="flux/schnell">FLUX.1 [schnell]</option>
          <option value="flux-realism">FLUX Realism LoRA</option>
          <option value="flux/dev">FLUX.1 [dev]</option>
          <option value="flux-pro">FLUX.1 [pro]</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || (formData.similarity > 0 && !formData.ref_image)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Image'
        )}
      </button>
    </form>
  );
}
