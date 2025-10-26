import { Metadata } from "next";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { formatDateForDisplay } from "@/utils/date";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="font-extrabold text-primary-blue">Profile</h2>
        <p className="text-primary-blue/70 text-sm">
          Manage your personal information and account details.
        </p>
      </div>
      <div className="rounded-xl border border-accent-blue/20 bg-white p-6 shadow-sm space-y-6">
        {/* Avatar and name */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar name={user?.name || "Guest"} className="size-24 text-4xl" />

          <div className="flex-1 min-w-0 space-y-2">
            <div className="text-xl font-semibold text-primary-blue">
              {user?.name || "Guest"}
            </div>
            <div className="text-primary-blue/80 truncate">
              {user?.email || "Guest"}
            </div>
            <div className="text-primary-blue/60 text-xs">
              Joined:{" "}
              <span className="font-medium">
                {formatDateForDisplay(user?.createdAt?.toISOString() || "")}
              </span>
            </div>
          </div>
        </div>

        <hr className="border-accent-blue/20" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-primary-blue/70 mb-1">
              Full Name
            </label>
            <div className="p-3 rounded-md border border-accent-blue/20 bg-accent-blue/5 text-primary-blue">
              {user?.name || "Guest"}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary-blue/70 mb-1">
              Email
            </label>
            <div className="p-3 rounded-md border border-accent-blue/20 bg-accent-blue/5 text-primary-blue">
              {user?.email || "Guest"}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary-blue/70 mb-1">
              Subscription
            </label>
            <div className="p-3 rounded-md border border-accent-blue/20 bg-accent-blue/5 text-primary-blue">
              {user?.creditScore || 0}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary-blue/70 mb-1">
              Joined
            </label>
            <div className="p-3 rounded-md border border-accent-blue/20 bg-accent-blue/5 text-primary-blue">
              {formatDateForDisplay(user?.createdAt?.toISOString() || "")}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-end">
          <Button variant="secondary" className="w-full sm:w-fit">
            Change Password
          </Button>
          <Button variant="orange" className="w-full sm:w-fit">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
