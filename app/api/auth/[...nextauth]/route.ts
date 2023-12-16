import connectToDB from "@/app/utils/connectDB";

import User from "@/app/models/users/users";

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          await connectToDB();
          const user = await User.findOne({ email });
          if (user && bcrypt.compareSync(password, user.password)) {
            console.log("user", user);
            return user;
          }
          return null;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      //console.log("jwt callbacks", { token, user, session });

      if (user) {
        return {
          ...token,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          isactive: user.isactive,
          photo: user.photo,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      //console.log("session callback", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          firstname: token.firstname,
          lastname: token.lastname,
          isactive: token.isactive,
          role: token.role,
          photo: token.photo,
          email: token.email,
        },
      };

      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
