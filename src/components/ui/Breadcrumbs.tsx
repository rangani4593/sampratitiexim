import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "./Icon";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  const all = [{ href: "/", label: "Home" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `https://www.sampratitiexim.in${it.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="no-scrollbar -mx-4 overflow-x-auto px-4">
      <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm text-ink-3">
        {all.map((it, i) => (
          <li key={`${it.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <Icon icon={ArrowRight01Icon} size={14} className="opacity-60" />}
            {it.href && i < all.length - 1 ? (
              <Link href={it.href} className="hover:text-ink">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-2">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={jsonLd} />
    </nav>
  );
}
