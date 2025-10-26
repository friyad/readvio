import { Metadata } from "next";
import ReferredUsersTable from "./_components/ReferredUsersTable";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Referrals",
};

export const dynamic = "force-dynamic";

export async function getReferredUsersData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/referrals`,
      {
        credentials: "include",
        headers: await headers(),
      }
    );
    const data = await response.json();
    console.log(data);
    if (!data.data) {
      throw new Error(data?.message || "Failed to fetch referred users");
    }
    return data.data;
  } catch (error: unknown) {
    return null;
  }
}
export default async function ReferralsPage() {
  const referredUsersData = await getReferredUsersData();

  if (!referredUsersData) {
    return (
      <div className="flex items-center justify-center h-[40dvh]">
        <div className="text-2xl font-bold">Failed to fetch referred users</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-extrabold text-primary-blue">Referred Users</h2>

      {referredUsersData.length > 0 ? (
        <ReferredUsersTable referredUsers={referredUsersData} />
      ) : (
        <div className="flex items-center justify-center h-[40dvh]">
          <div className="text-2xl font-bold">No referred users found</div>
        </div>
      )}
    </div>
  );
}
