import React from 'react';

interface QuestionProps {
  question: string;
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, selectedOption, onSelect }) => {
  return (
    <div className="question-block">
      <h3>{question}</h3>
      {options.map((option, index) => (
        <label key={index} className="option-label">
          <input
            type="radio"
            name={question}
            value={option}
            checked={selectedOption === option}
            onChange={() => { onSelect(option); }}
            aria-label={option}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Question;
