import { getDomainWithoutWWW } from '@/lib/utils';
import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';
interface PreviewProps {
  data: {
    og_title: string;
    og_description: string;
    og_image: string;
    url: string;
  };
}
function Photo({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

export default function Preview({ data }: PreviewProps) {
  const { og_title, og_description, og_image, url } = data;
  const [debouncedUrl] = useDebounce(url, 500);
  const hostname = useMemo(() => {
    return getDomainWithoutWWW(debouncedUrl);
  }, [debouncedUrl]);
  return (
    <div className="overflow-hidden rounded-md border border-gray-300 w-full">
      {og_image ? (
        <img src={og_image} alt="Preview" className="h-[250px] w-full border-b border-gray-300 object-cover" />
      ) : (
        <div className="flex h-[250px] w-full flex-col items-center justify-center space-y-4 border-b border-gray-300 bg-gray-100">
          <Photo className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-400">請輸入連結網址來產生預覽</p>
        </div>
      )}
      <div className="grid gap-1 p-3">
        {hostname ? (
          <p className="text-sm text-[#536471]">{hostname}</p>
        ) : (
          <div className="mb-1 h-4 w-24 rounded-md bg-gray-100" />
        )}
        {og_title ? (
          <h3 className="truncate text-sm text-[#0f1419]">{og_title}</h3>
        ) : (
          <div className="mb-1 h-4 w-full rounded-md bg-gray-100" />
        )}
        {og_description ? (
          <p className="line-clamp-2 text-sm text-[#536471]">{og_description}</p>
        ) : (
          <div className="grid gap-2">
            <div className="h-4 w-full rounded-md bg-gray-100" />
            <div className="h-4 w-48 rounded-md bg-gray-100" />
          </div>
        )}
      </div>
    </div>
  );
}
