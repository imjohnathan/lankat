import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Users } from "@/gql/graphql";
import SocialLinks from "./BioSocialLinks";

export default function Bio({ user }: { user: Users }) {
  const nameShort = user?.display_name?.charAt(0) ?? "?";
  return (
    <div className="flex flex-col items-center gap-7 pb-4">
      <Avatar className="h-28 w-28">
        <AvatarImage className="object-cover" src={user?.image ?? ""} />
        <AvatarFallback className="text-4xl">{nameShort}</AvatarFallback>
      </Avatar>
      <h1 className="text-xl font-medium">{user.display_name}</h1>
      <p className="whitespace-pre-line text-center">{user.bio}</p>
      <SocialLinks user={user} />
    </div>
  );
}
