/*
  The site's public origin — the one place canonical URLs, the sitemap, robots.txt,
  structured data and share links get it from.

  It must be the domain the new site is actually served on. It used to be
  www.sampratitiexim.in, which is still the old site: every page of the new one told
  search engines its "real" copy lived at a URL that does not exist there.
  Set NEXT_PUBLIC_SITE_URL in the hosting dashboard if the domain changes.
*/
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sampratitiexim.com").replace(/\/+$/, "");
