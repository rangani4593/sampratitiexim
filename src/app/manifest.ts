import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sampratiti Exim Pvt Ltd",
    short_name: "Sampratiti",
    description: "Importer and bulk supplier of food, pharma, industrial and water treatment chemicals from Ahmedabad.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1823",
    theme_color: "#1e435e",
    lang: "en-IN",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
