"use client";

import { ProfileForm } from "@/app/(admin)/admin/setting/profile-form";
import { Separator } from "@/components/ui/separator";
import { gql, useQuery } from "@urql/next";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

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
function SettingsProfilePage() {
  const { data: session } = useSession();
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: getUserQuery,
    variables: {
      id: session?.id,
    },
  });
  const { users_by_pk } = data;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">個人檔案</h3>
        <p className="text-sm text-muted-foreground">
          更新您的個人資料，以便其他人可以找到您。
        </p>
      </div>
      <Separator />
      <ProfileForm user={users_by_pk} />
    </div>
  );
}

export default function App() {
  return (
    <Suspense>
      <SettingsProfilePage />
    </Suspense>
  );
}
