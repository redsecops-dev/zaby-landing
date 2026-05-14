import { ACCENT_STYLES, type Accent } from "@/lib/blog";

export function CategoryBadge({ category, accent }: { category: string; accent: Accent }) {
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${ACCENT_STYLES[accent].badge}`}>
      {category}
    </span>
  );
}
