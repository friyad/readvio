"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupValues } from "@/validations/auth";
import { TextInput } from "@/components/ui/input-text";
import { PasswordInput } from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import xIcon from "@/assets/icons/x.png";
import googleIcon from "@/assets/icons/google.png";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn, signUp } from "@/lib/auth-client";
import { useState } from "react";

const SignUpForm = () => {
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
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
    setIsEmailLoading(true);
    try {
      await signUp.email({
        email: values.email,
        name: values.name,
        password: values.password,
      });
      setIsEmailLoading(false);
    } catch (e) {
      setIsEmailLoading(false);
    }
  };

  const googleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn.social({ provider: "google" });
      setIsGoogleLoading(false);
    } catch (e) {
      setIsGoogleLoading(false);
    }
  };

  const twitterSignUp = async () => {
    setIsTwitterLoading(true);
    try {
      await signIn.social({ provider: "twitter" });
      setIsTwitterLoading(false);
    } catch (e) {
      setIsTwitterLoading(false);
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
          loading={isEmailLoading}
          className="w-full"
        >
          Sign up
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
            onClick={googleSignUp}
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
            onClick={twitterSignUp}
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
