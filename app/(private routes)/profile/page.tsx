import css from "./ProfilePage.module.css";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile page in NoteHub app",
  openGraph: {
    title: "Profile | NoteHub",
    description: "User profile page in NoteHub app",
    url: "https://notehub.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function Profile() {
  const username = "your_username";
  const email = "your_email@example.com";
  const avatarUrl = "https://ac.goit.global/fullstack/react/avatar.png";

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="#" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatarUrl}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
    </main>
  );
}
