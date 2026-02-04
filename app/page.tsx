'use client';
import { useState } from "react";

export default function Home() {
  const data = [
    [
      {
        question: "1. A person calls a friend about his new car. How much does the small car cost him?",
        options: ["3250 pounds", "3550 pounds", "4250 pounds"],
        answer: 0
      },
      {
        question: "2. Two people are talking about meeting for dinner. What time does Ahmed meet Rose?",
        options: ["half past seven", "quarter past seven", "quarter to eight"],
        answer: 2
      },
      {
        question: "3. A man calls the teleshop. What is the teleshop number?",
        options: ["102030", "201030", "301020"],
        answer: 1
      }
      // ... các câu còn lại
    ]
  ];

  const questions = data[0];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index) => {
    if (showResult) return; // không cho đổi đáp án
    setSelected(index);
    setShowResult(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowResult(false);
    setCurrent(current + 1);
  };

  const getOptionStyle = (index) => {
    if (!showResult) return "hover:bg-gray-100";

    if (index === questions[current].answer) {
      return "bg-green-100 border-green-500 text-green-700";
    }

    if (index === selected) {
      return "bg-red-100 border-red-500 text-red-700";
    }

    return "opacity-60";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-xl">
        {current < questions.length ? (
          <>
            <p className="text-sm text-gray-500 mb-2">
              Câu {current + 1}/{questions.length}
            </p>

            <h2 className="text-lg font-semibold mb-4">
              {questions[current].question}
            </h2>

            <ul className="space-y-2">
              {questions[current].options.map((opt, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`p-3 border rounded cursor-pointer ${getOptionStyle(
                    index
                  )}`}
                >
                  {opt}
                </li>
              ))}
            </ul>

            {showResult && (
              <p className="mt-3 font-semibold">
                {selected === questions[current].answer ? (
                  <span className="text-green-600">✔ Đúng</span>
                ) : (
                  <span className="text-red-600">✘ Sai</span>
                )}
              </p>
            )}

            <button
              onClick={nextQuestion}
              disabled={!showResult}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
            >
              Câu tiếp theo
            </button>
          </>
        ) : (
          <p className="text-center text-lg font-semibold text-green-600">
            🎉 Hoàn thành bài trắc nghiệm!
          </p>
        )}
      </div>
    </div>
  );
}
