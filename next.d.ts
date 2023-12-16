import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstname: string;
      lastname: string;
      isactive: string;
      photo: string;
      email: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    firstname: string;
    lastname: string;
    isactive: string;
    photo: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    id: string;
    firstname: string;
    lastname: string;
    isactive: string;
    photo: string;
    email: string;
    role: string;
  }
}
