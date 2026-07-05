import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import OrganicShape from "@/components/OrganicShape";
import VideoCard from "@/components/VideoCard";
import ArticleCard from "@/components/ArticleCard";
import { getVideos } from "@/lib/videos";
import { getArticles } from "@/lib/articles";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export default function Home() {
  const videos = getVideos().slice(0, 3);
  const articles = getArticles().slice(0, 3);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <OrganicShape />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <Reveal>
              <p className="t-meta">IA · Automatisation · Business · Vie</p>
            </Reveal>
            <Reveal delay={89}>
              <h1 className="t-god">
                J&apos;apprends
                <br />
                en public<span className="t-accent">.</span>
              </h1>
            </Reveal>
            <Reveal delay={178}>
              <p className={`t-lead ${styles.heroLead}`}>
                Moi c&apos;est Mat. 23 ans, entrepreneur au Québec. J&apos;explore,
                je voyage, j&apos;expérimente — pis je documente tout ce que
                j&apos;apprends sur l&apos;IA, les systèmes et le business, une
                vidéo à la fois.
              </p>
            </Reveal>
            <Reveal delay={267}>
              <div className={styles.heroCtas}>
                <a
                  className="btn"
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Regarder sur YouTube <span className="arr">→</span>
                </a>
                <Link className="btn btn--ghost" href="/articles">
                  Lire les articles
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={178} className={styles.heroPhotoWrap}>
            <div className={styles.heroPhotoDisc} aria-hidden />
            <Image
              src="/photos/mathias-sourire.png"
              alt="Mat — créateur de la chaîne"
              width={520}
              height={640}
              priority
              className={styles.heroPhoto}
            />
          </Reveal>
        </div>
      </section>

      {/* ================= DERNIÈRES VIDÉOS ================= */}
      <section className="section--tight">
        <div className="container">
          <Reveal>
            <div className={styles.rowHead}>
              <div>
                <div className="eyebrow-row">
                  <span className="t-meta">La chaîne</span>
                </div>
                <h2 className="t-hero">Dernières vidéos</h2>
              </div>
              <Link href="/videos" className="link-u">
                Toutes les vidéos →
              </Link>
            </div>
          </Reveal>
          <div className={styles.cards}>
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 89}>
                <VideoCard video={v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DERNIERS ARTICLES ================= */}
      <section className="section--tight">
        <div className="container">
          <Reveal>
            <div className={styles.rowHead}>
              <div>
                <div className="eyebrow-row">
                  <span className="t-meta">Le blogue</span>
                </div>
                <h2 className="t-hero">À lire</h2>
              </div>
              <Link href="/articles" className="link-u">
                Tous les articles →
              </Link>
            </div>
          </Reveal>
          <div className={styles.cards}>
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 89}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MANIFESTE ================= */}
      <section className={styles.manifesto}>
        <OrganicShape flip opacity={0.55} />
        <div className={`container ${styles.manifestoInner}`}>
          <Reveal>
            <p className="t-meta">Pourquoi cette chaîne</p>
          </Reveal>
          <Reveal delay={89}>
            <p className={styles.manifestoText}>
              Je crois qu&apos;on apprend plus vite en construisant pour vrai
              qu&apos;en consommant du contenu. Chaque vidéo, c&apos;est une
              expérience que j&apos;ai réellement menée — les résultats, les
              erreurs, pis ce que j&apos;en retire.
            </p>
          </Reveal>
          <Reveal delay={178}>
            <Link href="/a-propos" className="btn">
              Mon histoire <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
