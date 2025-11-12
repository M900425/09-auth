"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const isSessionValid = await checkSession();
        if (isSessionValid) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
          router.push("/sign-in");
        }
      } catch (err) {
        console.error("Session check failed", err);
        clearIsAuthenticated();
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
