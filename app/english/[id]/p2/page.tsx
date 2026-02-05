"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import tests from "../../../../dethi/english/p2";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function QuizPage({ params }: PageProps) {
  const router = useRouter();

  // 🔹 LẤY ID TRƯỚC
  const { id } = use(params);
  const test = tests[id];

  // 🔹 DANH SÁCH ĐỀ
  const testIds = Object.keys(tests)
    .map(Number)
    .filter((tid) => tid <= 13)
    .sort((a, b) => a - b)
    .map(String);

  const currentIndex = testIds.indexOf(id);
  const prevId = currentIndex > 0 ? testIds[currentIndex - 1] : null;
  const nextId =
    currentIndex < testIds.length - 1 ? testIds[currentIndex + 1] : null;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // ❌ KHÔNG TÌM THẤY ĐỀ
  if (!test) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-8">
        <div className="bg-red-100 p-6 rounded-lg">
          ❌ Không tìm thấy đề thi
        </div>
      </div>
    );
  }

  const handleChange = (qId: number, optId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const handleSubmit = () => setSubmitted(true);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  // 🔢 TÍNH ĐIỂM
  const score = test.questions.reduce((acc: number, q: any) => {
    const selected = answers[q.id];
    const correctOpt = q.options.find((opt: any) => opt.isCorrect)?.id;
    return acc + (selected === correctOpt ? 1 : 0);
  }, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8">
      <div className="dark:bg-gray-800/80 shadow-md rounded-lg p-6 bg-amber-100">
        <h1 className="text-2xl font-semibold mb-4">{test.title} Q16-Q17</h1>

        {test.questions.map((q: any, index: number) => (
          <div key={q.id} className="mb-6">
            <p className="mb-2">
              <b className="mr-2">Câu {index + 1}:</b> {q.question}
            </p>

            <div className="space-y-2">
              {q.options.map((opt: any) => {
                const isSelected = answers[q.id] === opt.id;
                const isCorrect = submitted && opt.isCorrect;
                const isWrongSelected =
                  submitted && isSelected && !opt.isCorrect;

                const base =
                  "flex items-center gap-3 p-3 rounded-md border";
                const correctBg = isCorrect
                  ? "bg-green-50 border-green-200"
                  : isWrongSelected
                  ? "bg-red-50 border-red-200"
                  : "bg-white dark:bg-gray-800";
                const selectedRing = isSelected
                  ? "ring-2 ring-indigo-300"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700";

                return (
                  <label
                    key={opt.id}
                    className={`${base} ${correctBg} ${selectedRing}`}
                  >
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      checked={isSelected}
                      onChange={() => handleChange(q.id, opt.id)}
                      disabled={submitted}
                      className="accent-indigo-600"
                    />
                    <span className="text-sm">
                      {opt.id}. {opt.text}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* 🔘 BUTTONS */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
          >
            Nộp bài
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 border rounded-md"
          >
            Làm lại
          </button>

          {prevId && (
            <button
              onClick={() => router.push(`/english/${prevId}`)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              ⬅ Bài trước
            </button>
          )}

          {nextId && (
            <button
              onClick={() => router.push(`/english/${nextId}`)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Bài tiếp theo ➡
            </button>
          )}

          {submitted && (
            <div className="ml-auto font-medium">
              Điểm: {score} / {test.questions.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
