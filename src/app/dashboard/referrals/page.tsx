import { Metadata } from "next";
import ReferredUsersTable from "./_components/ReferredUsersTable";

export const metadata: Metadata = {
  title: "Referrals",
};

export default function ReferralsPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-extrabold text-primary-blue">Referred Users</h2>

      <ReferredUsersTable />
    </div>
  );
}
