import type { Metadata } from "next";
import { isValidElement } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, posts } from "@/lib/blog-data";
import Mermaid from "@/components/Mermaid";
import NavBar from "@/components/NavBar";

export function generateStaticParams() {
  return posts.length > 0
    ? posts.map((post) => ({ slug: post.slug }))
    : [{ slug: "__none__" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} | mohar@portfolio` };
}

const ink =
  "underline decoration-1 underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background";

const prose = {
  p: "mt-5 text-lg sm:text-xl leading-[1.65] text-foreground/90 first:mt-0",
  h2: "text-[1.4rem] sm:text-[1.5rem] font-black leading-tight mt-12 mb-2",
  h3: "text-[1.15rem] sm:text-[1.25rem] font-black leading-tight mt-8 mb-1",
  ul: "list-disc pl-6 mt-5 space-y-2 text-lg sm:text-xl leading-[1.65] text-foreground/90",
  ol: "list-decimal pl-6 mt-5 space-y-2 text-lg sm:text-xl leading-[1.65] text-foreground/90",
  li: "marker:text-foreground/50",
  blockquote: "border-l-2 border-foreground/30 pl-4 italic text-foreground/80 mt-5",
  pre: "overflow-x-auto border border-foreground/15 bg-foreground/[0.04] p-4 mt-5 font-mono text-sm sm:text-base leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit",
  code: "font-mono text-[0.9em] bg-foreground/10 px-1 py-0.5",
  img: "max-w-full mt-5",
  hr: "border-foreground/15 mt-10",
} as const;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className={prose.p}>{children}</p>,
              h2: ({ children }) => <h2 className={prose.h2}>{children}</h2>,
              h3: ({ children }) => <h3 className={prose.h3}>{children}</h3>,
              ul: ({ children }) => <ul className={prose.ul}>{children}</ul>,
              ol: ({ children }) => <ol className={prose.ol}>{children}</ol>,
              li: ({ children }) => <li className={prose.li}>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className={prose.blockquote}>{children}</blockquote>
              ),
              pre: ({ children }) => {
                const child = Array.isArray(children) ? children[0] : children;
                if (
                  isValidElement<{ className?: string }>(child) &&
                  child.props.className === "language-mermaid"
                ) {
                  return <>{children}</>;
                }
                return <pre className={prose.pre}>{children}</pre>;
              },
              code: ({ className, children }) =>
                className === "language-mermaid" ? (
                  <Mermaid chart={String(children).replace(/\n$/, "")} />
                ) : (
                  <code className={prose.code}>{children}</code>
                ),
              img: (props) => <img {...props} alt={props.alt ?? ""} className={prose.img} />,
              hr: () => <hr className={prose.hr} />,
              a: ({ children, href }) => (
                <a href={href} target="_blank" rel="noreferrer" className={ink}>
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mt-5">
                  <table className="w-full text-left border-collapse font-mono text-sm sm:text-base">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border-b border-foreground/30 px-2 py-1 font-black">{children}</th>
              ),
              td: ({ children }) => (
                <td className="border-b border-foreground/10 px-2 py-1 align-top">{children}</td>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
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