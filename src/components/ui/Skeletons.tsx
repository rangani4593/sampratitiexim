const block = "animate-pulse rounded-[var(--radius-surface)] bg-surface-2";

export function ProductPageSkeleton() {
  return (
    <div className="shell pb-16 pt-3 md:pt-6" aria-busy="true" aria-label="Loading product">
      <div className="h-5 w-64 animate-pulse rounded-full bg-surface-2" />
      <div className="mt-5 grid gap-8 md:grid-cols-2 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className={`${block} aspect-square`} />
        <div className="grid content-start gap-4">
          <div className="h-5 w-40 animate-pulse rounded-full bg-surface-2" />
          <div className="h-10 w-4/5 animate-pulse rounded-xl bg-surface-2" />
          <div className={`${block} h-44`} />
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`${block} h-20`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GridPageSkeleton({ label = "Loading products" }: { label?: string }) {
  return (
    <div className="shell pb-16 pt-3 md:pt-6" aria-busy="true" aria-label={label}>
      <div className="h-5 w-56 animate-pulse rounded-full bg-surface-2" />
      <div className="mt-8 h-12 w-2/3 animate-pulse rounded-xl bg-surface-2 md:h-16" />
      <div className="mt-4 h-5 w-1/2 animate-pulse rounded-full bg-surface-2" />
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={`${block} aspect-[3/4]`} />
        ))}
      </div>
    </div>
  );
}
