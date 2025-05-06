// app/profile/page.tsx
"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import BarLoader from "@/components/ui/BarLoader";
import ProfileCard from "@/components/profile/ProfileCard";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import FlyoutNav from "@/components/landing/navbar/FlyoutNav";

type ApiUser = { name?: string; email?: string; image?: string };

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [apiUser, setApiUser] = useState<ApiUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    year: "",
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user.id) {
      fetch(`/api/user?userId=${session.user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error fetching user data");
          return res.json();
        })
        .then((data) => {
          setApiUser({ name: data.name, email: data.email, image: data.image });
          setFormData({
            name: data.name || "",
            email: data.email || "",
            course: data.course || "",
            year: data.year || "",
          });
        })
        .catch(() => setApiUser(null));
    }
  }, [status, session?.user.id]);

  if (status === "loading") return <BarLoader />;

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <UserCircle className="h-24 w-24 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-muted-foreground mb-6">Please sign in to view your profile</p>
        <Button onClick={() => signIn()}>Sign In</Button>
      </div>
    );
  }

  return (
    <>
      <FlyoutNav />

      <div className="relative h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50" />
        <div className="relative z-10 flex min-h-full flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8">
            Your Profile
          </h1>
          <ProfileCard
            user={{
              name: apiUser?.name,
              email: apiUser?.email,
              image: apiUser?.image,
            }}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
}
