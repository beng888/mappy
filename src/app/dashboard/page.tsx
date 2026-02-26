"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await authClient.getSession();
      if (data) {
        setSession(data as Session);
      } else {
        router.push("/login");
      }
      setLoading(false);
    };
    getSession();
  }, [router]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome, {session.user.name || session.user.email}!
          </h2>
          {session.user.image && (
            <img src={session.user.image} alt="Profile" className="mt-4 h-20 w-20 rounded-full" />
          )}
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {session.user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">User ID:</span> {session.user.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
