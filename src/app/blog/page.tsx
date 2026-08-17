import type { Metadata } from "next";
import { posts } from "@/lib/blog-data";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "blog | mohar@portfolio",
  description: "Research notes/blogs and reimplementation details",
};

const ink =
  "underline decoration-1 underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 max-w-[680px] w-full mx-auto px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24">
        <p className="font-mono text-sm sm:text-base text-foreground/70 mb-16 sm:mb-20 tracking-tight">
          {">_ "}mohar@portfolio:~/blog$
        </p>

        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-black leading-[1.1] tracking-[-0.01em]">
          blog<span className="text-foreground">.</span>
        </h1>
        <p className="text-lg sm:text-xl leading-[1.65] mt-5 text-foreground/80">
          Research notes/blogs and reimplementation
          details.
        </p>

        {posts.length === 0 ? (
          <p className="mt-14 text-lg sm:text-xl leading-[1.65] text-foreground/70">
            no posts yet — check back soon.
          </p>
        ) : (
          posts.map((post) => (
          <article className="mt-14" key={post.slug}>
            <h2 className="text-[1.2rem] sm:text-[1.3rem] font-bold leading-snug">
              <a href={`/blog/${post.slug}`} className={ink}>
                {post.title}
              </a>
            </h2>
            <p className="font-mono text-sm sm:text-base text-foreground/60 mt-1">
              {post.date} ⏵ {post.readTime}
            </p>
            <p className="mt-3 text-lg sm:text-xl leading-[1.65] text-foreground/90">
              {post.excerpt}
            </p>
          </article>
          ))
        )}
      </main>

      <footer className="w-full border-t border-foreground/10 mt-auto pb-24 sm:pb-28">
        <div className="max-w-[680px] w-full mx-auto px-5 sm:px-8 md:px-10 py-8 sm:py-10 flex justify-center">
          <p className="text-sm text-foreground/50">© 2026 mohar das</p>
        </div>
      </footer>

      <NavBar />
    </div>
  );
}
