'use client';
import { useState, useEffect } from "react";

const AbacusAssignment = () => {
  const [numQuestions, setNumQuestions] = useState<number>(0);
  const [questions, setQuestions] = useState<string[][]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionInputs, setQuestionInputs] = useState<JSX.Element[]>([]);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (numQuestions > 0) {
      renderQuestionInputForms();
    }
  }, [numQuestions]);

  const handleSetNumQuestions = (value: string) => {
    const num = parseInt(value.trim(), 10);
    if (isNaN(num) || num <= 0) {
      alert("Please enter a valid number of questions.");
      return;
    }
    setNumQuestions(num);
  };

  const handleSetTimeInterval = (value: string) => {
    const time = parseInt(value, 10);
    if (isNaN(time) || time <= 0) {
      alert("Please enter a valid time interval.");
      return;
    }
  };

  const renderQuestionInputForms = () => {
    const inputs = Array.from({ length: numQuestions }, (_, i) => (
      <div key={i}>
        <h4 className="text-lg font-bold">Question {String.fromCharCode(65 + i)}</h4>
        <input
          type="text"
          placeholder="Enter operation (e.g., *2, +5)"
          className="border rounded px-3 py-2 w-full"
          onChange={(e) => updateQuestion(i, e.target.value)}
        />
      </div>
    ));
    setQuestionInputs(inputs);
  };

  const updateQuestion = (index: number, value: string) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[index] = value.split(",");
      return newQuestions;
    });
  };

  const showAnswer = () => {
    if (!questions[currentQuestionIndex]) return;
    let result = 0;

    try {
      questions[currentQuestionIndex].forEach((operation) => {
        const operator = operation[0];
        const value = parseFloat(operation.slice(1));

        switch (operator) {
          case "+":
            result += value;
            break;
          case "-":
            result -= value;
            break;
          case "*":
            result *= value;
            break;
          case "/":
            result /= value;
            break;
          default:
            throw new Error("Invalid operator.");
        }
      });
      setAnswer(`Answer: ${result}`);
    } catch (err) {
      alert(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <div className="bg-gray-100 p-6 flex flex-col items-center min-h-screen">
      <div className="space-y-4">
        <NumberOfQuestionsInput handleSetNumQuestions={handleSetNumQuestions} />
        <QuestionSetupSection handleSetTimeInterval={handleSetTimeInterval} />
      </div>

      {/* Question Input Forms */}
      <div>{questionInputs}</div>

      {/* Assignment Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Assignment</h2>
        <div className="text-center text-7xl font-bold text-gray-700 mb-4">{answer}</div>
        <div className="flex justify-around">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={showAnswer}>Show Answer</button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}>Previous</button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, numQuestions - 1))}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AbacusAssignment;

const NumberOfQuestionsInput = ({ handleSetNumQuestions }: { handleSetNumQuestions: (value: string) => void }) => (
  <div>
    <label className="block text-sm font-medium">Number of Questions:</label>
    <input
      type="number"
      className="border rounded px-3 py-2 w-full"
      onChange={(e) => handleSetNumQuestions(e.target.value)}
    />
  </div>
);

const QuestionSetupSection = ({ handleSetTimeInterval }: { handleSetTimeInterval: (value: string) => void }) => (
  <div>
    <label className="block text-sm font-medium">Time Interval (seconds):</label>
    <input
      type="number"
      className="border rounded px-3 py-2 w-full"
      onChange={(e) => handleSetTimeInterval(e.target.value)}
    />
  </div>
);
