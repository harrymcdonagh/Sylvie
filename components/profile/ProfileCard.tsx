"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  course: string;
  year: string;
};

type ProfileCardProps = {
  user: {
    name?: string;
    email?: string;
    image?: string;
    course?: string;
    year?: string;
    createdAt?: string;
  };
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
};

export default function ProfileCard({ user, formData, setFormData }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user.id,
          ...data,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedUser = await res.json();
      console.log("Updated user:", updatedUser);

      setFormData(data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const res = await fetch(`/api/user?userId=${session?.user.id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete account");

        alert("Account deleted successfully. You will be logged out.");
        signOut();
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error deleting account.");
      }
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
          <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <CardTitle>{user.name}</CardTitle>
          {user.createdAt && (
            <CardDescription>
              Member since{" "}
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  disabled={!isEditing}
                  {...register("name", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  disabled={!isEditing}
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Controller
                  control={control}
                  name="course"
                  render={({ field }) => (
                    <Select
                      disabled={!isEditing}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger disabled={!isEditing}>
                        <SelectValue placeholder="Select your course" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Computer Science",
                          "Engineering",
                          "Business",
                          "Arts",
                          "Medicine",
                          "Law",
                          "Other",
                        ].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year of Study</Label>
                <Controller
                  control={control}
                  name="year"
                  render={({ field }) => (
                    <Select
                      disabled={!isEditing}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger disabled={!isEditing}>
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { val: "1", label: "First Year" },
                          { val: "2", label: "Second Year" },
                          { val: "3", label: "Third Year" },
                          { val: "4", label: "Fourth Year" },
                          { val: "5+", label: "Fifth Year or Above" },
                          { val: "Postgraduate", label: "Postgraduate" },
                        ].map(({ val, label }) => (
                          <SelectItem key={val} value={val}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset(formData);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <div className="flex space-x-2">
                <Button type="submit" disabled={!isDirty}>
                  Save Changes
                </Button>
                <Button type="button" variant="destructive" onClick={handleDelete}>
                  <Trash className="mr-2 h-4 w-4" /> Delete Account
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
        {!isEditing && (
          <Button type="button" variant="destructive" onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" /> Delete Account
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
