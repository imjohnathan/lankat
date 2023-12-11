"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import IonLogoGoogle from "~icons/ion/logo-google";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import SolarUserHeartBold from "~icons/solar/user-heart-bold";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(2).max(50),
});
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { email, password } = data;
      const { data: result, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw new Error(error.message);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error("錯誤：" + e.message);
        throw new Error(e.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      autoCorrect="off"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>
              {isLoading && (
                <IconLoading className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <IconLoading className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <></>
          )}{" "}
          Github
        </Button>
      </div>
    </Form>
  );
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function loginWithProvider(provider: string) {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: "/admin" });
  }

  async function loginTestUser() {
    setIsLoading(true);
    await signIn("credentials", {
      email: "test@lank.at",
      password: "testtest",
      callbackUrl: "/admin",
    });
  }

  React.useEffect(() => {
    const getCsrf = async () => {
      setIsLoading(true);
      await fetch("/api/auth/csrf");
      setIsLoading(false);
    };
    getCsrf();
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Button
        onClick={loginTestUser}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <IconLoading className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <SolarUserHeartBold className="mr-2 h-4 w-4" />
        )}{" "}
        測試使用者登入
      </Button>
      <Button
        onClick={() => {
          loginWithProvider("google");
        }}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <IconLoading className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IonLogoGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        使用 Google 繼續
      </Button>
    </div>
  );
}
