import type { MetadataRoute } from "next";

const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: ["/", "/llms.txt"], disallow: ["/api/"] },
    ],
    sitemap: "https://www.sampratitiexim.in/sitemap.xml",
    host: "https://www.sampratitiexim.in",
  };
}
