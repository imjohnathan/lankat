import { Button } from "@/components/ui/button";
import { SignIn, SignOut } from "@/components/user/signInOut";
import { auth } from "@/lib/auth";
import { getClient } from "@/lib/client";
import { gql } from "@urql/next";
const query = gql`
  query MyQuery {
    usersCollection {
      edges {
        node {
          email
          id
          image
          name
        }
      }
    }
  }
`;

export default async function Home() {
  const { data, error } = await getClient().query(query, {});
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn provider="google">
        <Button>登入</Button>
      </SignIn>
      <SignOut>
        <Button>登出</Button>
      </SignOut>
      <code>{JSON.stringify(data)}</code>

      <code className="w-[300px]">{JSON.stringify(session, null, 2)}</code>
    </main>
  );
}
