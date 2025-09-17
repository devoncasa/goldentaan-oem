import React, { useState, useEffect } from 'react';

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
  const [inputValue, setInputValue] = useState(value.toString());
  const [isInvalid, setIsInvalid] = useState(false);

  // Effect to sync internal state when parent value changes
  useEffect(() => {
    // Only update if the parent value is different from the current input value
    // This prevents the cursor from jumping while typing
    if (Number(inputValue) !== value) {
        setInputValue(value.toString());
    }
    const numValue = Number(value);
    setIsInvalid(numValue < min || numValue > max);
  }, [value, min, max]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    const numValue = parseFloat(rawValue);
    
    if (!isNaN(numValue)) {
        setIsInvalid(numValue < min || numValue > max);
        // Propagate changes to the parent to update calculations and the slider in real-time
        onChange(numValue); 
    } else {
        // Handle cases where input is not a number (e.g., empty string)
        setIsInvalid(true);
    }
  };
  
  // Special handler for the range slider
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(e.target.value);
      setInputValue(numValue.toString());
      setIsInvalid(false); // Range slider is always considered valid
      onChange(numValue);
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let numValue = parseFloat(e.target.value);

    // If not a valid number, revert to the last known good value from props.
    if (isNaN(numValue)) {
      numValue = value;
    }

    // Clamp the value to min/max
    if (numValue < min) {
      numValue = min;
    } else if (numValue > max) {
      numValue = max;
    }
    
    // Finalize the state change and notify the parent
    setInputValue(numValue.toString());
    setIsInvalid(false);
    // This ensures the parent state is correctly clamped if the user leaves an invalid value.
    if (value !== numValue) {
        onChange(numValue);
    }
  };

  const borderColorClass = isInvalid ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300';

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
          value={value} // Range slider is always driven by the valid parent state
          onChange={handleRangeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className={`flex items-center gap-2 border rounded-md px-2 py-1 shadow-sm w-32 bg-white transition-colors duration-200 ${borderColorClass}`}>
          <input
            type="number"
            // We don't set min/max here to allow temporary out-of-range user input for feedback
            step={step}
            value={inputValue} // Use internal state for the text input to allow flexible typing
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