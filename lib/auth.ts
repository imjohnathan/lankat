import { client } from "@/lib/nodeClient";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { gql } from "@urql/next";
import jwt from "jsonwebtoken";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const DEFAULT_ROLE_NAME = "user";

const query = gql`
  query getUserInAuth($id: uuid!) {
    users_by_pk(id: $id) {
      display_name
      image
      url_key
    }
  }
`;

const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          //aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          issuer: "lankat",
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": DEFAULT_ROLE_NAME,
            "x-hasura-allowed-roles": [DEFAULT_ROLE_NAME],
            "x-hasura-user-id": user.id,
          },
        };
        session.id = user.id;
        session.accessToken = jwt.sign(payload, signingSecret);
      }
      const {
        data: { users_by_pk: userInfo },
        error,
      } = await client.query(query, { id: user.id });
      session.user = { ...session.user, ...userInfo };
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
