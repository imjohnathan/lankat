import ogImage from '@/public/og.jpg';
import { clsx, type ClassValue } from 'clsx';
import { Metadata } from 'next';
import { NextRequest } from 'next/server';
import { twMerge } from 'tailwind-merge';
import { SECOND_LEVEL_DOMAINS, SPECIAL_APEX_DOMAINS, ccTLDs } from './constants';
export * from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export function dateFormat(date: string | Date) {
  const datetime = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  return datetime.toLocaleString('zh-TW', options);
}

export const getDomainWithoutWWW = (url: string) => {
  if (isValidUrl(url)) {
    return new URL(url).hostname.replace(/^www\./, '');
  }
  try {
    if (url.includes('.') && !url.includes(' ')) {
      return new URL(`https://${url}`).hostname.replace(/^www\./, '');
    }
  } catch (e) {
    return null;
  }
};

export const paramsMetadata = [
  { display: 'Referral (ref)', key: 'ref', examples: 'twitter, facebook' },
  { display: 'UTM Source', key: 'utm_source', examples: 'twitter, facebook' },
  { display: 'UTM Medium', key: 'utm_medium', examples: 'social, email' },
  { display: 'UTM Campaign', key: 'utm_campaign', examples: 'summer_sale' },
  { display: 'UTM Term', key: 'utm_term', examples: 'blue_shoes' },
  { display: 'UTM Content', key: 'utm_content', examples: 'logolink' }
];

export const getUrlWithoutUTMParams = (url: string) => {
  try {
    const newURL = new URL(url);
    paramsMetadata.forEach((param) => newURL.searchParams.delete(param.key));
    return newURL.toString();
  } catch (e) {
    return url;
  }
};

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};

export const getExtensionFromBase64 = (base64String: string) => {
  const match = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (match && match.length > 1) {
    const mimeType: string = match[1];
    const extensions: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif'
    };

    return extensions[mimeType] || null;
  }

  return null;
};

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const parse = (req: NextRequest) => {
  let domain = req.headers.get('host') as string;
  domain = domain.replace('www.', ''); // remove www. from domain
  if (domain === 'localhost:3000' || domain.endsWith('.vercel.app')) {
    // for local development and preview URLs
    domain = 'lank.at';
  }

  // path is the path of the URL (e.g. dub.co/stats/github -> /stats/github)
  let path = req.nextUrl.pathname;

  // fullPath is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString();
  const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  const key = decodeURIComponent(path.split('/')[1]); // key is the first part of the path (e.g. dub.co/stats/github -> stats)
  const fullKey = decodeURIComponent(path.slice(1)); // fullKey is the full path without the first slash (to account for multi-level subpaths, e.g. dub.sh/github/repo -> github/repo)

  return { domain, path, fullPath, key, fullKey };
};

export const detectBot = (req: NextRequest) => {
  const url = req.nextUrl;
  if (url.searchParams.get('bot')) return true;
  const ua = req.headers.get('User-Agent');
  if (ua) {
    /* Note:
     * - bot is for most bots & crawlers
     * - ChatGPT is for ChatGPT
     * - facebookexternalhit is for Facebook crawler
     * - WhatsApp is for WhatsApp crawler
     * - MetaInspector is for https://metatags.io/
     */
    return /bot|chatgpt|facebookexternalhit|WhatsApp|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(
      ua
    );
  }
  return false;
};

export const getFinalUrl = (target: string, { req }: { req: NextRequest }) => {
  // query is the query string (e.g. dub.sh/github?utm_source=twitter -> ?utm_source=twitter)
  const searchParams = req.nextUrl.searchParams;

  // get the query params of the target url
  const targetUrl = new URL(decodeURIComponent(target));

  // @ts-ignore – until https://github.com/microsoft/TypeScript/issues/54466 is fixed
  if (searchParams.size === 0) return targetUrl.toString(); // if there are no query params, then return the target url as is (no need to parse it)

  // if searchParams (type: `URLSearchParams`) has the same key as target url, then overwrite it
  for (const [key, value] of searchParams) {
    targetUrl.searchParams.set(key, value);
  }

  // construct final url
  const finalUrl = targetUrl.toString();

  return finalUrl;
};

