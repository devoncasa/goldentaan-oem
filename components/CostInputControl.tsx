import React from 'react';

interface CostInputControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (value: number) => void;
}

const CostInputControl: React.FC<CostInputControlProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let numValue = Number(e.target.value);
    if (numValue < min) {
      numValue = min;
    } else if (numValue > max) {
      numValue = max;
    }
    onChange(numValue);
  };

  return (
    <div>
      <label htmlFor={label} className="font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-4 mt-1">
        <input
          type="range"
          id={label}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 shadow-sm w-32 bg-white">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full text-right outline-none bg-transparent"
          />
          <span className="font-bold text-gray-600">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default CostInputControl;
