import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  videoId: string;
  keywords: string[];
  readingMinutes: number;
};

export type Article = ArticleMeta & { html: string };

function readingTime(markdown: string): number {
  const words = markdown.split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function getArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: data.slug ?? f.replace(/\.md$/, ""),
        title: data.title,
        description: data.description,
        date: data.date,
        videoId: data.videoId,
        keywords: data.keywords ?? [],
        readingMinutes: readingTime(content),
      } as ArticleMeta;
    })
    .filter((a) => new Date(a.date) <= new Date())
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  if (!fs.existsSync(ARTICLES_DIR)) return undefined;
  const file = fs
    .readdirSync(ARTICLES_DIR)
    .find((f) => f.replace(/\.md$/, "") === slug);
  if (!file) return undefined;
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    videoId: data.videoId,
    keywords: data.keywords ?? [],
    readingMinutes: readingTime(content),
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getAllSlugs(): string[] {
  return getArticles().map((a) => a.slug);
}
