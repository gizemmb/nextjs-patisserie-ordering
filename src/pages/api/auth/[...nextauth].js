import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/util/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("You haven't registered yet!");
        }
        if (user) {
          return signInUser({ user, password });
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  database: process.env.MONGODB_URI,
  secret: process.env.NEXTAUTH_SECRET
});
const signInUser = async ({ user, password }) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password!");
  }
  return user;
};
