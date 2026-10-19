import type { Metadata } from "next";
import { PageIntro } from "@/components/company/PageIntro";
import { PhotoGrid } from "@/components/company/PhotoGrid";
import { PhotoBrowser, type Photo } from "@/components/media/PhotoBrowser";
import { companyPhotos } from "@/data/company";
import { allProducts, families, formatPrice, photoCount, primaryFamily, productHref, unitLabel } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Photos",
  description: `${photoCount} product photos of sucralose, aspartame, TCCA 90, xanthan gum, citric acid and more from Sampratiti Exim, Ahmedabad.`,
  alternates: { canonical: "/photos" },
};

export default function PhotosPage() {
  const photos: Photo[] = allProducts.flatMap(({ category, product }) =>
    product.images.map((src) => ({
      src,
      name: product.name,
      href: productHref(category.slug, product.slug),
      group: primaryFamily(category).name,
      price: product.price ? `${formatPrice(product.price)} / ${unitLabel(product.unit)}` : "Price on request",
    })),
  );

  return (
    <>
      <PageIntro title="Photos" lead={`${photoCount} product photos and our warehouse, infrastructure and certificates.`} />
      <section className="shell pb-14">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Company</h2>
        <PhotoGrid photos={companyPhotos} />
      </section>
      <section className="shell pb-20">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight md:text-3xl">Products</h2>
        <PhotoBrowser photos={photos} groups={families.map((f) => f.name)} />
      </section>
    </>
  );
}
