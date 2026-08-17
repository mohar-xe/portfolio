import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/lib/blog-data";
import NavBar from "@/components/NavBar";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | mohar@portfolio` };
}

const ink =
  "underline decoration-1 underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 max-w-[680px] w-full mx-auto px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24">
        <p className="font-mono text-sm sm:text-base text-foreground/70 mb-16 sm:mb-20 tracking-tight">
          {">_ "}mohar@portfolio:~/blog/{post.slug}$
        </p>

        <p className="font-mono text-sm sm:text-base text-foreground/60 mb-6">
          <a href="/blog" className={ink}>
            ← all posts
          </a>
        </p>

        <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[2.75rem] font-black leading-[1.1] tracking-[-0.01em]">
          {post.title}
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 mt-4">
          {post.date} ⏵ {post.readTime}
        </p>

        <div className="mt-10">
          {post.content.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="text-[1.4rem] sm:text-[1.5rem] font-black leading-tight mt-12 mb-2"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul
                  key={i}
                  className="list-disc pl-6 mt-5 space-y-2 text-lg sm:text-xl leading-[1.65] text-foreground/90"
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="mt-5 text-lg sm:text-xl leading-[1.65] text-foreground/90 first:mt-0"
              >
                {block.text}
              </p>
            );
          })}
        </div>
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
