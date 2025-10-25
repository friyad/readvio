import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Logo from "@/assets/images/logo.png";

const SiteFooter = () => {
  return (
    <footer className="border-t border-secondary-orange bg-clean-white/85 text-primary-blue/90 font-inter mt-8 text-sm relative">
      <section className="relative z-2">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Branding & Social Links */}
          <div className="flex-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <Image
                src={Logo}
                alt="Readvio"
                width={300}
                height={150}
                className="w-auto h-8"
              />
            </Link>
            <p className="mt-2 text-xs lg:text-sm text-primary-blue/70 max-w-sm">
              Readvio is your modern digital library and e-book store. Read
              anywhere, earn rewards, unlock knowledge.
            </p>
            <div className="mt-6 flex items-center gap-5">
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                className="hover:text-primary-orange transition"
              >
                <Facebook className="size-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
                className="hover:text-primary-orange transition"
              >
                <Twitter className="size-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="hover:text-primary-orange transition"
              >
                <Instagram className="size-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="hover:text-primary-orange transition"
              >
                <Linkedin className="size-5" />
              </Link>
              <Link
                href="/contact"
                aria-label="Email"
                className="hover:text-primary-orange transition"
              >
                <Mail className="size-5" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
            <div>
              <h4 className="font-bold font-instrument mb-2 text-primary-orange/90">
                Platform
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/books"
                    className="hover:text-primary-orange transition"
                  >
                    Browse Books
                  </Link>
                </li>
                <li>
                  <Link
                    href="/library"
                    className="hover:text-primary-orange transition"
                  >
                    Library
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-primary-orange transition"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refer"
                    className="hover:text-primary-orange transition"
                  >
                    Refer a Friend
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-instrument mb-2 text-primary-orange/90">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary-orange transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary-orange transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-primary-orange transition"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary-orange transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-instrument mb-2 text-primary-orange/90">
                Help
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-primary-orange transition"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="hover:text-primary-orange transition"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-primary-orange transition"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-primary-orange transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-orange/40 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-primary-blue/80">
          <span>
            &copy; {new Date().getFullYear()} Readvio. All rights reserved.
          </span>
          <span className="mt-3 md:mt-0">
            Built by{" "}
            <span className="text-primary-blue font-semibold">Friyad</span>
          </span>
        </div>
      </section>

      {/* Background Hrstics */}
      <div className="absolute z-1 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
    </footer>
  );
};

export default SiteFooter;
