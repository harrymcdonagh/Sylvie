"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { TriangleAlert } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/");
      toast.success("Sign in successful", { duration: 4000 });
    } else if (res?.status === 401) {
      setError("Invalid credentials");
      setPending(false);
    } else if (res?.status === 500) {
      setError("Internal server error");
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign In</CardTitle>
          <CardDescription className="text-sm text-center text-muted-foreground">
            Use email or services to sign in
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 test-sm text-destructive">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="px-2 sm:px-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button className="w-full" size="lg" disabled={pending}>
              Continue
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="flex justify-center gap-4">
            <Button disabled={pending} onClick={() => {}} variant="outline" size="lg">
              <FcGoogle className="text-xl" />
            </Button>
            <Button disabled={pending} onClick={() => {}} variant="outline" size="lg">
              <FaGithub className="text-xl" />
            </Button>
          </div>

          <p className="text-center text-sm mt-2 text-muted-foreground">
            Don't have an account?
            <Link
              href="/sign-up"
              className="text-orange-500 ml-2 hover:underline cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
