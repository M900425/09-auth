import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { Session } from "@/types/session";
import { cookies } from "next/headers";
import { api } from "./api";

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<Note[]> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  const { data } = await api.get<Note[]>("/notes", {
    params,
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  const { data } = await api.get<User>("/users/me", {
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  return data;
};

export const checkSession = async (refreshToken: string): Promise<Session | null> => {
  try {
    const { data } = await api.post<Session | null>("/auth/refresh", { refreshToken });
    return data;
  } catch {
    return null;
  }
};
