import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import VideoCard from "@/components/VideoCard";
import { getVideos, getUpcomingVideos } from "@/lib/videos";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Toutes les vidéos",
  description:
    "Toutes les vidéos longues de Mathias Pouliot : IA, automatisation, business, systèmes et développement personnel, apprises sur le terrain et partagées sans filtre.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  const videos = getVideos();
  const upcoming = getUpcomingVideos();

  return (
    <>
      <section className={`bg-trame-blue ${styles.band}`}>
        <div className="container">
          <Reveal>
            <div className={styles.head}>
              <div className="eyebrow-row">
                <span className="t-meta">
                  {videos.length} vidéos ·{" "}
                  <a
                    href={site.youtubeJournal}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.youtubeJournalHandle}
                  </a>
                </span>
              </div>
              <h1 className="t-god">Les vidéos</h1>
              <p className={`t-lead ${styles.lead}`}>
                Mon journal vidéo, du plus récent au plus ancien. Chaque vidéo
                ouvre directement sur YouTube. Le contenu The ALGORITM est sur{" "}
                <a
                  className="link-u"
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ma chaîne principale
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          {upcoming.length > 0 && (
            <Reveal>
              <h2 className="t-titre" style={{ marginBottom: "var(--s-3)" }}>
                À venir
              </h2>
            </Reveal>
          )}
          {upcoming.length > 0 && (
            <div className={styles.grid} style={{ marginBottom: "var(--s-6)" }}>
              {upcoming.map((v, i) => (
                <Reveal key={v.id} delay={(i % 3) * 89}>
                  <VideoCard video={v} upcoming />
                </Reveal>
              ))}
            </div>
          )}

          <div className={styles.grid}>
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 89}>
                <VideoCard video={v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
