import MetricCard from "./_components/MetricCard";
import ActivityChart from "./_components/ActivityChart";
import ReferralLinkCard from "./_components/ReferralLinkCard";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function getDashboardData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
      {
        credentials: "include",
        headers: await headers(),
      }
    );
    const data = await response.json();
    if (!data.data) {
      throw new Error(data?.message || "Failed to fetch dashboard data");
    }
    return data;
  } catch (error: unknown) {
    return null;
  }
}

export default async function OverviewPage() {
  const dashboardData = await getDashboardData();

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-2xl font-bold">Failed to fetch dashboard data</div>
      </div>
    );
  }

  const {
    referredUsersCount = 0,
    convertedUsersCount = 0,
    totalCreditEarned = 0,
  } = dashboardData.data || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xsm:grid-cols-2 md:grid-cols-3">
        <MetricCard label="Referred Users" value={referredUsersCount} />
        <MetricCard label="Converted Users" value={convertedUsersCount} />
        <MetricCard label="Total Credits Earned" value={totalCreditEarned} />
      </div>

      <ReferralLinkCard />

      <ActivityChart
        creditsPerDay={dashboardData.data.creditsPerDay}
        referralsPerDay={dashboardData.data.referralsPerDay}
      />
    </div>
  );
}
