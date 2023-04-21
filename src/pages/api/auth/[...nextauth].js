import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbPromise from "@/modules/db";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@outlook.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const [user] = await (await dbPromise)
          .db("auth")
          .collection("users")
          .find({ email })
          .toArray();

        if (user?.password === password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

export default NextAuth(authOptions);
