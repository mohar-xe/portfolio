export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: PostBlock[];
}

export const posts: Post[] = [];
