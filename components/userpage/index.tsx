import { Card } from "@/components/ui/card";
import Bio from "@/components/userpage/Bio";
import BioButtons from "@/components/userpage/BioButtons";
import StyleWrapper from "@/components/userpage/Style";
import Widgets from "@/components/userpage/Widgets";
import { type Users, type Widgets as WidgetsType } from "@/gql/graphql";
export default function UserPage({
  users,
  widgets,
  isPreview,
}: {
  users: Users;
  widgets: WidgetsType[];
  isPreview: boolean;
}) {
  return (
    <StyleWrapper theme={users.theme} isPreview={isPreview}>
      <div className="masterBackground min-h-screen bg-gray-100 p-4 transition-all duration-150 sm:py-16">
        <div className="mx-auto max-w-[480px]">
          <Card className="bioSection p-6 shadow-none transition-all duration-150">
            <BioButtons urlKey={users.url_key ?? ""} />
            <Bio user={users} />
          </Card>
          <div className="mt-4">
            {widgets && Boolean(widgets.length) && (
              <Widgets widgets={widgets} />
            )}
          </div>
        </div>
        {/* <code className="block overflow-hidden whitespace-break-spaces">
        {JSON.stringify(data, null, 2)}
      </code> */}
      </div>
    </StyleWrapper>
  );
}