export const addParamsToURL = (baseURL: string, params: { [key: string]: string }): string => {
  if (typeof params !== 'object') return baseURL;
  const url = new URL(baseURL);
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  return url.toString();
};

export const getSearchParams = (url: string) => {
  // Create a params object
  let params = {} as Record<string, string>;

  new URL(url).searchParams.forEach(function (val, key) {
    params[key] = val;
  });

  return params;
};

export function constructMetadata({
  title = 'Lank.at 任意門 | 用你最喜歡的樣子，展現你的網路人格',
  description = 'Lank.at 任意門 使用在宣傳個人社群媒體的管道、或是正在開團購的連結全部放這一個頁面中，簡單的分享給你的朋友們',
  image = ogImage.src,
  icons = '/favicon.png',
  noIndex = false
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: 'johnathan'
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? ''),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  };
}

export const getApexDomain = (url: string) => {
  let domain;
  try {
    // replace any custom scheme (e.g. notion://) with https://
    // use the URL constructor to get the hostname
    domain = new URL(url.replace(/^[a-zA-Z]+:\/\//, 'https://')).hostname;
  } catch (e) {
    return '';
  }
  if (domain === 'youtu.be') return 'youtube.com';
  if (domain === 'raw.githubusercontent.com') return 'github.com';
  if (domain.endsWith('.vercel.app')) return 'vercel.app';

  const parts = domain.split('.');
  if (parts.length > 2) {
    if (
      // if this is a second-level TLD (e.g. co.uk, .com.ua, .org.tt), we need to return the last 3 parts
      (SECOND_LEVEL_DOMAINS.has(parts[parts.length - 2]) && ccTLDs.has(parts[parts.length - 1])) ||
      // if it's a special subdomain for website builders (e.g. weathergpt.vercel.app/)
      SPECIAL_APEX_DOMAINS.has(parts.slice(-2).join('.'))
    ) {
      return parts.slice(-3).join('.');
    }
    // otherwise, it's a subdomain (e.g. dub.vercel.app), so we return the last 2 parts
    return parts.slice(-2).join('.');
  }
  // if it's a normal domain (e.g. dub.co), we return the domain
  return domain;
};

export function nFormatter(
  num?: number,
  opts: { digits?: number; full?: boolean } = {
    digits: 1
  }
) {
  if (!num) return '0';
  if (opts.full) {
    return Intl.NumberFormat('en-US').format(num);
  }
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item ? (num / item.value).toFixed(opts.digits).replace(rx, '$1') + item.symbol : '0';
}

interface SWRError extends Error {
  status: number;
}

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = await res.text();
    const err = new Error(error) as SWRError;
    err.status = res.status;
    throw err;
  }

  return res.json();
}

export function linkConstructor({
  key,
  domain = process.env.NEXT_PUBLIC_SHORT_URL?.replace(/^https?:\/\//, '') + '/s',
  localhost,
  pretty,
  noDomain
}: {
  key: string;
  domain?: string;
  localhost?: boolean;
  pretty?: boolean;
  noDomain?: boolean;
}) {
  const link = `${localhost ? 'http://home.localhost:8888' : `https://${domain}`}${key !== '_root' ? `/${key}` : ''}`;

  if (noDomain) return `/${key}`;
  return pretty ? link.replace(/^https?:\/\//, '') : link;
}

export const getDeployGraphqlEndpoint = () => {
  const isVercelProduction = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV === 'production');
  if (isVercelProduction) return 'https://lank.at/api';
  return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
};

export const getUserPageUrl = (url_key: string) => {
  return `${process.env.NEXT_PUBLIC_SHORT_URL}/u/${url_key}`;
};
