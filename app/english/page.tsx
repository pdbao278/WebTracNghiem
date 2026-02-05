import Link from "next/link";
import tests from "../../dethi/english/p1";

export default function QuizListPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-8 min-h-176">
      <h1 className="text-2xl font-semibold mb-6">Danh sách đề</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.values(tests).map((t: any, index) => (
          <Link
            key={t.id}
            href={`/english/${t.id}`}
            className="
              p-4 border rounded-lg text-center font-medium
              bg-blue-100
              hover:bg-indigo-100 hover:scale-105 transition-transform
            "
          >
            {t.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
