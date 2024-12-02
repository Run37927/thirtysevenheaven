import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}wk',
  xWeeks: '{{count}}wk',
  aboutXMonths: '{{count}}mo',
  xMonths: '{{count}}mo',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token, count, options) {
  options = options || {}

  const result = formatDistanceLocale[
    token
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date) {
  if (!date || isNaN(new Date(date).getTime())) {
    return 'Invalid date';
  }

  // If 'date' is valid, format it
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

export function constructMetadata({
  title = "37 Heaven - A collection of all things 37",
  description = "A crowdsourced collection for the number 37 enthusiasts.",
  image = "/heaven.png",
  icons = "/favicon.ico",
} = {}) {
  return {
    title,
    description,
    icons,
    openGraph: {
      title,
      description,
      siteName: '37 Heaven',
      url: 'https://www.37heaven.xyz',
      images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@hairunhuang",
    },
    metadataBase: [new URL('https://www.37heaven.xyz'), new URL('https://37heaven.xyz')]
  };
}