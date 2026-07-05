import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAllSlugs, getArticle, getArticles } from "@/lib/articles";
import { formatDate, getVideo } from "@/lib/videos";
import ArticleCard from "@/components/ArticleCard";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      images: [
        { url: `https://i.ytimg.com/vi/${article.videoId}/maxresdefault.jpg` },
      ],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const video = getVideo(article.videoId);
  const related = getArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    inLanguage: "fr-CA",
    author: { "@type": "Person", name: site.author, url: site.url },
    image: `https://i.ytimg.com/vi/${article.videoId}/maxresdefault.jpg`,
    video: video
      ? {
          "@type": "VideoObject",
          name: video.title,
          description: video.description,
          thumbnailUrl: video.thumbnail,
          uploadDate: video.liveAt,
          embedUrl: `https://www.youtube.com/embed/${video.id}`,
        }
      : undefined,
  };

  return (
    <article className="section--tight">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <header className={styles.head}>
          <Reveal>
            <div className={styles.meta}>
              <Link href="/articles" className="link-u">
                ← Articles
              </Link>
              <span className="pill">{formatDate(article.date)}</span>
              <span className="pill">
                {article.readingMinutes} min de lecture
              </span>
            </div>
          </Reveal>
          <Reveal delay={89}>
            <h1 className={`t-hero ${styles.title}`}>{article.title}</h1>
          </Reveal>
          <Reveal delay={178}>
            <p className={`t-lead ${styles.desc}`}>{article.description}</p>
          </Reveal>
        </header>

        {/* La vidéo d'origine — embed YouTube en tête d'article */}
        <Reveal>
          <div className={styles.videoWrap}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${article.videoId}`}
              title={video?.title ?? article.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Reveal>

        <div className={styles.bodyWrap}>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          <aside className={styles.cta}>
            <p className="t-titre">Cet article vient d&apos;une vidéo.</p>
            <p style={{ color: "var(--ink-2)" }}>
              La version complète, avec les exemples à l&apos;écran, est sur la
              chaîne.
            </p>
            <a
              className="btn"
              href={`https://www.youtube.com/watch?v=${article.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Regarder la vidéo <span className="arr">→</span>
            </a>
          </aside>
        </div>

        {related.length > 0 && (
          <footer className={styles.related}>
            <Reveal>
              <h2 className="t-bloc" style={{ marginBottom: "var(--s-4)" }}>
                À lire ensuite
              </h2>
            </Reveal>
            <div className={styles.relatedGrid}>
              {related.map((a, i) => (
                <Reveal key={a.slug} delay={i * 89}>
                  <ArticleCard article={a} />
                </Reveal>
              ))}
            </div>
          </footer>
        )}
      </div>
    </article>
  );
}
