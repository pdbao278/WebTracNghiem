"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function HomeTest({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  return (
    <div className="flex min-h-screen items-center justify-center ">
        <button
        onClick={() => router.push(`/english/${id}/p1`)}
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mr-3"
      >
        Listening Q1 - Q13
      </button>

      <button
        onClick={() => router.push(`/english/${id}/p2`)}
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Listening Q16 - Q17
      </button>
      </div>
  );
}