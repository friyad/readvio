"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/validations/auth";
import { TextInput } from "@/components/ui/input-text";
import { PasswordInput } from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorExtractor";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

const LogInForm = () => {
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: { email: "", password: "", remember: undefined },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: LoginValues) => {
    setIsEmailLoading(true);
    try {
      const res = await signIn.email({
        email: values.email,
        password: values.password,
      });
      if (res.error) throw new Error(res.error.message);
      setUser(res.data?.user);
      router.replace("/");
      toast.success("Login successful");
      setIsEmailLoading(false);
    } catch (e: unknown) {
      toast.error(extractErrorMessage(e));
      setIsEmailLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-accent-blue/20 bg-white p-5 shadow-2xl md:p-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <div>
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <Checkbox label="Remember me" {...register("remember")} />
          <Link href="/forgot" className="text-primary-blue hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="orange"
          className="w-full"
          loading={isEmailLoading}
        >
          Sign in
        </Button>

        <div className="relative py-2 text-center text-xs text-primary-blue/60">
          <span className="relative z-10 bg-white px-2">or continue with</span>
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-accent-blue/20" />
        </div>

        <p className="text-center text-xs text-primary-blue/70">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-primary-blue hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogInForm;
