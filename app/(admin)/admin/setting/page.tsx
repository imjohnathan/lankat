"use client";

import { ProfileForm } from "@/app/(admin)/admin/setting/profile-form";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">個人檔案</h3>
        <p className="text-sm text-muted-foreground">
          更新您的個人資料，以便其他人可以找到您。
        </p>
      </div>
      <Separator />
      <ProfileForm />
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
