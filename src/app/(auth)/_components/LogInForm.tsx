"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/validations/auth";
import { TextInput } from "@/components/ui/input-text";
import { PasswordInput } from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import xIcon from "@/assets/icons/x.png";
import googleIcon from "@/assets/icons/google.png";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";

const LogInForm = () => {
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
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
      await signIn.email({
        email: values.email,
        password: values.password,
      });
      setIsEmailLoading(false);
    } catch (e) {
      console.error(e);
      setIsEmailLoading(false);
    }
  };

  const googleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn.social({ provider: "google" });
      setIsGoogleLoading(false);
    } catch (e) {
      console.error(e);
      setIsGoogleLoading(false);
    }
  };

  const twitterSignIn = async () => {
    setIsTwitterLoading(true);
    try {
      await signIn.social({ provider: "twitter" });
      setIsTwitterLoading(false);
    } catch (e) {
      console.error(e);
      setIsTwitterLoading(false);
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

        <div className="grid grid-cols-1 xsm:grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={googleSignIn}
            loading={isGoogleLoading}
          >
            <Image
              src={googleIcon}
              alt="Google"
              width={60}
              height={60}
              className="size-5 mr-2"
            />
            <span className="text-sm">Google</span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={twitterSignIn}
            loading={isTwitterLoading}
          >
            <Image
              src={xIcon}
              alt="X"
              width={60}
              height={60}
              className="size-4 mr-2"
            />
            <span className="text-sm">Twitter</span>
          </Button>
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
