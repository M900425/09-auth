import axios from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const serverApi = (cookies?: string) =>
  axios.create({
    baseURL,
    headers: {
      Cookie: cookies || "",
    },
  });

export const fetchNotes = async (
  cookies?: string,
  params?: {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: string;
  }
): Promise<Note[]> => {
  const { data } = await serverApi(cookies).get<Note[]>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string, cookies?: string): Promise<Note> => {
  const { data } = await serverApi(cookies).get<Note>(`/notes/${id}`);
  return data;
};

export const getMe = async (cookies?: string): Promise<User> => {
  const { data } = await serverApi(cookies).get<User>("/users/me");
  return data;
};

export const checkSession = async (cookies?: string): Promise<User | null> => {
  const { data } = await serverApi(cookies).get<User | null>("/auth/session");
  return data || null;
};