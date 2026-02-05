import Link from "next/link";
import tests from "../../dethi/english/p1";

export default function QuizListPage() {
  return (
    <div className="max-w-xl mx-auto p-6 mt-8">
      <h1 className="text-2xl font-semibold mb-4">Danh sách đề</h1>

      {Object.values(tests).map((t: any) => (
        <Link
          key={t.id}
          href={`/english/${t.id}`}
          className="block p-3 border rounded-md mb-2 hover:bg-gray-50"
        >
          {t.title}
        </Link>
      ))}
    </div>
  );
}
