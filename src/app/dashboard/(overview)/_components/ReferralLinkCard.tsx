"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Copy, Share2 } from "lucide-react";
import TextInput from "@/components/ui/input-text";
import { useAuthStore } from "@/stores/auth-store";

const ReferralLinkCard = () => {
  const user = useAuthStore((state) => state.user);
  const [copied, setCopied] = useState(false);
  const referralBaseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/r/";
  const url = referralBaseUrl + user?.id;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Join me on Readvio", url });
      } catch {}
    } else {
      copy();
    }
  };

  if (!user) return null;

  return (
    <div className="rounded-xl border border-accent-blue/20 bg-white p-4 xsm:p-5 lg:p-6 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary-blue">
        <LinkIcon className="h-4 w-4" /> Your Referral Link
      </div>
      <div className="flex flex-col gap-4 sm:gap-2 sm:flex-row xsm:items-center">
        <TextInput value={url} readOnly />

        <div className="flex xsm:flex-row flex-col gap-2 w-full sm:w-fit">
          <Button variant="outline" onClick={copy} className="w-full sm:w-fit">
            <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="orange" onClick={share} className="w-full sm:w-fit">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralLinkCard;
