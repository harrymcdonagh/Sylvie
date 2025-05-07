"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import BarLoader from "@/components/ui/BarLoader";
import ProfileCard from "@/components/profile/ProfileCard";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import FlyoutNav from "@/components/landing/navbar/FlyoutNav";
import { useUser } from "@/hooks/useUser";

export default function ProfilePage() {
  const { status: authStatus } = useSession();
  const { user, loading, error } = useUser();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <UserCircle className="h-24 w-24 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-red-500 mb-6">{error}</p>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    year: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        course: (user as any).course || "",
        year: (user as any).year || "",
      });
    }
  }, [user]);

  if (authStatus === "loading" || loading) {
    return <BarLoader />;
  }

  if (authStatus === "unauthenticated" || error) {
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
              name: user?.name,
              email: user?.email,
              image: user?.image,
              createdAt: user?.createdAt,
            }}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
}
