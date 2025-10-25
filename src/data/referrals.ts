import type { ReferralStats, ReferralUser } from "@/types/referral";

export const referralStats: ReferralStats = {
  referredCount: 10,
  convertedCount: 4,
  totalCredits: 8,
};

export const referredUsers: ReferralUser[] = Array.from(
  { length: 100 },
  (_, i) => ({
    id: `u-${i + 1}`,
    name: ["Alex Morgan", "Sam Taylor", "Jordan Lee", "Casey Reed"][i % 4],
    email: `user${i + 1}@example.com`,
    joinedAt: new Date(Date.now() - i * 86400000).toISOString(),
    converted: i % 2 === 0,
    creditsEarned: i % 2 === 0 ? 2 : 0,
  })
);

export const referralBaseUrl = "https://readvio.app/r/";
export const currentUserReferralCode = "alex-1234";
