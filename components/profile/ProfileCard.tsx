// components/profile/ProfileCard.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
  };
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
};

export default function ProfileCard({ user, formData, setFormData }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);

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

  const onSubmit = (data: FormValues) => {
    console.log("Saving profile data:", data);
    setFormData(data);
    setIsEditing(false);
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
          <CardTitle className="text-2xl">{user.name || "Welcome"}</CardTitle>
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
            <div className="mt-6 flex justify-end space-x-2">
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
              <Button type="submit" disabled={!isDirty}>
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
      </CardFooter>
    </Card>
  );
}
