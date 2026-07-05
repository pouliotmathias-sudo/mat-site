import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ArticleCard from "@/components/ArticleCard";
import { getArticles } from "@/lib/articles";
import styles from "../videos/page.module.css";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Guides et articles tirés des vidéos de la chaîne Mat : IA, automatisation avec Claude Code, business, prospection et systèmes de vie — en profondeur, à l'écrit.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <section className="section--tight">
      <div className="container">
        <Reveal>
          <div className={styles.head}>
            <div className="eyebrow-row">
              <span className="t-meta">{articles.length} articles</span>
            </div>
            <h1 className="t-god">Le blogue</h1>
            <p className={`t-lead ${styles.lead}`}>
              Chaque article reprend une vidéo de la chaîne, en version écrite
              et structurée — pour ceux qui préfèrent lire, ou revenir sur un
              point précis. La vidéo originale est liée dans chaque article.
            </p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 89}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
