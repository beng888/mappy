// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">Welcome to Mappy</h1>
        <p className="mt-6 text-lg text-gray-600">
          Your personal map application with Google OAuth
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="text-lg font-semibold text-gray-900 hover:text-gray-700"
          >
            Dashboard <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
