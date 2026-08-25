import { readdirSync, readFileSync } from "fs";
import path from "path";

export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = /^\s*---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
  if (!match) throw new Error("post is missing frontmatter (--- title/date/readTime/excerpt ---)");
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: match[2].trim() };
}

function loadPost(slug: string): Post | undefined {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  let raw: string;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    return undefined;
  }
  const { meta, body } = parseFrontmatter(raw);
  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? "",
    readTime: meta.readTime ?? "",
    excerpt: meta.excerpt ?? "",
    content: body,
  };
}

export const posts: Post[] = readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  .map((f) => loadPost(f.slice(0, -3))!)
  .sort((a, b) => {
    const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
    return diff !== 0 ? diff : a.slug.localeCompare(b.slug);
  });

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}