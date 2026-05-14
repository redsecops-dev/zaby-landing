import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACCENT_STYLES, type Post } from "@/lib/blog";
import { AuthorAvatar } from "./AuthorAvatar";
import { CategoryBadge } from "./CategoryBadge";

export function PostCard({ post }: { post: Post }) {
  const styles = ACCENT_STYLES[post.accent];
  return (
    <article className="group flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-fuchsia-200 hover:shadow-lg hover:shadow-fuchsia-50 transition-all duration-300">
      {/* Accent bar + gradient top */}
      <div className={`relative h-36 bg-linear-to-br ${styles.gradient} flex items-center justify-center`}>
        <div className={`absolute top-0 left-0 right-0 h-1 ${styles.bar}`} />
        <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 ${styles.bar}`} />
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.bar}`}>
          <span className="text-white text-base font-bold">Z</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={post.category} accent={post.accent} />
          <span className="text-neutral-300">·</span>
          <time dateTime={post.isoDate} className="text-xs text-neutral-400">
            {post.date}
          </time>
        </div>

        <h3 className="text-base font-bold text-neutral-900 leading-snug mb-3 group-hover:text-fuchsia-700 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 flex-1 mb-5">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            <AuthorAvatar initials={post.authorInitials} accent={post.accent} />
            <span className="text-xs font-medium text-neutral-600">{post.author}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition-colors group/link"
          >
            Read more
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
