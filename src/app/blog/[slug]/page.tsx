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
import { SectionWrapper, Container } from "@/components/layout";
import { GlassPanel, GradientOrb, HeroBadge } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";

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
    badge: "bg-[var(--color-accent)]/10 text-[var(--color-accent-soft)] border border-[var(--color-accent)]/20",
    bar: "bg-[var(--color-accent-soft)]",
    gradient: "from-[var(--color-accent)]/15 via-purple-500/5 to-pink-500/10",
    avatar: "bg-[var(--color-accent)]/10 text-[var(--color-accent-soft)]",
    prose: "marker:text-[var(--color-accent-soft)]",
  },
  blue: {
    badge: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    bar: "bg-blue-500",
    gradient: "from-blue-500/15 via-sky-500/5 to-indigo-500/10",
    avatar: "bg-blue-500/10 text-blue-500",
    prose: "marker:text-blue-500",
  },
  teal: {
    badge: "bg-teal-500/10 text-teal-600 border border-teal-500/20",
    bar: "bg-teal-500",
    gradient: "from-teal-500/15 via-emerald-500/5 to-cyan-500/10",
    avatar: "bg-teal-500/10 text-teal-600",
    prose: "marker:text-teal-600",
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${accentStyles[accent].badge}`}
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
      <GlassPanel
        padding="none"
        className="relative aspect-4/3 rounded-3xl overflow-hidden border border-[var(--color-glass-border)] bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md shadow-lg"
      >
        <img src={image} alt={post.title} className="h-full w-full object-cover" />
      </GlassPanel>
    );
  }

  return (
    <GlassPanel
      padding="none"
      className={cn(
        "relative aspect-4/3 rounded-3xl overflow-hidden bg-linear-to-br border border-[var(--color-glass-border)] shadow-lg",
        styles.gradient
      )}
    >
      <div className={`absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-40 blur-2xl ${styles.bar}`} />
      <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-30 blur-xl ${styles.bar}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${styles.bar} shadow-2xl`}>
          <span className="text-white text-4xl font-bold">Z</span>
        </div>
      </div>
    </GlassPanel>
  );
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  const category = getCategoryName(post);
  const accent = getAccent(category);
  const image = getPostImage(post);
  const styles = accentStyles[accent];
  const href = `/blog/${post.id}`;

  return (
    <GlassPanel
      padding="none"
      className="group flex flex-col border border-[var(--color-glass-border)] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl overflow-hidden hover:border-[var(--color-accent-soft)]/40 hover:scale-[1.01] hover:shadow-xs transition-all duration-300 h-full"
    >
      <Link href={href} className="block cursor-pointer">
        {image ? (
          <div className="h-36 overflow-hidden bg-neutral-100">
            <img
              src={image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-350 group-hover:scale-103"
              loading="lazy"
            />
          </div>
        ) : (
          <div className={cn("relative h-36 bg-linear-to-br flex items-center justify-center w-full", styles.gradient)}>
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
          <span className="text-[var(--color-text-secondary)]/30">.</span>
          <time dateTime={post.publishedAt || post.createdAt} className="text-[11px] font-medium text-[var(--color-text-secondary)]/70">
            {formatDate(post.publishedAt || post.createdAt)}
          </time>
        </div>

        <Link href={href} className="cursor-pointer block mb-3">
          <h3 className="text-base font-bold text-[var(--color-text-primary)] leading-snug group-hover:text-[var(--color-accent-soft)] transition-colors line-clamp-2 font-display">
            {post.title}
          </h3>
        </Link>

        <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 flex-1 mb-5 font-light">
          {getExcerpt(post)}
        </p>

        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1 text-[11px] font-bold text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] transition-colors group/link cursor-pointer"
        >
          Read more
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </GlassPanel>
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
    <div className="min-h-screen">
      {/* Hero Header Section */}
      <SectionWrapper
        spacing="none"
        background="transparent"
        className="relative mt-20 sm:mt-30 flex items-center justify-center overflow-hidden"
      >
        {/* Background ambient glow orbs */}
        <GradientOrb
          color="purple"
          size="xl"
          className="absolute right-1/4 top-1/2 -translate-y-1/2 opacity-[0.08] dark:opacity-[0.05] pointer-events-none"
        />
        <GradientOrb
          color="pink"
          size="lg"
          className="absolute left-1/4 top-1/4 opacity-[0.06] dark:opacity-[0.03] pointer-events-none"
        />

        <Container size="lg" className="relative z-10 py-10 sm:py-16">
          {/* Breadcrumbs */}
          <ScrollReveal direction="up" delay={0.05}>
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]/60 mb-8 sm:mb-10">
              <Link href="/" className="hover:text-[var(--color-accent-soft)] transition-colors cursor-pointer">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[var(--color-accent-soft)] transition-colors cursor-pointer">
                Blog
              </Link>
              <span>/</span>
              <span className="text-[var(--color-text-primary)] line-clamp-1">{post.title}</span>
            </nav>
          </ScrollReveal>

          {/* Heading Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <ScrollReveal direction="up" delay={0.1}>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                  <CategoryBadge category={category} accent={accent} />
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]/80 text-xs sm:text-sm font-medium">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-accent-soft)]" />
                    {formatDate(publishedDate)}
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]/80 text-xs sm:text-sm font-medium">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-accent-soft)]" />
                    {calculateReadingTime(post.content)}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.15}>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-text-primary)] leading-[1.15] sm:leading-[1.1] tracking-tight mb-6 sm:mb-8 font-display">
                  {post.title}
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.18}>
                <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl font-light">
                  {getExcerpt(post)}
                </p>
              </ScrollReveal>
            </div>

            <div className="hidden lg:block">
              <ScrollReveal direction="up" delay={0.2}>
                <BlogHeroImage post={post} accent={accent} />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Main Content Article & Sidebar */}
      <SectionWrapper spacing="md" background="transparent" className="overflow-visible">
        <Container size="lg">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 sm:gap-16 md:gap-24">
            {/* Article Content */}
            <article className="max-w-none">
              <div
                className={cn(
                  "blog-content max-w-none text-[var(--color-text-primary)] font-light",
                  styles.prose,
                  "[&_p]:mb-6 [&_p]:text-base sm:[&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-[var(--color-text-secondary)]",
                  "[&_strong]:font-semibold [&_strong]:text-[var(--color-text-primary)]",
                  "[&_h2]:mt-10 sm:[&_h2]:mt-14 [&_h2]:mb-4 sm:[&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-[var(--color-border-strong)]/30 [&_h2]:pb-3 sm:[&_h2]:pb-4 [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[var(--color-text-primary)] [&_h2]:font-display",
                  "[&_h3]:mt-8 sm:[&_h3]:mt-10 [&_h3]:mb-3 sm:[&_h3]:mb-4 [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[var(--color-text-primary)] [&_h3]:font-display",
                  "[&_ul]:mb-8 [&_ul]:ml-5 sm:[&_ul]:ml-6 [&_ul]:list-disc [&_ol]:mb-8 [&_ol]:ml-5 sm:[&_ol]:ml-6 [&_ol]:list-decimal [&_li]:mb-3 [&_li_p]:mb-0 [&_li]:text-[var(--color-text-secondary)]",
                  "[&_hr]:my-10 sm:[&_hr]:my-12 [&_hr]:border-[var(--color-border-strong)]/30",
                  "[&_img]:my-6 sm:[&_img]:my-8 [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-[var(--color-border-strong)]/30 [&_img]:object-cover [&_img]:shadow-xs"
                )}
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            </article>

            {/* Sidebar Aside */}
            <aside>
              <div className="sticky top-32 space-y-10 sm:space-y-12 text-left">
                {/* Author Info */}
                <div className="pt-0">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]/60 mb-4">
                    Author
                  </h4>
                  <div className="flex items-center gap-4">
                    <AuthorAvatar author={post.author} accent={accent} />
                    <div>
                      <div className="text-sm font-bold text-[var(--color-text-primary)] font-display">{authorName}</div>
                      <div className="text-xs text-[var(--color-text-secondary)]/70 mt-0.5">
                        {post.author?.designation || "Zaby Team"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 ? (
                  <div className="pt-8 border-t border-[var(--color-border-strong)]/30">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]/60 mb-4">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-full border border-[var(--color-border-strong)]/40 bg-white/40 dark:bg-zinc-900/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Share Post */}
                <div className="pt-8 border-t border-[var(--color-border-strong)]/30">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]/60 mb-4">
                    Share post
                  </h4>
                  <div className="flex gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full border border-[var(--color-border-strong)]/60 flex items-center justify-center text-[var(--color-text-secondary)]/80 hover:border-[var(--color-accent-soft)] hover:text-[var(--color-accent-soft)] hover:bg-[var(--color-accent)]/10 transition-all duration-200 cursor-pointer"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full border border-[var(--color-border-strong)]/60 flex items-center justify-center text-[var(--color-text-secondary)]/80 hover:border-[var(--color-accent-soft)] hover:text-[var(--color-accent-soft)] hover:bg-[var(--color-accent)]/10 transition-all duration-200 cursor-pointer"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <Link
                      href={sharePath}
                      className="w-10 h-10 rounded-full border border-[var(--color-border-strong)]/60 flex items-center justify-center text-[var(--color-text-secondary)]/80 hover:border-[var(--color-accent-soft)] hover:text-[var(--color-accent-soft)] hover:bg-[var(--color-accent)]/10 transition-all duration-200 cursor-pointer"
                      aria-label="Open canonical link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </SectionWrapper>

      {/* Related Posts Section */}
      <SectionWrapper spacing="lg" background="transparent">
        <Container size="lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 text-left gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] mb-2 font-display">
                Related posts
              </h2>
              <p className="text-[var(--color-text-secondary)] text-sm sm:text-base font-light">
                More insights from the Zaby team.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer"
            >
              View all posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {relatedPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--color-border-strong)]/30 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-sm p-10 text-center text-sm text-[var(--color-text-secondary)]">
              More posts will appear here as the blog grows.
            </div>
          )}

          <div className="mt-10 sm:hidden text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer"
            >
              View all posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}
