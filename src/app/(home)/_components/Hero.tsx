import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/assets/images/books-img.png";

const Hero = () => {
  return (
    <div className="bg-clean-white/50 relative min-h-[calc(85vh-100px)] grid items-center">
      <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 relative z-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-3 py-1 text-sm text-primary-blue">
            <span className="inline-block h-2 w-2 rounded-full bg-primary-orange" />
            Read, listen and learn anywhere
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-primary-blue md:text-3xl lg:text-6xl font-instrument">
            Unlock Worlds of Knowledge
          </h1>

          <p className="mt-4 max-w-prose text-primary-blue/80">
            Build your digital library with beautifully crafted e-books and
            audiobooks. Earn referral points as you read.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/store">
              <Button variant="orange">Start your free trial</Button>
            </Link>
            <Link href="/browse">
              <Button variant="outline">Browse books</Button>
            </Link>
          </div>
        </div>

        <div className="aspect-4/3 w-full">
          <Image src={HeroImage} alt="Hero image" className="w-full ml-auto" />
        </div>
      </section>

      <div className="absolute inset-0 z-1 h-full w-full bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>

      <div className="absolute top-0 z-[-1] h-full w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,#e87a3021_0%,#e87a3000_50%,#e87a3000_100%)]"></div>
    </div>
  );
};

export default Hero;
