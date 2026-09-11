import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
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
      <section className={`bg-trame-blue ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <Reveal>
              <div className="eyebrow-row">
                <span className="t-meta">Entrepreneur · {site.city}</span>
              </div>
            </Reveal>
            <Reveal delay={89}>
              <h1 className={`t-name ${styles.heroName}`}>
                Mathias
                <br />
                Pouliot
              </h1>
            </Reveal>
            <Reveal delay={178}>
              <p className={styles.heroClaim}>
                Je construis des systèmes qui redonnent du temps aux
                dirigeants. Et je documente le chemin, en public.
              </p>
            </Reveal>
            <Reveal delay={267}>
              <p className={`t-lead ${styles.heroLead}`}>
                Fondateur de The ALGORITM, étudiant au MBA à l&apos;Université
                Laval, formé en enseignement. Ici, je partage mes vidéos, mes
                articles et ce que j&apos;apprends en bâtissant une entreprise.
              </p>
            </Reveal>
            <Reveal delay={356}>
              <div className={styles.heroCtas}>
                <Link className="btn" href="/a-propos">
                  Mon parcours <span className="arr">→</span>
                </Link>
                <Link className="btn btn--ghost" href="/videos">
                  Voir les vidéos
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={178} className={styles.heroPhotoWrap}>
            <div className={styles.heroPhotoDisc} aria-hidden />
            <Image
              src="/photos/mathias-sourire.png"
              alt="Mathias Pouliot"
              width={520}
              height={693}
              priority
              className={styles.heroPhoto}
            />
          </Reveal>
        </div>
      </section>

      {/* ================= THE ALGORITM =================
          Le seul endroit du site où le logo ALGORITM apparaît. */}
      <section className="section--tight">
        <div className="container">
          <Reveal>
            <article className={styles.algo} aria-labelledby="algo-titre">
              <div className={styles.algoHead}>
                <div className="eyebrow-row">
                  <span className="t-meta">Ce que je bâtis</span>
                </div>
                <a
                  href={site.algoritm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.algoLogo}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/algoritm-lockup-white.svg"
                    alt="The ALGORITM — the-algoritm.io"
                    width={190}
                    height={89}
                  />
                </a>
              </div>

              <div className={styles.algoBody}>
                <h2 id="algo-titre" className="t-bloc">
                  {site.algoritm.promesse}
                </h2>
                <p className="t-lead">
                  The ALGORITM est mon entreprise : un studio d&apos;automatisation
                  IA. On conçoit et on opère les automatisations qui font tourner
                  une PME, pour que son dirigeant ne soit plus le goulot de
                  l&apos;opérationnel.
                </p>
                <p className={styles.algoNote}>
                  Pour commencer : l&apos;audit offert. Un appel de 30 minutes,
                  et vous repartez avec votre bottleneck n° 1 et une estimation
                  des heures qu&apos;il vous coûte.
                </p>
                <div className={styles.heroCtas}>
                  <a
                    className="btn"
                    href={site.algoritm.audit}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Réserver l&apos;audit offert <span className="arr">→</span>
                  </a>
                  <a
                    className="btn btn--ghost"
                    href={site.algoritm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visiter the-algoritm.io
                  </a>
                </div>
              </div>
            </article>
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
                  <span className="t-meta">Le journal vidéo</span>
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
      <section className={`bg-trame ${styles.manifesto}`}>
        <div className={`container ${styles.manifestoInner}`}>
          <Reveal>
            <div className="eyebrow-row">
              <span className="t-meta">Pourquoi je documente tout</span>
            </div>
          </Reveal>
          <Reveal delay={89}>
            <p className={styles.manifestoText}>
              On apprend plus vite en construisant pour vrai qu&apos;en
              consommant du contenu. Chaque vidéo part d&apos;une expérience que
              j&apos;ai réellement menée : les résultats, les erreurs et ce que
              j&apos;en retire.
            </p>
          </Reveal>
          <Reveal delay={178}>
            <p className={`t-lead ${styles.manifestoSub}`}>
              Même règle pour The ALGORITM : je fais d&apos;abord tourner chez
              moi les systèmes que je bâtis pour les autres.
            </p>
          </Reveal>
          <Reveal delay={267}>
            <Link href="/a-propos" className="btn">
              Mon histoire <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
