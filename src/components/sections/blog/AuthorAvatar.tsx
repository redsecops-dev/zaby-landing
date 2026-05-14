import { type Accent } from "@/lib/blog";

export function AuthorAvatar({ initials, accent }: { initials: string; accent: Accent }) {
  const colors: Record<Accent, string> = {
    fuchsia: "bg-fuchsia-100 text-fuchsia-700",
    blue: "bg-blue-100 text-blue-700",
    teal: "bg-teal-100 text-teal-700",
  };
  return (
    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${colors[accent]}`}>
      {initials}
    </span>
  );
}
