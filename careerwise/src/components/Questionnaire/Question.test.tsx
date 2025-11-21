import React, { useState } from 'react';
import Question from './Question';
import questionsData from '../../data/questions.json';
import '../../styles/Questionnaire.css';

interface QuestionType {
  id: number;
  question: string;
  options: string[];
}

const Questionnaire: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleSelect = (id: number, option: string) => {
    setAnswers(prev => ({ ...prev, [id]: option }));
  };

  const handleSubmit = () => {
    console.log(answers);
    // send this to backend or use it for mentor matching
  };

  return (
    <>
      {/* Header Ribbon */}
      <div className="header-ribbon">
        <span>CareerWise</span>
        <button className="questionnaire-button">Questionnaire</button>
      </div>

      {/* Questionnaire Content */}
      <div className="questionnaire-container">
        <h2>CareerWise Job Interest Questionnaire</h2>
        {questionsData.map((q: QuestionType) => (
          <Question
            key={q.id}
            question={q.question}
            options={q.options}
            selectedOption={answers[q.id] || null}
            onSelect={(option: string) => { handleSelect(q.id, option); }}
          />
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Questionnaire;
