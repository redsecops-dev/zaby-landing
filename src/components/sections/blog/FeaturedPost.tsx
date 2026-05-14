import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACCENT_STYLES, type Post } from "@/lib/blog";
import { AuthorAvatar } from "./AuthorAvatar";
import { CategoryBadge } from "./CategoryBadge";

export function FeaturedPost({ post }: { post: Post }) {
  const styles = ACCENT_STYLES[post.accent];
  return (
    <article className="grid lg:grid-cols-2 gap-10 items-center border-b border-neutral-200 pb-14 mb-14">
      {/* Left */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <CategoryBadge category={post.category} accent={post.accent} />
          <span className="text-neutral-400 text-sm">·</span>
          <time dateTime={post.isoDate} className="text-sm text-neutral-400">
            {post.date}
          </time>
          <span className="text-neutral-400 text-sm">·</span>
          <span className="text-sm text-neutral-400">{post.readTime}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight tracking-tight mb-5">
          {post.title}
        </h2>

        <p className="text-neutral-600 text-[15px] leading-relaxed mb-8">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AuthorAvatar initials={post.authorInitials} accent={post.accent} />
            <span className="text-sm font-medium text-neutral-700">{post.author}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition-colors group"
          >
            Read more
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Right — gradient illustration placeholder */}
      <div
        className={`relative rounded-2xl overflow-hidden aspect-4/3 bg-linear-to-br ${styles.gradient} border border-neutral-100`}
      >
        {/* Decorative circles */}
        <div className={`absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-30 ${styles.bar}`} />
        <div className={`absolute bottom-4 left-4 w-24 h-24 rounded-full opacity-20 ${styles.bar}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl opacity-25 rotate-12 ${styles.bar}`} />

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.bar}`}>
            <span className="text-white text-xl font-bold">Z</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            {post.category}
          </span>
        </div>
      </div>
    </article>
  );
}
