"use client";
import { type Users } from "@/gql/graphql";
import { gql, useQuery } from "@urql/next";
import { useSession } from "next-auth/react";
import { Suspense, createContext } from "react";

const getUserQuery = gql`
  query GetUserInfo($id: uuid!) {
    users_by_pk(id: $id) {
      bio
      display_name
      email
      id
      image
      social_links
      theme
      theme_selected
      url_key
    }
  }
`;

export const ProfileContext = createContext<{
  user: Partial<Users>;
}>({
  user: {
    email: "",
    id: "",
    name: "",
    url_key: "",
    display_name: "",
    image: "",
    bio: "",
    social_links: "",
    theme: "",
    theme_selected: false,
  },
});

export function SettingClient({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: getUserQuery,
    variables: {
      id: session?.id,
    },
  });
  const { users_by_pk } = data;
  return (
    <ProfileContext.Provider
      value={{
        user: users_by_pk,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export default function Client({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingClient>{children}</SettingClient>
    </Suspense>
  );
}
