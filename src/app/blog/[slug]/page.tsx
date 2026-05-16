import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Link as LinkIcon,
} from "lucide-react";
import {
  LinkedinIcon as Linkedin,
  TwitterIcon as Twitter,
} from "@/components/shared/icons";
import { FooterSection } from "@/components/sections";

export const dynamic = "force-dynamic";

const BLOGS_API_URL = "https://prod-api.zaby.io/api/v1/public/blogs";

type BlogAuthor = {
  id: string;
  name?: string | null;
  image?: string | null;
  designation?: string | null;
};

type BlogCategory = {
  id: string;
  name?: string | null;
  slug?: string | null;
};

type BlogTag = {
  id: string;
  name: string;
};

type BlogPost = {
  id: string;
  title: string;
  content?: string | null;
  slug?: string | null;
  featuredImage?: string | null;
  excerpt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  audioUrl?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt?: string;
  author?: BlogAuthor | null;
  category?: BlogCategory | null;
  tags?: BlogTag[];
};

type BlogApiResponse = {
  success: boolean;
  data?: {
    data?: BlogPost[];
  };
};

type Accent = "fuchsia" | "blue" | "teal";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const ACCENTS: Accent[] = ["fuchsia", "blue", "teal"];

const accentStyles: Record<
  Accent,
  { badge: string; bar: string; gradient: string; avatar: string; prose: string }
> = {
  fuchsia: {
    badge: "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100",
    bar: "bg-fuchsia-500",
    gradient: "from-fuchsia-100 via-purple-50 to-pink-100",
    avatar: "bg-fuchsia-100 text-fuchsia-700",
    prose: "marker:text-fuchsia-500",
  },
  blue: {
    badge: "bg-blue-50 text-blue-700 border border-blue-100",
    bar: "bg-blue-500",
    gradient: "from-blue-100 via-sky-50 to-indigo-100",
    avatar: "bg-blue-100 text-blue-700",
    prose: "marker:text-blue-500",
  },
  teal: {
    badge: "bg-teal-50 text-teal-700 border border-teal-100",
    bar: "bg-teal-500",
    gradient: "from-teal-100 via-emerald-50 to-cyan-100",
    avatar: "bg-teal-100 text-teal-700",
    prose: "marker:text-teal-500",
  },
};

async function fetchBlogPage(page = 1, limit = 100): Promise<BlogPost[]> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`${BLOGS_API_URL}?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) return [];

  const result = (await response.json()) as BlogApiResponse;
  return result.success ? result.data?.data ?? [] : [];
}

async function getBlogByIdentifier(identifier: string): Promise<BlogPost | null> {
  const posts = await fetchBlogPage();
  return (
    posts.find((post) => post.id === identifier) ??
    posts.find((post) => post.slug === identifier) ??
    null
  );
}

async function getRelatedBlogs(currentPost: BlogPost, count = 3): Promise<BlogPost[]> {
  const posts = await fetchBlogPage(1, 12);
  const currentCategory = getCategoryName(currentPost);
  const sameCategory = posts.filter(
    (post) => post.id !== currentPost.id && getCategoryName(post) === currentCategory
  );
  const otherPosts = posts.filter(
    (post) => post.id !== currentPost.id && getCategoryName(post) !== currentCategory
  );

  return [...sameCategory, ...otherPosts].slice(0, count);
}

function getAccent(category?: string | null): Accent {
  if (!category) return "fuchsia";

  let hash = 0;
  for (let i = 0; i < category.length; i += 1) {
    hash = (hash + category.charCodeAt(i)) % ACCENTS.length;
  }

  return ACCENTS[hash];
}

function stripHtmlTags(html?: string | null): string {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFirstImage(content?: string | null): string | null {
  if (!content) return null;

  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function getPostImage(post: BlogPost): string | null {
  return post.featuredImage || extractFirstImage(post.content);
}

function getExcerpt(post: BlogPost): string {
  if (post.excerpt?.trim()) return post.excerpt;

  const plainText = stripHtmlTags(post.content);
  return plainText.length > 170 ? `${plainText.slice(0, 170)}...` : plainText;
}

function getCategoryName(post: BlogPost): string {
  return post.category?.name?.trim() || "Zaby";
}

function getAuthorName(post: BlogPost): string {
  return post.author?.name?.trim() || "Zaby Team";
}

function getAuthorInitials(name: string): string {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return initials || "ZT";
}

function formatDate(dateString?: string | null): string {
  if (!dateString) return "Recently";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function calculateReadingTime(content?: string | null): string {
  const words = stripHtmlTags(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function CategoryBadge({
  category,
  accent,
}: {
  category: string;
  accent: Accent;
}) {
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${accentStyles[accent].badge}`}
    >
      {category}
    </span>
  );
}

