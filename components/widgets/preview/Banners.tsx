"use client";

import { FormSchema, defaultData } from "@/components/widgets/modals/Banner";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { useDebounce } from "use-debounce";
import * as z from "zod";
import MaterialSymbolsImagesmodeOutlineSharp from "~icons/material-symbols/imagesmode-outline-sharp";
import placeholder from "./assets/banner-placeholder.jpg";

const aspectRatioMap: {
  [key: string]: string | undefined;
} = {
  "16:9": "aspect-w-16 aspect-h-9",
  "4:3": "aspect-w-4 aspect-h-3",
  "1:1": "aspect-w-1 aspect-h-1",
};

function PlaceHolder() {
  return (
    <div className="grid place-items-center bg-gray-200">
      <div className="flex flex-col items-center justify-center">
        <MaterialSymbolsImagesmodeOutlineSharp className="h-10 w-10" />
        <p className="text-sm">請上傳圖片</p>
      </div>
    </div>
  );
}

export default function Banner({
  isPreview = false,
  data,
}: {
  isPreview?: boolean;
  data: z.infer<typeof FormSchema>;
}) {
  const [debouncedData] = useDebounce(data, 500);
  const [swiperKey, setSwiperKey] = useState(0);
  const swiperRef = useRef<SwiperClass>();
  const {
    config: { autoPlay, autoPlaySpeed, aspectRatio, dots },
    links,
  } = {
    links:
      data?.links && data.links.length
        ? data.links
        : isPreview
          ? defaultData.links
          : [],
    config: {
      ...defaultData.config,
      ...data.config,
    },
  };
  const linksFiltered = links.filter((link) => link.isShow);

  useEffect(() => {
    setSwiperKey((prev) => prev + 1);
  }, [debouncedData]);
  const recordClick = (key: string | null | undefined) => {
    if (!isPreview && key) {
      fetch(`/s/${key}?logger`, {
        method: "POST",
      });
    }
  };
  if (!linksFiltered.length) return null;
  return (
    <div className="grid">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={
          autoPlay
            ? {
                delay: Number(autoPlaySpeed) * 1000,
                disableOnInteraction: false,
              }
            : false
        }
        speed={500}
        navigation={dots}
        pagination={
          dots
            ? {
                clickable: true,
                clickableClass: "drop-shadow-lg",
              }
            : false
        }
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full"
        key={swiperKey}
      >
        {Boolean(links && links.length) &&
          linksFiltered.map((link, index) => (
            <SwiperSlide
              key={index}
              style={{ width: "1280px", maxWidth: "100%" }}
            >
              <Link
                prefetch={false}
                onClick={() => recordClick(link?.key)}
                href={link.url}
                target="_blank"
                className={cn(
                  "block overflow-hidden rounded-md",
                  {
                    border: isPreview,
                  },
                  aspectRatioMap[aspectRatio],
                )}
              >
                {link.image ? (
                  <Image
                    height={720}
                    width={1280}
                    priority={false}
                    alt={link.name || "Preview"}
                    src={link.image || placeholder.src}
                    className="bg-slate-200 object-cover"
                  />
                ) : (
                  <PlaceHolder />
                )}
                {link.name && (
                  <div className="!bottom-auto !top-0 flex h-10 items-center bg-gradient-to-b from-black/80 to-transparent text-white">
                    <div className="line-clamp-1 px-4">{link.name}</div>
                  </div>
                )}
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      <style jsx>
        {`
          * {
            --swiper-navigation-size: 20px;
            --swiper-theme-color: #fff;
            --swiper-pagination-bottom: 8px;
          }
          div :global(.swiper-button-prev),
          div :global(.swiper-button-next) {
            background: black;
            border-radius: 100%;
            width: 20px;
            height: 20px;
          }
          div :global(.swiper-button-prev:after),
          div :global(.swiper-button-next:after) {
            font-size: 10px;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
}
