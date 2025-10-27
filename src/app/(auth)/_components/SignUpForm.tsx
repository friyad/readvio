"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupValues } from "@/validations/auth";
import { TextInput } from "@/components/ui/input-text";
import { PasswordInput } from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorExtractor";
import { useAuthStore } from "@/stores/auth-store";
import { useSearchParams } from "next/navigation";
import { UserType } from "@/types/user.type";

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const referredBy = searchParams.get("r");
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignupValues) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            name: values.name,
            password: values.password,
            referredBy: referredBy ?? null,
          }),
        }
      );
      const data = await res.json();
      if (!data?.data) throw new Error(data?.error || "Sign up failed");
      setUser(data?.data as UserType);
      location.reload();
      toast.success("Sign up successful");
    } catch (e: unknown) {
      toast.error(extractErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-accent-blue/20 bg-white p-5 shadow-2xl md:p-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            label="Full Name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
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
        <div>
          <PasswordInput
            label="Confirm Password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <Checkbox
            label={
              <>
                <span className="text-primary-blue/80">I agree to the</span>
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-primary-blue hover:underline font-semibold"
                >
                  terms &amp; conditions
                </Link>
              </>
            }
            {...register("terms")}
            error={errors.terms?.message}
          />
        </div>

        <Button
          type="submit"
          variant="orange"
          loading={isLoading}
          className="w-full"
        >
          Sign up
        </Button>

        <div className="relative py-2 text-center text-xs text-primary-blue/60">
          <span className="relative z-10 bg-white px-2">or continue with</span>
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-accent-blue/20" />
        </div>

        <p className="text-center text-xs text-primary-blue/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary-blue hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
