import { betterAuth, User } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

export const updateUserReferrals = async (
  user: User & Record<string, unknown>
) => {
  if (user.referredBy && user.referredBy !== "") {
    const referredByUser = await db
      .collection("user")
      .findOne({ _id: new ObjectId(user.referredBy as string) });

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
            referrals: [...referredByUser.referrals, res.insertedId.toString()],
          },
        }
      );
    }
  }
};

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookiePrefix: "readvio",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      domain: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN,
    },
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      partitioned: false,
      domain: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      creditScore: {
        type: "number",
        input: false,
        defaultValue: 0,
      },
      referredBy: {
        type: "string",
        required: true,
        input: true,
        defaultValue: null,
      },
      referrals: {
        type: "string[]",
        input: false,
        defaultValue: [],
      },
      purchasedBooks: {
        type: "string[]",
        input: false,
        defaultValue: [],
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: (user) => updateUserReferrals(user),
      },
    },
  },
  plugins: [nextCookies()],
});
