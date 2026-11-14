/*
  Page scroll lock for overlays (search, enquiry sheet, lightbox).

  Ref-counted, so stacked overlays only unlock when the last one closes. The
  scrollbar's width is padded back onto <body> while locked, so on desktops with
  classic scrollbars the page does not jump sideways when an overlay opens.
*/

let count = 0;
let saved: { overflow: string; paddingRight: string } | null = null;

export function lockScroll(): () => void {
  if (typeof document === "undefined") return () => {};
  const body = document.body;

  if (count === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    saved = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }
  count += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    count -= 1;
    if (count === 0 && saved) {
      body.style.overflow = saved.overflow;
      body.style.paddingRight = saved.paddingRight;
      saved = null;
    }
  };
}
