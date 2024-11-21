import React from 'react';

interface RangeInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  hint?: string;
}

export function RangeInput({
  label,
  name,
  value,
  onChange,
  min,
  max,
  hint
}: RangeInputProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium">{label}</label>
        <span className="text-sm text-gray-400">{value}</span>
      </div>
      <input
        type="range"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step="1"
        className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}