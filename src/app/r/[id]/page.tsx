import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReferralPage({ params }: PageProps) {
  const { id } = await params;
  redirect("/sign-up?r=" + id);
}
