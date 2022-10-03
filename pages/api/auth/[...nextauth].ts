import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions ={
   secret: process.env.UNITEAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  events: {
    async createUser({ user }) {
      let username;
      if (user.name) {
        username = user.name.replace(/\s/g, "").toLowerCase();
      } else if (user.email) {
        username = user.email.split("@")[0];
      } else {
        username = user.id;
      }
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            username,
          },
        });
      } catch (e) {
        username += Math.floor(1000 + Math.random() * 9000).toString();
        await prisma.user.update({
          where: { id: user.id },
          data: {
            username,
          },
        });
      }
    }}

}

export default NextAuth(authOptions);
