import { client } from "@/lib/nodeClient";
import { supabase } from "@/lib/supabase";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { gql } from "@urql/next";
import * as jose from "jose";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
    CredentialsProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return null;
        }
        const user = {
          id: data?.user?.id,
          email: data?.user?.email,
          emailVerified: data?.user?.email_confirmed_at,
        };

        return user;
      },
    }),
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
      const secret = new TextEncoder().encode(signingSecret);
      //console.log(session, user, session.accessToken);
      if (session.accessToken) {
        const jwt = await jose.jwtVerify(session.accessToken, secret, {
          issuer: "lankat",
        });
        console.log(jwt);
      }
      if (signingSecret) {
        const payload = {
          //aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": DEFAULT_ROLE_NAME,
            "x-hasura-allowed-roles": [DEFAULT_ROLE_NAME],
            "x-hasura-user-id": user.id,
          },
        };
        session.id = user.id;
        const jwt = await new jose.SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setIssuer("lankat")
          .sign(secret);
        session.accessToken = jwt;
        //session.accessToken = jwt.sign(payload, signingSecret);
        const {
          data: { users_by_pk: userInfo },
          error,
        } = await client.query(query, { id: user.id });
        session.user = { ...session.user, ...userInfo };
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
