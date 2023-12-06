import { FormSchema, defaultData } from "@/components/widgets/modals/Banner";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import * as z from "zod";
import placeholder from "./assets/banner-placeholder.jpg";

const aspectRatioMap: {
  [key: string]: string | undefined;
} = {
  "16:9": "aspect-w-16 aspect-h-9",
  "4:3": "aspect-w-4 aspect-h-3",
  "1:1": "aspect-w-1 aspect-h-1",
};

export default function Banner({
  isPreview = false,
  data,
}: {
  isPreview: boolean;
  data: z.infer<typeof FormSchema>;
}) {
  const [swiperKey, setSwiperKey] = useState(0);
  const swiperRef = useRef<SwiperClass>();
  const { autoPlay, autoPlaySpeed, aspectRatio, dots, links } = {
    ...defaultData,
    ...data,
  };
  const linksFiltered = links.filter((link) => link.isShow);

  useEffect(() => {
    setSwiperKey((prev) => prev + 1);
  }, [data]);

  return (
    <div className="grid">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={
          autoPlay
            ? {
                delay: Number(autoPlaySpeed) * 1000,
                disableOnInteraction: false,
              }
            : false
        }
        speed={1500}
        navigation={dots}
        pagination={dots ? { clickable: true } : false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full"
        key={swiperKey}
      >
        {Boolean(links && links.length) &&
          linksFiltered.map((link, index) => (
            <SwiperSlide key={index} style={{ width: "1280px" }}>
              <div
                className={cn(
                  "overflow-hidden rounded-md",
                  {
                    border: isPreview,
                  },
                  aspectRatioMap[aspectRatio],
                )}
              >
                <Image
                  height={720}
                  width={1280}
                  alt={link.name || "Preview"}
                  src={link.image || placeholder.src}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
