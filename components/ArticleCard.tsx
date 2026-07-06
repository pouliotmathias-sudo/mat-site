import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { formatDate } from "@/lib/videos";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      className="card"
      href={`/articles/${article.slug}`}
      aria-label={`Lire « ${article.title} »`}
    >
      <div className="card__thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${article.videoId}/maxresdefault.jpg`}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="card__body">
        <div style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap" }}>
          <span className="pill pill--mauve">{article.readingMinutes} min de lecture</span>
          <span className="pill">{formatDate(article.date)}</span>
        </div>
        <h3 className="t-titre">{article.title}</h3>
        <p style={{ color: "var(--ink-2)", lineHeight: 1.5 }}>
          {article.description}
        </p>
      </div>
    </Link>
  );
}
