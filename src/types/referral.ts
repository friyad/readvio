export type ReferralUser = {
  id: string;
  name: string;
  email: string;
  joinedAt: string; // ISO date
  converted: boolean;
  creditsEarned: number;
};

export type ActivityPoint = {
  date: string; // YYYY-MM-DD
  referrals: number;
  conversions: number;
  credits: number;
};
