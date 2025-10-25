import MetricCard from "./_components/MetricCard";
import ActivityChart from "./_components/ActivityChart";
import ReferralLinkCard from "./_components/ReferralLinkCard";
import { referralStats } from "@/data/referrals";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xsm:grid-cols-2 md:grid-cols-3">
        <MetricCard
          label="Referred Users"
          value={referralStats.referredCount}
        />
        <MetricCard
          label="Converted Users"
          value={referralStats.convertedCount}
        />
        <MetricCard
          label="Total Credits Earned"
          value={referralStats.totalCredits}
        />
      </div>

      <ReferralLinkCard />

      <ActivityChart />
    </div>
  );
}
