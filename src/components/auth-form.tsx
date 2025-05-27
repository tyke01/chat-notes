"use client";

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { loginAction, signUpAction } from "@/actions/users";

interface Props {
  type: "login" | "signUp";
}

const AuthForm = ({ type }: Props) => {
  const isLoginForm = type === "login";
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    // console.log(formData);
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Logged In";
        description = "You have successfully logged in.";
      } else {
        errorMessage = (await signUpAction(email, password)).errorMessage;
        title = "Signed Up";
        description =
          "You have successfully signed up. Check your email for verification.";
      }

      if (!errorMessage) {
        toast({
          title,
          description,
          variant: "success",
        });
        router.replace("/");
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>

      <CardFooter className="mt-4 flex w-full flex-col space-y-2">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-center text-sm text-gray-500">
          {isLoginForm
            ? "Don't have an account yet? "
            : "Already have an account? "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={cn(
              "text-blue-500 underline",
              isPending && "pointer-events-none opacity-50",
            )}
            onClick={() => {
              startTransition(() => {
                router.push(isLoginForm ? "/sign-up" : "/login");
              });
            }}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default AuthForm;
