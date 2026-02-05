"use client";

import { useState, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import tests from "../../../../dethi/english/p1";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

// 🔀 Hàm xáo mảng (Fisher–Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizPage({ params }: PageProps) {
  const router = useRouter();

  // 🔹 LẤY ID ĐỀ
  const { id } = use(params);
  const test = tests[id];

  // 🔀 STATE
  const [shuffle, setShuffle] = useState(false);
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

  // 🔹 DANH SÁCH CÂU HỎI (xáo cả câu + đáp án)
  const questions = useMemo(() => {
    if (!shuffle) return test.questions;

    return shuffleArray(test.questions).map((q: any) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  }, [shuffle, test.questions]);

  // 🔘 CHỌN ĐÁP ÁN
  const handleChange = (qId: number, optId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  // 🧾 NỘP BÀI
  const handleSubmit = () => setSubmitted(true);

  // 🔄 LÀM LẠI
  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShuffle(false);
  };

  // 🔢 TÍNH ĐIỂM
  const score = questions.reduce((acc: number, q: any) => {
    const selected = answers[q.id];
    const correctOpt = q.options.find((o: any) => o.isCorrect)?.id;
    return acc + (selected === correctOpt ? 1 : 0);
  }, 0);

  const testIds = Object.keys(tests);
  const currentIndex = testIds.indexOf(id);
  const nextId =currentIndex < testIds.length - 1 ? testIds[currentIndex + 1] : null;

  const preId = currentIndex > 0 ? testIds[currentIndex - 1] : null;
  return (
    <div className="max-w-3xl mx-auto p-6 mt-8">
      <div className="shadow-md rounded-lg p-6 bg-amber-100 dark:bg-gray-800/80">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">
            {test.title} (Q1–Q13)
          </h1>

          {/* 🔀 NÚT XÁO */}
          <button
            onClick={() => setShuffle(!shuffle)}
            disabled={submitted || Object.keys(answers).length > 0}
            className={`px-7 py-2 rounded-md border text-sm transition
              ${shuffle ? "bg-green-500 text-white" : "bg-gray-100"}
              disabled:opacity-50
            `}
          >
            {shuffle ? "Đang xáo câu & đáp án" : "Không xáo"}
          </button>
        </div>

        {/* 📋 CÂU HỎI */}
        {questions.map((q: any, index: number) => (
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
                const bg =
                  isCorrect
                    ? "bg-green-50 border-green-300"
                    : isWrongSelected
                    ? "bg-red-50 border-red-300"
                    : "bg-white dark:bg-gray-800";
                const ring = isSelected
                  ? "ring-2 ring-indigo-300"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700";

                return (
                  <label
                    key={opt.id}
                    className={`${base} ${bg} ${ring}`}
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

        {submitted && (
            <div className="ml-auto font-bold text-lg text-red-500">
              Điểm: {score} / {questions.length}
            </div>
          )}

        {/* 🔘 BUTTONS */}
        <div className="mt-6 flex flex-wrap items-center gap-3 justify-between">
          <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 hover:scale-105 transition-transform"
          >
            Nộp bài
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 border rounded-md hover:scale-105 transition-transform"
          >
            Làm lại
          </button>

        </div >
       <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => nextId && router.push(`/english/${preId}/p1`)}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:scale-105 transition-transform ${preId ? '' : 'opacity-50 cursor-not-allowed'}`}
          >
            Quay lại
          </button>

          <button
            onClick={() => nextId && router.push(`/english/${nextId}/p1`)}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:scale-105 transition-transform ${nextId ? '' : 'opacity-50 cursor-not-allowed'}`}
          >
            Tiếp theo
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
