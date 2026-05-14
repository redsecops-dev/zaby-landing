import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Link as LinkIcon,
  ChevronRight
} from "lucide-react";
import { 
  TwitterIcon as Twitter, 
  LinkedinIcon as Linkedin 
} from "@/components/shared/icons";
import { FooterSection } from "@/components/sections";
import { 
  POSTS, 
  POST_CONTENT, 
  ACCENT_STYLES, 
  getPostBySlug, 
  getRelatedPosts,
  type Post,
  type Section
} from "@/lib/blog";
import { CategoryBadge } from "@/components/sections/blog/CategoryBadge";
import { AuthorAvatar } from "@/components/sections/blog/AuthorAvatar";
import { PostCard } from "@/components/sections/blog/PostCard";
import { TableOfContents } from "@/components/sections/blog/TableOfContents";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Props["params"] }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Zaby Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const content = POST_CONTENT[slug];
  const relatedPosts = getRelatedPosts(slug);

  if (!post || !content) {
    notFound();
  }

  const styles = ACCENT_STYLES[post.accent];

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-neutral-900 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden relative">
        {/* Background Gradients */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-br ${styles.gradient} opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4`} />
        <div className={`absolute bottom-0 left-0 w-[300px] h-[300px] bg-linear-to-br ${styles.gradient} opacity-5 blur-2xl rounded-full translate-y-1/2 -translate-x-1/4`} />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-10">
            <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1.5 group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to blog
            </Link>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <CategoryBadge category={post.category} accent={post.accent} />
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
                {post.title}
              </h1>

              <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
            </div>

            <div className="hidden lg:block">
              <div className={`relative aspect-4/3 rounded-3xl overflow-hidden bg-linear-to-br ${styles.gradient} border border-white/5`}>
                {/* Decorative elements */}
                <div className={`absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-40 blur-2xl ${styles.bar}`} />
                <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-30 blur-xl ${styles.bar}`} />
                
                {/* Logo mark */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${styles.bar} shadow-2xl`}>
                    <span className="text-white text-4xl font-bold">Z</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24">
          <div className="grid lg:grid-cols-[1fr_300px] gap-16 md:gap-24">
            {/* Left Column: Content */}
            <article className="max-w-none">
              <div className="space-y-8 mb-16">
                {content.intro.map((para, i) => (
                  <p key={i} className="text-xl text-neutral-700 leading-relaxed font-medium">
                    {para}
                  </p>
                ))}
              </div>

              {content.sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-32 mb-16">
                  <h2 className="text-3xl font-bold text-neutral-900 mb-8 pb-4 border-b border-neutral-100">
                    {section.heading}
                  </h2>
                  <div className="space-y-6 text-neutral-600 leading-relaxed text-lg">
                    {section.blocks.map((block, i) => {
                      if (block.type === "paragraph") {
                        return <p key={i}>{block.text}</p>;
                      }
                      if (block.type === "list") {
                        const Tag = block.ordered ? "ol" : "ul";
                        return (
                          <Tag key={i} className={`space-y-4 ${block.ordered ? "list-decimal ml-6" : "list-none"}`}>
                            {block.items.map((item, j) => (
                              <li key={j} className="flex gap-3">
                                {!block.ordered && <span className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${styles.bar}`} />}
                                <span>{item}</span>
                              </li>
                            ))}
                          </Tag>
                        );
                      }
                      if (block.type === "callout") {
                        return (
                          <blockquote key={i} className={`border-l-4 ${styles.bar} bg-neutral-50 p-8 rounded-r-2xl italic text-neutral-800 text-xl font-medium shadow-sm`}>
                            "{block.text}"
                          </blockquote>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
            </article>

            {/* Right Column: Sidebar */}
            <aside>
              <div className="sticky top-32 space-y-12">
                {/* Table of Contents */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">
                    On this page
                  </h4>
                  <TableOfContents 
                    sections={content.sections} 
                    accentBarClass={styles.bar} 
                  />
                </div>

                {/* Author Card */}
                <div className="pt-8 border-t border-neutral-100">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">
                    Author
                  </h4>
                  <div className="flex items-center gap-4">
                    <AuthorAvatar initials={post.authorInitials} accent={post.accent} />
                    <div>
                      <div className="text-sm font-bold text-neutral-900">{post.author}</div>
                      <div className="text-xs text-neutral-500">{post.authorRole}</div>
                    </div>
                  </div>
                </div>

                {/* Share */}
                <div className="pt-8 border-t border-neutral-100">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">
                    Share post
                  </h4>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-fuchsia-200 hover:text-fuchsia-600 hover:bg-fuchsia-50 transition-all">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-fuchsia-200 hover:text-fuchsia-600 hover:bg-fuchsia-50 transition-all">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-fuchsia-200 hover:text-fuchsia-600 hover:bg-fuchsia-50 transition-all">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
          
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

      <FooterSection />
    </div>
  );
}
