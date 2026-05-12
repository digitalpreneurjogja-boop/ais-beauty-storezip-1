const NAVBAR_OFFSET = 84;

export function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
