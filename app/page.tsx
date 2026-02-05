"use client";

import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-center">
        Listening Aptis Tháng 9
      </h1>
      <button
        onClick={() => router.push("/english")}
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
      
        Start Test
      </button>
    </main>
  );
}
