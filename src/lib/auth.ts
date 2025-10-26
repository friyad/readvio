import { betterAuth, User } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  advanced: {
    cookiePrefix: "readvio",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
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
});

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
