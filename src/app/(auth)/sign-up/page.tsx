import SignUpForm from "../_components/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] relative bg-clean-white md:flex flex-col justify-center">
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 relative z-3 mxl:-mt-[5%] w-full">
        {/* Left: copy, aligned with hero style */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-3 py-1 text-sm text-primary-blue">
            <span className="inline-block h-2 w-2 rounded-full bg-primary-orange" />
            Welcome to Readvio
          </div>
          <h1 className="mt-4 font-extrabold text-primary-blue text-2xl md:text-4xl lg:text-5xl">
            Create an account to continue
          </h1>
          <p className="mt-3 md:max-w-prose text-primary-blue/80">
            Build your digital library with beautifully crafted e-books and
            audiobooks. Earn referral points as you read.
          </p>
        </div>

        {/* Right: form card */}
        <SignUpForm />
      </section>

      <div className="absolute z-2 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-25"></div>

      <div className="absolute top-0 z-1 h-full w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,#e87a3021_0%,#e87a3000_50%,#e87a3000_100%)]"></div>
    </main>
  );
}