function AuthorAvatar({
  author,
  accent,
}: {
  author?: BlogAuthor | null;
  accent: Accent;
}) {
  const name = author?.name?.trim() || "Zaby Team";

  if (author?.image) {
    return (
      <img
        src={author.image}
        alt={name}
        className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
      />
    );
  }

  return (
    <span
      className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${accentStyles[accent].avatar}`}
    >
      {getAuthorInitials(name)}
    </span>
  );
}

function BlogHeroImage({ post, accent }: { post: BlogPost; accent: Accent }) {
  const image = getPostImage(post);
  const styles = accentStyles[accent];

  if (image) {
    return (
      <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-lg shadow-fuchsia-100/40">
        <img src={image} alt={post.title} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-4/3 rounded-3xl overflow-hidden bg-linear-to-br ${styles.gradient} border border-neutral-200 shadow-lg shadow-fuchsia-100/40`}
    >
      <div className={`absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-40 blur-2xl ${styles.bar}`} />
      <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-30 blur-xl ${styles.bar}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${styles.bar} shadow-2xl`}>
          <span className="text-white text-4xl font-bold">Z</span>
        </div>
      </div>
    </div>
  );
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  const category = getCategoryName(post);
  const accent = getAccent(category);
  const image = getPostImage(post);
  const styles = accentStyles[accent];
  const href = `/blog/${post.id}`;

  return (
    <article className="group flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-fuchsia-200 hover:shadow-lg hover:shadow-fuchsia-50 transition-all duration-300">
      <Link href={href} className="block">
        {image ? (
          <div className="h-36 overflow-hidden bg-neutral-100">
            <img
              src={image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className={`relative h-36 bg-linear-to-br ${styles.gradient} flex items-center justify-center`}>
            <div className={`absolute top-0 left-0 right-0 h-1 ${styles.bar}`} />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.bar}`}>
              <span className="text-white text-base font-bold">Z</span>
            </div>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={category} accent={accent} />
          <span className="text-neutral-300">.</span>
          <time dateTime={post.publishedAt || post.createdAt} className="text-xs text-neutral-400">
            {formatDate(post.publishedAt || post.createdAt)}
          </time>
        </div>

        <Link href={href}>
          <h3 className="text-base font-bold text-neutral-900 leading-snug mb-3 group-hover:text-fuchsia-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 flex-1 mb-5">
          {getExcerpt(post)}
        </p>

        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition-colors group/link"
        >
          Read more
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogByIdentifier(slug);

  if (!post) {
    return {
      title: "Post Not Found | Zaby Blog",
    };
  }

  return {
    title: post.metaTitle || `${post.title} | Zaby Blog`,
    description: post.metaDescription || post.excerpt || stripHtmlTags(post.content).slice(0, 160),
    keywords: post.metaKeywords || undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogByIdentifier(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogs(post);
  const category = getCategoryName(post);
  const accent = getAccent(category);
  const styles = accentStyles[accent];
  const authorName = getAuthorName(post);
  const publishedDate = post.publishedAt || post.createdAt;
  const sharePath = `/blog/${post.id}`;
  const shareUrl = `https://zaby.io${sharePath}`;

  return (
    <div className=" min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div
          className={`absolute top-0 right-0 w-[520px] h-[520px] bg-linear-to-br ${styles.gradient} opacity-60 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4`}
        />
        <div
          className={`absolute bottom-0 left-0 w-[320px] h-[320px] bg-linear-to-br ${styles.gradient} opacity-50 blur-2xl rounded-full translate-y-1/2 -translate-x-1/4`}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-10">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-black transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-neutral-400 line-clamp-1">{post.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <CategoryBadge category={category} accent={accent} />
                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {formatDate(publishedDate)}
                </div>
                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                  <Clock className="w-4 h-4" />
                  {calculateReadingTime(post.content)}
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-950 leading-[1.1] tracking-tight mb-8">
                {post.title}
              </h1>

              <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
                {getExcerpt(post)}
              </p>
            </div>

            <div className="hidden lg:block">
              <BlogHeroImage post={post} accent={accent} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24">
          <div className="grid lg:grid-cols-[1fr_300px] gap-16 md:gap-24">
            <article className="max-w-none">
              <div
                className={`blog-content max-w-none text-neutral-700 ${styles.prose} [&_p]:mb-6 [&_p]:text-lg [&_p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-neutral-900 [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-neutral-100 [&_h2]:pb-4 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-neutral-900 [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-neutral-900 [&_ul]:mb-8 [&_ul]:ml-6 [&_ul]:list-disc [&_ol]:mb-8 [&_ol]:ml-6 [&_ol]:list-decimal [&_li]:mb-3 [&_li_p]:mb-0 [&_hr]:my-12 [&_hr]:border-neutral-200 [&_img]:my-8 [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-neutral-100 [&_img]:object-cover [&_img]:shadow-sm`}
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            </article>

            <aside>
              <div className="sticky top-32 space-y-12">
                <div className="pt-0">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">
                    Author
                  </h4>
                  <div className="flex items-center gap-4">
                    <AuthorAvatar author={post.author} accent={accent} />
                    <div>
                      <div className="text-sm font-bold text-neutral-900">{authorName}</div>
                      <div className="text-xs text-neutral-500">
                        {post.author?.designation || "Zaby Team"}
                      </div>
                    </div>
                  </div>
                </div>

                {post.tags && post.tags.length > 0 ? (
                  <div className="pt-8 border-t border-neutral-100">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="pt-8 border-t border-neutral-100">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">
                    Share post
                  </h4>
                  <div className="flex gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-fuchsia-200 hover:text-fuchsia-600 hover:bg-fuchsia-50 transition-all"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-fuchsia-200 hover:text-fuchsia-600 hover:bg-fuchsia-50 transition-all"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <Link
                      href={sharePath}
                      className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-fuchsia-200 hover:text-fuchsia-600 hover:bg-fuchsia-50 transition-all"
                      aria-label="Open canonical blog link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

       <section className="relative mb-10 flex items-center justify-center text-center overflow-x-hidden text-(--foreground) antialiased selection:bg-white/30 selection:text-black">
          <div className="w-full max-w-7xl bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-10 lg:p-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Related posts</h2>
              <p className="text-neutral-500">More insights from the Zaby team.</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition-colors"
            >
              View all posts
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          {relatedPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center text-sm text-neutral-500">
              More posts will appear here as the blog grows.
            </div>
          )}

          <div className="mt-12 sm:hidden text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition-colors"
            >
              View all posts
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
