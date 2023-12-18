"use client";

import PreviewPage from "@/components/userpage/Preview";
import { useParams } from "next/navigation";
export default function App() {
  const params = useParams();
  const { key } = params;

  return (
    <div className="h-screen bg-slate-200">
      <PreviewPage
        wrapperClass="scale-100"
        isFloating={false}
        src={"/u/" + key}
      />
    </div>
  );
}
