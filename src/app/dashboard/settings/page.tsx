import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-extrabold text-primary-blue">Settings</h2>
        <p className="text-primary-blue/70 text-sm">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex justify-center items-center min-h-[40dvh] border border-accent-blue/20 rounded-xl p-6">
        <div>
          <h2 className="text-primary-blue font-semibold">Upcoming Features</h2>
          <p className="text-primary-blue/70 text-sm">
            We are working on some new features to improve your experience.
          </p>
          <ul className="list-disc list-inside mt-5">
            <li>Add Profile Picture</li>
            <li>Change Password</li>
            <li>Change Name</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
