"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { SectionWrapper, Container } from "@/components/layout";
import {
  GlassPanel,
  SectionHeading,
  GradientOrb,
  HeroBadge,
  GridBackground,
} from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const BLOGS_API_URL = "https://prod-api.zaby.io/api/v1/public/blogs";
const PAGE_SIZE = 9;
const FALLBACK_CATEGORY = "All";

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
  viewCount?: number;
  audioUrl?: string | null;
  status?: string;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt?: string;
  author?: BlogAuthor | null;
  category?: BlogCategory | null;
  tags?: BlogTag[];
};

type BlogApiResponse = {
  success: boolean;
  message?: string;
  data?: {
    data?: BlogPost[];
    pagination?: {
      total?: number;
      totalCount?: number;
      page?: number;
      limit?: number;
      totalPages?: number;
    };
  };
};

type Accent = "fuchsia" | "blue" | "teal";

const ACCENTS: Accent[] = ["fuchsia", "blue", "teal"];

const accentStyles: Record<
  Accent,
  { badge: string; bar: string; gradient: string; avatar: string }
> = {
  fuchsia: {
    badge: "bg-[var(--color-accent)]/10 text-[var(--color-accent-soft)] border border-[var(--color-accent)]/20",
    bar: "bg-[var(--color-accent-soft)]",
    gradient: "from-[var(--color-accent)]/15 via-purple-500/5 to-pink-500/10",
    avatar: "bg-[var(--color-accent)]/10 text-[var(--color-accent-soft)]",
  },
  blue: {
    badge: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    bar: "bg-blue-500",
    gradient: "from-blue-500/15 via-sky-500/5 to-indigo-500/10",
    avatar: "bg-blue-500/10 text-blue-500",
  },
  teal: {
    badge: "bg-teal-500/10 text-teal-600 border border-teal-500/20",
    bar: "bg-teal-500",
    gradient: "from-teal-500/15 via-emerald-500/5 to-cyan-500/10",
    avatar: "bg-teal-500/10 text-teal-600",
  },
};

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
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function calculateReadingTime(content?: string | null): string {
  const words = stripHtmlTags(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

async function fetchBlogs({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  const response = await fetch(`${BLOGS_API_URL}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Blog API error: ${response.status}`);
  }

  return (await response.json()) as BlogApiResponse;
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

function AuthorAvatar({ name, accent }: { name: string; accent: Accent }) {
  return (
    <span
      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${accentStyles[accent].avatar}`}
    >
      {getAuthorInitials(name)}
    </span>
  );
}

function BlogImage({
  post,
  accent,
  featured = false,
}: {
  post: BlogPost;
  accent: Accent;
  featured?: boolean;
}) {
  const imageUrl = getPostImage(post);
  const styles = accentStyles[accent];

  if (imageUrl) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-linear-to-br w-full",
          styles.gradient,
          featured ? "aspect-4/3 rounded-2xl" : "h-36"
        )}
      >
        <img
          src={imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-350 group-hover:scale-103"
          loading={featured ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-linear-to-br w-full",
        styles.gradient,
        featured ? "aspect-4/3 rounded-2xl border border-[var(--color-border-strong)]/20" : "h-36"
      )}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${styles.bar}`} />
      <div className={`absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-30 ${styles.bar}`} />
      <div className={`absolute bottom-4 left-4 w-24 h-24 rounded-full opacity-20 ${styles.bar}`} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.bar}`}>
          <span className="text-white text-xl font-bold">Z</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]/50">
          {getCategoryName(post)}
        </span>
      </div>
    </div>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const category = getCategoryName(post);
  const accent = getAccent(category);
  const author = getAuthorName(post);
  const href = `/blog/${post.id}`;

  return (
    <ScrollReveal direction="up" delay={0.1}>
      <GlassPanel
        padding="none"
        className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-8 md:p-10 mb-12 lg:mb-16 border border-[var(--color-glass-border)] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md rounded-3xl hover:scale-[1.005] hover:shadow-md transition-all duration-300 group"
      >
        <div className="order-2 lg:order-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <CategoryBadge category={category} accent={accent} />
            <span className="text-[var(--color-text-secondary)]/40 text-sm">.</span>
            <time dateTime={post.publishedAt || post.createdAt} className="text-xs text-[var(--color-text-secondary)]/70 font-medium">
              {formatDate(post.publishedAt || post.createdAt)}
            </time>
            <span className="text-[var(--color-text-secondary)]/40 text-sm hidden sm:inline">.</span>
            <span className="text-xs text-[var(--color-text-secondary)]/70 font-medium hidden sm:inline">{calculateReadingTime(post.content)}</span>
          </div>

          <Link href={href} className="group/title cursor-pointer block">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-text-primary)] leading-tight tracking-tight mb-4 group-hover/title:text-[var(--color-accent-soft)] transition-colors font-display">
              {post.title}
            </h2>
          </Link>

          <p className="text-[var(--color-text-secondary)] text-[14px] sm:text-[15px] leading-relaxed mb-6 line-clamp-3 sm:line-clamp-none font-light">
            {getExcerpt(post)}
          </p>

          <div className="flex items-center justify-between gap-5 pt-4 border-t border-[var(--color-border-strong)]/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <AuthorAvatar name={author} accent={accent} />
              <span className="text-xs font-semibold text-[var(--color-text-primary)] truncate">{author}</span>
            </div>

            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] transition-colors group/link shrink-0 cursor-pointer"
            >
              Read more
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <Link href={href} className="block order-1 lg:order-2 cursor-pointer w-full">
          <BlogImage post={post} accent={accent} featured />
        </Link>
      </GlassPanel>
    </ScrollReveal>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const category = getCategoryName(post);
  const accent = getAccent(category);
  const author = getAuthorName(post);
  const href = `/blog/${post.id}`;

  return (
    <ScrollReveal direction="up" delay={0.15}>
      <GlassPanel
        padding="none"
        className="group flex flex-col border border-[var(--color-glass-border)] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl overflow-hidden hover:border-[var(--color-accent-soft)]/40 hover:scale-[1.01] hover:shadow-xs transition-all duration-300 h-full"
      >
        <Link href={href} aria-label={post.title} className="cursor-pointer block">
          <BlogImage post={post} accent={accent} />
        </Link>

        <div className="flex flex-col flex-1 p-5 lg:p-6">
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

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--color-border-strong)]/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <AuthorAvatar name={author} accent={accent} />
              <span className="text-[11px] font-semibold text-[var(--color-text-primary)] truncate">{author}</span>
            </div>
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] transition-colors group/link shrink-0 cursor-pointer"
            >
              Read more
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </GlassPanel>
    </ScrollReveal>
  );
}

function PostSkeleton() {
  return (
    <GlassPanel
      padding="none"
      className="overflow-hidden rounded-2xl border border-[var(--color-glass-border)] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md p-5"
    >
      <div className="h-36 bg-[var(--color-border-strong)]/30 rounded-xl animate-pulse" />
      <div className="p-4">
        <div className="mb-4 h-4 w-28 rounded-full bg-[var(--color-border-strong)]/30 animate-pulse" />
        <div className="mb-3 h-5 w-full rounded bg-[var(--color-border-strong)]/30 animate-pulse" />
        <div className="mb-2 h-4 w-full rounded bg-[var(--color-border-strong)]/30 animate-pulse" />
        <div className="mb-6 h-4 w-2/3 rounded bg-[var(--color-border-strong)]/30 animate-pulse" />
        <div className="h-8 border-t border-[var(--color-border-strong)]/30 pt-4">
          <div className="h-4 w-32 rounded bg-[var(--color-border-strong)]/30 animate-pulse" />
        </div>
      </div>
    </GlassPanel>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState(FALLBACK_CATEGORY);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [search]);

  const loadBlogs = useCallback(async () => {
    const isFirstPage = page === 1;
    setError(null);
    setLoading(isFirstPage);
    setLoadingMore(!isFirstPage);

    try {
      const response = await fetchBlogs({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch,
      });

      if (!response.success) {
        throw new Error(response.message || "Unable to fetch blogs");
      }

      const responsePosts = response.data?.data ?? [];
      const pagination = response.data?.pagination;
      const nextTotal = pagination?.totalCount ?? pagination?.total ?? responsePosts.length;
      const totalPages = pagination?.totalPages ?? Math.ceil(nextTotal / PAGE_SIZE);

      setPosts((previousPosts) =>
        isFirstPage ? responsePosts : [...previousPosts, ...responsePosts]
      );
      setTotalResults(nextTotal);
      setHasMore(page < totalPages && responsePosts.length > 0);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Something went wrong while fetching blogs"
      );
      if (isFirstPage) {
        setPosts([]);
        setTotalResults(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadBlogs();
  }, [loadBlogs]);

  const categories = useMemo(() => {
    const names = posts
      .map((post) => getCategoryName(post))
      .filter((category, index, all) => all.indexOf(category) === index);

    return [FALLBACK_CATEGORY, ...names];
  }, [posts]);

  const selectedCategory =
    activeCategory !== FALLBACK_CATEGORY && !categories.includes(activeCategory)
      ? FALLBACK_CATEGORY
      : activeCategory;

  const filteredPosts = useMemo(() => {
    if (selectedCategory === FALLBACK_CATEGORY) return posts;
    return posts.filter((post) => getCategoryName(post) === selectedCategory);
  }, [selectedCategory, posts]);

  const featured = filteredPosts[0];
  const remaining = filteredPosts.slice(1);

  return (
    <>
      {/* Blog Page Hero Header Section */}
      <SectionWrapper
        spacing="none"
        background="transparent"
        className="relative mt-20 sm:mt-30 flex items-center justify-center overflow-hidden"
      >
        {/* Background ambient orbs */}
        <GradientOrb
          color="purple"
          size="xl"
          className="absolute left-1/3 top-1/2 -translate-y-1/2 opacity-[0.08] dark:opacity-[0.05] pointer-events-none"
        />
        <GradientOrb
          color="pink"
          size="lg"
          className="absolute right-1/4 top-1/4 opacity-[0.06] dark:opacity-[0.03] pointer-events-none"
        />

        <Container size="lg" className="relative z-10 py-10 sm:py-16">
          {/* Breadcrumbs */}
          <ScrollReveal direction="up" delay={0.05}>
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]/60 mb-6">
              <Link href="/" className="hover:text-[var(--color-accent-soft)] transition-colors cursor-pointer">
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--color-text-primary)]">Blog</span>
            </nav>
          </ScrollReveal>

          {/* Heading Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="flex flex-col items-start text-left">
                  <HeroBadge
                    text="Zaby Blog"
                    icon="solar:document-text-bold-duotone"
                    className="mb-4 inline-flex"
                  />
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-display mb-4">
                    Insights &{" "}
                    <span className="bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent font-semibold">
                      Updates
                    </span>
                  </h1>
                  <p className="text-[var(--color-text-secondary)] text-sm sm:text-base max-w-xl leading-relaxed font-light">
                    Deep dives on operational AI workforce automation, Multi-Agent squads, and enterprise scale infrastructure.
                  </p>
                </div>
              </ScrollReveal>

              {/* Search Bar */}
              <ScrollReveal direction="up" delay={0.15} className="w-full lg:w-80">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]/50 pointer-events-none" />
                  <Input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search articles..."
                    className="pl-11 pr-10 h-11 w-full rounded-full border border-[var(--color-border-strong)]/50 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm placeholder:text-[var(--color-text-secondary)]/50 text-[var(--color-text-primary)] focus:border-[var(--color-accent-soft)]/50 focus:bg-white/70 transition-all text-sm"
                    aria-label="Search articles"
                  />
                  {search ? (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]/60 transition-colors hover:text-[var(--color-text-primary)] cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
              </ScrollReveal>
            </div>

            {/* Category Filters */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex overflow-x-auto pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-wrap gap-2 scrollbar-hide">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border shrink-0 cursor-pointer",
                        isSelected
                          ? "bg-[var(--color-accent-soft)] text-white border-[var(--color-accent-soft)] shadow-sm shadow-[var(--color-accent-soft)]/20"
                          : "bg-white/40 border-[var(--color-border-strong)]/40 text-[var(--color-text-secondary)] hover:border-[var(--color-accent-soft)]/40 hover:text-[var(--color-accent-soft)] backdrop-blur-sm dark:bg-zinc-900/20"
                      )}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </SectionWrapper>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 md:py-20 relative z-10">
        {debouncedSearch ? (
          <div className="mb-8 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]/70">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-[var(--color-accent-soft)]" />
                Searching articles...
              </span>
            ) : (
              <span>
                {totalResults} article{totalResults === 1 ? "" : "s"} found for &quot;{debouncedSearch}&quot;
              </span>
            )}
          </div>
        ) : null}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-[var(--color-accent-soft)]">Z</span>
            </div>
            <p className="text-[var(--color-text-primary)] text-sm font-semibold">Unable to load blogs right now.</p>
            <p className="text-[var(--color-text-secondary)] text-sm mt-1">{error}</p>
            <Button
              type="button"
              onClick={() => void loadBlogs()}
              className="mt-6 rounded-full bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-hover)] px-6 py-2.5 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Try again
            </Button>
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            {featured ? <FeaturedPost post={featured} /> : null}

            {remaining.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {remaining.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : null}

            {hasMore && selectedCategory === FALLBACK_CATEGORY ? (
              <div className="mt-16 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  disabled={loadingMore}
                  className="rounded-full border border-[var(--color-border-strong)]/60 bg-white/40 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 text-[var(--color-text-primary)] px-8 h-11 font-semibold transition-all cursor-pointer"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-[var(--color-accent-soft)]" />
                      Loading...
                    </>
                  ) : (
                    "Load more posts"
                  )}
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-[var(--color-accent-soft)]">Z</span>
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm">
              {debouncedSearch ? "No posts matched your search." : "No posts in this category yet."}
            </p>
          </div>
        )}

        {/* Newsletter CTA Banner */}
        <section className="relative mt-24 lg:mt-32 flex items-center justify-center text-center overflow-hidden">
          {/* Background ambient orbs */}
          <GradientOrb
            color="purple"
            size="lg"
            className="absolute -left-32 bottom-0 opacity-[0.08] dark:opacity-[0.05] pointer-events-none"
          />
          <GradientOrb
            color="pink"
            size="lg"
            className="absolute -right-32 top-0 opacity-[0.08] dark:opacity-[0.05] pointer-events-none"
          />

          <GlassPanel
            padding="none"
            className="relative w-full max-w-5xl bg-white/40 dark:bg-zinc-950/20 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] border border-[var(--color-border-strong)]/40 shadow-xs overflow-hidden p-8 sm:p-12 md:p-16 lg:p-20"
          >
            {/* Subtle dots background */}
            <GridBackground variant="dots" opacity="light" className="opacity-[0.02] z-0" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-zinc-900/60 border border-[var(--color-border-strong)]/40 rounded-full px-3.5 py-1.5 mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-soft)] shadow-[0_0_8px_rgba(217,70,239,0.8)] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-soft)]">
                  Stay Updated
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight font-display">
                Get the latest from Zaby
              </h2>
              <p className="text-[var(--color-text-secondary)] text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10 font-light">
                Insights on operational AI, assessments, automation, and enterprise infrastructure delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 px-5 h-12 rounded-full border border-[var(--color-border-strong)]/50 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-accent-soft)]/50 focus:bg-white/70 transition-all w-full text-sm"
                />
                <Button className="h-12 rounded-full bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-hover)] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[var(--color-accent)]/15 transition-all whitespace-nowrap cursor-pointer w-full sm:w-auto px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </GlassPanel>
        </section>
      </main>
    </>
  );
}
