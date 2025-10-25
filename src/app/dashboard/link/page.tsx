import { Metadata } from "next";
import ReferralLinkCard from "../(overview)/_components/ReferralLinkCard";

export const metadata: Metadata = {
  title: "Referral Link",
};

export default function LinkPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-extrabold text-primary-blue">Referral Link</h2>
      <ReferralLinkCard />
    </div>
  );
}
