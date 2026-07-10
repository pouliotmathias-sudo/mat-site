import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import VideoCard from "@/components/VideoCard";
import { getVideos, getUpcomingVideos } from "@/lib/videos";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Toutes les vidéos",
  description:
    "Toutes les vidéos de la chaîne Mat : IA, automatisation, business, systèmes et développement personnel — apprises sur le terrain, partagées sans filtre.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  const videos = getVideos();
  const upcoming = getUpcomingVideos();

  return (
    <section className="section--tight">
      <div className="container">
        <Reveal>
          <div className={styles.head}>
            <div className="eyebrow-row">
              <span className="t-meta">
                {videos.length} vidéos · {site.youtubeHandle}
              </span>
            </div>
            <h1 className="t-god">Les vidéos</h1>
            <p className={`t-lead ${styles.lead}`}>
              Tout ce que je publie sur la chaîne, du plus récent au plus
              ancien. Chaque vidéo ouvre directement sur YouTube.
            </p>
          </div>
        </Reveal>

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
  );
}
