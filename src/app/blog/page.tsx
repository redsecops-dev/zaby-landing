"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Loader2,
  Search,
  X,
} from "lucide-react";

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
    badge: "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100",
    bar: "bg-fuchsia-500",
    gradient: "from-fuchsia-100 via-purple-50 to-pink-100",
    avatar: "bg-fuchsia-100 text-fuchsia-700",
  },
  blue: {
    badge: "bg-blue-50 text-blue-700 border border-blue-100",
    bar: "bg-blue-500",
    gradient: "from-blue-100 via-sky-50 to-indigo-100",
    avatar: "bg-blue-100 text-blue-700",
  },
  teal: {
    badge: "bg-teal-50 text-teal-700 border border-teal-100",
    bar: "bg-teal-500",
    gradient: "from-teal-100 via-emerald-50 to-cyan-100",
    avatar: "bg-teal-100 text-teal-700",
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
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${accentStyles[accent].badge}`}
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
        className={`relative overflow-hidden bg-linear-to-br ${styles.gradient} ${
          featured ? "aspect-4/3 rounded-2xl" : "h-36"
        }`}
      >
        <img
          src={imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading={featured ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-linear-to-br ${styles.gradient} ${
        featured ? "aspect-4/3 rounded-2xl border border-neutral-100" : "h-36"
      }`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${styles.bar}`} />
      <div className={`absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-30 ${styles.bar}`} />
      <div className={`absolute bottom-4 left-4 w-24 h-24 rounded-full opacity-20 ${styles.bar}`} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.bar}`}>
          <span className="text-white text-xl font-bold">Z</span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
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
    <article className="grid lg:grid-cols-2 gap-10 items-center border-b border-neutral-200 pb-14 mb-14">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <CategoryBadge category={category} accent={accent} />
          <span className="text-neutral-400 text-sm">.</span>
          <time dateTime={post.publishedAt || post.createdAt} className="text-sm text-neutral-400">
            {formatDate(post.publishedAt || post.createdAt)}
          </time>
          <span className="text-neutral-400 text-sm">.</span>
          <span className="text-sm text-neutral-400">{calculateReadingTime(post.content)}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight tracking-tight mb-5">
          {post.title}
        </h2>

        <p className="text-neutral-600 text-[15px] leading-relaxed mb-8">
          {getExcerpt(post)}
        </p>

        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2.5 min-w-0">
            <AuthorAvatar name={author} accent={accent} />
            <span className="text-sm font-medium text-neutral-700 truncate">{author}</span>
          </div>

          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition-colors group/link shrink-0"
          >
            Read more
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <Link href={href} className="group block">
        <BlogImage post={post} accent={accent} featured />
      </Link>
    </article>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const category = getCategoryName(post);
  const accent = getAccent(category);
  const author = getAuthorName(post);
  const href = `/blog/${post.id}`;

  return (
    <article className="group flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-fuchsia-200 hover:shadow-lg hover:shadow-fuchsia-50 transition-all duration-300">
      <Link href={href} aria-label={post.title}>
        <BlogImage post={post} accent={accent} />
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

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-2 min-w-0">
            <AuthorAvatar name={author} accent={accent} />
            <span className="text-xs font-medium text-neutral-600 truncate">{author}</span>
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition-colors group/link shrink-0"
          >
            Read more
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function PostSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="h-36 bg-neutral-100 animate-pulse" />
      <div className="p-5">
        <div className="mb-4 h-4 w-28 rounded-full bg-neutral-100 animate-pulse" />
        <div className="mb-3 h-5 w-full rounded bg-neutral-100 animate-pulse" />
        <div className="mb-2 h-4 w-full rounded bg-neutral-100 animate-pulse" />
        <div className="mb-6 h-4 w-2/3 rounded bg-neutral-100 animate-pulse" />
        <div className="h-8 border-t border-neutral-100 pt-4">
          <div className="h-4 w-32 rounded bg-neutral-100 animate-pulse" />
        </div>
      </div>
    </article>
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
      <section
        ref={sectionRef}
        className="relative mt-30 flex items-center justify-center overflow-x-hidden px-4 text-(--foreground) antialiased selection:bg-white/30 selection:text-black"
      >
        <div className="w-full max-w-7xl bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-4 md:p-6 lg:p-8">
          <div className="p-6 sm:p-10">
            <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
              <Link href="/" className="hover:text-fuchsia-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-neutral-600">Blog</span>
            </nav>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-fuchsia-50 border border-fuchsia-100 rounded-full px-3 py-1 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-fuchsia-600">
                      Zaby Blog
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-3">
                    All posts
                  </h1>
                  <p className="text-neutral-500 text-base max-w-xl leading-relaxed">
                    Insights on operational AI, online assessments, technical hiring, and AI-native execution.
                  </p>
                </div>

                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search articles"
                    className="h-11 w-full rounded-full border border-neutral-200 bg-white/80 px-11 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
                    aria-label="Search articles"
                  />
                  {search ? (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-700"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                      selectedCategory === category
                        ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow-sm shadow-fuchsia-200"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-fuchsia-300 hover:text-fuchsia-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 py-14 md:py-20">
        {debouncedSearch ? (
          <div className="mb-10 text-sm text-neutral-500">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-fuchsia-500" />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-50 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-fuchsia-400">Z</span>
            </div>
            <p className="text-neutral-700 text-sm font-semibold">Unable to load blogs right now.</p>
            <p className="text-neutral-500 text-sm mt-1">{error}</p>
            <button
              type="button"
              onClick={() => void loadBlogs()}
              className="mt-6 rounded-full bg-fuchsia-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-700"
            >
              Try again
            </button>
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            {featured ? <FeaturedPost post={featured} /> : null}

            {remaining.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {remaining.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : null}

            {hasMore && selectedCategory === FALLBACK_CATEGORY ? (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-semibold text-neutral-700 transition-all hover:border-fuchsia-300 hover:text-fuchsia-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load more posts"
                  )}
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-50 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-fuchsia-400">Z</span>
            </div>
            <p className="text-neutral-500 text-sm">
              {debouncedSearch ? "No posts matched your search." : "No posts in this category yet."}
            </p>
          </div>
        )}

        <section className="relative mt-30 flex items-center justify-center text-center overflow-x-hidden text-(--foreground) antialiased selection:bg-white/30 selection:text-black">
          <div className="w-full max-w-7xl bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-10 lg:p-12">
            <div className="inline-flex items-center gap-2 bg-white border border-fuchsia-100 rounded-full px-3 py-1 mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-fuchsia-600">
                Stay Updated
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
              Get the latest from Zaby
            </h2>
          <p className="text-neutral-500 text-[15px] max-w-md mx-auto leading-relaxed mb-7">
              Insights on operational AI, assessments, automation, and enterprise infrastructure delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 px-4 py-2.5 rounded-full border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100 transition"
              />
              <button className="px-6 py-2.5 rounded-full bg-fuchsia-600 text-white text-sm font-semibold hover:bg-fuchsia-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
