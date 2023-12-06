import { client } from "@/lib/nodeClient";
import { supabase } from "@/lib/supabase";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";
import { gql } from "@urql/next";
import * as jose from "jose";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

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
const fromDate = (time: number, date = Date.now()) =>
  new Date(date + time * 1000);
const supabaseAd = SupabaseAdapter({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
});

const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  {
    db: { schema: "next_auth" },
    global: { headers: { "X-Client-Info": "@auth/supabase-adapter" } },
  },
);

const sessionCookieName = "next-auth.session-token";

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
          profile: data?.user,
        };

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: supabaseAd,
  jwt: {
    encode: () => {
      const cookie = cookies().get(sessionCookieName);
      console.log("cookie", cookie);
      if (cookie) return cookie;
      else return "";
    },
    decode: async () => {
      return null;
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user && credentials) {
        const sessionToken = uuidv4();
        const sessionMaxAge = 60 * 60 * 24 * 30; //30Daysconst sessionMaxAge = 60 * 60 * 24 * 30; //30Days
        const sessionExpiry = fromDate(sessionMaxAge);
        const { data, error } = await supabaseAuth
          .from("sessions")
          .insert({
            sessionToken: sessionToken,
            userId: user.id,
            expires: sessionExpiry,
          })
          .select()
          .single();
        console.log("credentials login", data, error);
        if (error) return false;

        const setCookie = cookies().set(sessionCookieName, sessionToken, {
          expires: sessionExpiry,
        });
      }

      return true;
    },
    session: async ({ session, token, user }) => {
      // user = token?.user;
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
  useSecureCookies: false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
