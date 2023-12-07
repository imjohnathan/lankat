import { supabase } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import IconUploadCloud from "~icons/solar/cloud-upload-outline";

interface Data {
  image?: string;
}
export default function AvatarUpload({
  form,
  userId,
}: {
  form: any;
  userId: string;
}) {
  const [data, setData] = useState<Data>({});
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { image } = data;

  const uploadImage = async (file: File) => {
    const fileName = `${userId}_${nanoid(12)}.${file.type.split("/")[1]}`;
    const { data: avatar, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(fileName);

    console.log(publicUrl);
    return publicUrl;
  };

  const onChangePicture = useCallback(
    (e: any) => {
      setFileError(null);
      const file = e.target.files[0];
      if (file) {
        if (file.size / 1024 / 1024 > 5) {
          setFileError("File size too big (max 5MB)");
        } else if (file.type !== "image/png" && file.type !== "image/jpeg") {
          setFileError("File type not supported (.png or .jpg only)");
        } else {
          const reader = new FileReader();
          reader.onload = async (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }));
            const url = await uploadImage(file);
            form.setValue("avatar", url);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [setData, form, uploadImage],
  );

  useEffect(() => {
    if (!image) {
      const value = form.getValues("avatar");
      setData({ image: value });
    }
  }, [form, image]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-red-500">{fileError}</p>
      </div>
      <label
        htmlFor="image"
        className="group relative mt-1 flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
      >
        <div
          className="absolute z-[5] h-full w-full rounded-full"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            setFileError(null);
            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            if (file) {
              if (file.size / 1024 / 1024 > 5) {
                setFileError("File size too big (max 5MB)");
              } else if (
                file.type !== "image/png" &&
                file.type !== "image/jpeg"
              ) {
                setFileError("File type not supported (.png or .jpg only)");
              } else {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setData((prev) => ({
                    ...prev,
                    image: e.target?.result as string,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }
          }}
        />
        <div
          className={`${
            dragActive
              ? "cursor-copy border-2 border-black bg-gray-50 opacity-100"
              : ""
          } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-full bg-white transition-all ${
            image
              ? "opacity-0 group-hover:opacity-100"
              : "group-hover:bg-gray-50"
          }`}
        >
          <IconUploadCloud
            className={`${
              dragActive ? "scale-110" : "scale-100"
            } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
          />
          <p className="mt-2 text-center text-sm text-gray-500">
            拖曳或是
            <br />
            點這裡上傳
          </p>
        </div>
        {image && (
          <img
            src={image}
            alt="Preview"
            className="h-full w-full rounded-full object-cover"
          />
        )}
      </label>
      <div className="mt-1 flex rounded-full shadow-sm">
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={onChangePicture}
        />
      </div>
    </div>
  );
}
