import { company } from "@/data/company";
import { industryPages } from "@/data/industries";
import { productTypes } from "@/lib/catalog";

const BASE = "https://www.sampratitiexim.in";

export function GET() {
  const lines = [
    `# ${company.name}`,
    "",
    "> Chemical importer, exporter, trader and bulk supplier based in Ahmedabad, Gujarat, India. Food, pharma, nutraceutical, industrial, agriculture and water treatment chemicals with COA and MSDS support and pan-India supply.",
    "",
    "## Company",
    `- Established: ${company.established}`,
    `- Office: ${company.office.lines.join(", ")}`,
    `- Warehouses: ${company.warehouses.map((w) => `${w.places.join(", ")} (${w.region})`).join("; ")}`,
    `- Phone and WhatsApp: +91 ${company.phoneDisplay} (${company.phoneOwner}), +91 ${company.altPhoneDisplay} (${company.altPhoneOwner})`,
    `- Email: ${company.email}`,
    `- GST: ${company.gst}`,
    `- Prices are quoted on request: use the inquiry form, WhatsApp or phone.`,
    "",
    "## Key pages",
    `- [Home](${BASE}/)`,
    `- [Products and services](${BASE}/products-and-services)`,
    `- [Industries](${BASE}/industry)`,
    `- [About us](${BASE}/about-us)`,
    `- [Quality and compliance](${BASE}/quality-and-compliance)`,
    `- [Contact](${BASE}/enquiry)`,
    "",
    "## Industries",
    ...industryPages.map((i) => `- [${i.title}](${BASE}/industry/${i.slug}): ${i.blurb}`),
    "",
    ...productTypes.flatMap((t) => ["## " + t.name, ...t.products.map((p) => `- [${p.name}](${BASE}/${p.slug}): ${p.short}`), ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
