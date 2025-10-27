import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { User } from "better-auth";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

async function updateUserReferrals(
  user: User & Record<string, unknown>,
  referredBy: string | null
) {
  try {
    if (referredBy && referredBy !== "") {
      const referredByUser = await db
        .collection("user")
        .findOne({ _id: new ObjectId(referredBy as string) });

      if (referredByUser) {
        const newReferral = {
          userId: referredByUser._id,
          referredUserId: new ObjectId(user.id),
          referredOn: new Date(),
          isConverted: false,
          creditEarned: 0,
        };

        const res = await db.collection("referrals").insertOne(newReferral);

        await db.collection("user").updateOne(
          { _id: referredByUser._id },
          {
            $set: {
              referrals: [
                ...referredByUser.referrals,
                res.insertedId.toString(),
              ],
            },
          }
        );
      }
    }
  } catch (error: unknown) {
    throw new Error((error as Error).message ?? "Unexpected error");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, referredBy } = body ?? {};

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const res = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        referredBy: referredBy ?? null,
      },
    });

    if (!res.token) {
      return NextResponse.json({ error: "Sign up failed" }, { status: 400 });
    }

    await updateUserReferrals(res.user, referredBy);

    return NextResponse.json({ data: res.user }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
