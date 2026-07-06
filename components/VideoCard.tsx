import type { Video } from "@/lib/videos";
import { formatDate } from "@/lib/videos";

/**
 * Carte vidéo — lien direct vers YouTube (nouvel onglet).
 * Miniature YouTube native + durée + date.
 */
export default function VideoCard({ video }: { video: Video }) {
  return (
    <a
      className="card"
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Regarder « ${video.title} » sur YouTube`}
    >
      <div className="card__thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.thumbnail} alt="" loading="lazy" />
      </div>
      <div className="card__body">
        <div style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap" }}>
          <span className="pill pill--pop">{video.duration}</span>
          <span className="pill">{formatDate(video.liveAt)}</span>
        </div>
        <h3 className="t-titre">{video.title}</h3>
      </div>
    </a>
  );
}
