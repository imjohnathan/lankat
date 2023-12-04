import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./appearance-form";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">外觀風格</h3>
        <p className="text-sm text-muted-foreground">
          這裡可以客製化您的社群名片頁面
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
