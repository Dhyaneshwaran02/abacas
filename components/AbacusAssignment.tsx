'use client';
import { useState, useEffect } from "react";

const AbacusAssignment = () => {
  const [numQuestions, setNumQuestions] = useState<number>(0);
  const [questions] = useState<string[][]>([]);
  const [currentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    // Any client-side code that needs to run
  }, []);

  const handleSetNumQuestions = (value: string) => {
    const num = parseInt(value.trim(), 10);
    if (isNaN(num) || num <= 0) {
      alert("Please enter a valid number of questions.");
      return;
    }
    setNumQuestions(num);
    const questionSetup = document.getElementById("question-setup");
    if (questionSetup) questionSetup.style.display = "block";
  };

  const handleSetTimeInterval = (value: string) => {
    const time = parseInt(value, 10);
    if (isNaN(time) || time <= 0) {
      alert("Please enter a valid time interval.");
      return;
    }
    renderQuestionInputForms();
  };

  const renderQuestionInputForms = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const questionsInput = document.getElementById("questions-input");
    if (!questionsInput) return;

    questionsInput.innerHTML = "";
    for (let i = 0; i < numQuestions; i++) {
      const questionLetter = String.fromCharCode(65 + i);
      questionsInput.innerHTML += `
        <div>
          <h4 class='text-lg font-bold'>Question ${questionLetter}</h4>
          <div id="sequences-${i}" class="space-y-2">
            <input type="text" id="operation-${i}-0" placeholder="Enter operation (e.g., *2, +5)" class="border rounded px-3 py-2 w-full" />
          </div>
          <button onclick="addSequence(${i})" class="bg-blue-500 text-white px-3 py-1 rounded">Add Sequence</button>
        </div>
      `;
    }
    questionsInput.innerHTML += `<button onclick="saveQuestions()" class="bg-green-500 text-white px-4 py-2 rounded mt-4">Save Questions</button>`;
  };

  const showAnswer = () => {
    const sequences = questions[currentQuestionIndex];
    let result = 0;
    try {
      sequences.forEach((operation) => {
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
      document.getElementById("answer-box")!.textContent = `Answer: ${result}`;
    } catch (err) {
      alert(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <div className="bg-gray-100 p-6 flex flex-col items-center min-h-screen">
      <div id="setup" className="space-y-4">
        <NumberOfQuestionsInput handleSetNumQuestions={handleSetNumQuestions} />
        <QuestionSetupSection handleSetTimeInterval={handleSetTimeInterval} />
      </div>

      {/* Assignment Section */}
      <div id="assignment" className="hidden">
        <h2 className="text-xl font-bold mb-4">Assignment</h2>
        <div id="question-box" className="text-center text-7xl font-bold text-gray-700 mb-4"></div>
        <div id="answer-box" className="text-center text-7xl font-bold text-green-700 mb-4"></div>
        <div className="flex justify-around">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={showAnswer}>Show Answer</button>
          <button className="bg-gray-300 px-4 py-2 rounded">Repeat</button>
          <button className="bg-gray-300 px-4 py-2 rounded">Previous</button>
          <button className="bg-gray-300 px-4 py-2 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AbacusAssignment;

// Number of Questions Input Component
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

// Question Setup Section Component
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