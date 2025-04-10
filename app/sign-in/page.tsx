"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { TriangleAlert } from "lucide-react";
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
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // 👇 Check for OAuth or credential errors from query
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        EmailAlreadyExists: "This email is already associated with another account.",
        OAuthError: "Something went wrong during GitHub sign-in.",
        CredentialsSignin: "Invalid email or password.",
        default: "Something went wrong. Please try again.",
      };
      setError(errorMessages[errorParam] || errorMessages.default);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError("");

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

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    provider: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(provider, { callbackUrl: "/" });
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
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <TriangleAlert className="h-5 w-5" />
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
            <Button
              disabled={pending}
              onClick={(e) => handleProvider(e, "google")}
              variant="outline"
              size="lg"
            >
              <FcGoogle className="text-xl" />
            </Button>
            <Button
              disabled={pending}
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
            >
              <FaGithub className="text-xl" />
            </Button>
          </div>

          <p className="text-center text-sm mt-2 text-muted-foreground">
            Don’t have an account?
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
