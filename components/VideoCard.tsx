import type { Video } from "@/lib/videos";
import { formatDate } from "@/lib/videos";

/**
 * Carte vidéo — lien direct vers YouTube (nouvel onglet).
 * Miniature YouTube native + durée + date.
 *
 * `upcoming` (2026-07-10) : vidéo programmée nativement (private +
 * publishAt) mais pas encore publique — pas de lien cliquable (rien à
 * regarder tant que YouTube ne l'a pas basculée), miniature atténuée,
 * badge "Non disponible encore" + date de sortie prévue à la place de la
 * durée/date normales.
 */
export default function VideoCard({
  video,
  upcoming = false,
}: {
  video: Video;
  upcoming?: boolean;
}) {
  const body = (
    <>
      <div className={`card__thumb${upcoming ? " card__thumb--upcoming" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.thumbnail} alt="" loading="lazy" />
      </div>
      <div className="card__body">
        <div style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap" }}>
          {upcoming ? (
            <>
              <span className="pill">Non disponible encore</span>
              <span className="pill pill--pop">
                Sortie prévue : {formatDate(video.liveAt)}
              </span>
            </>
          ) : (
            <>
              <span className="pill pill--pop">{video.duration}</span>
              <span className="pill">{formatDate(video.liveAt)}</span>
            </>
          )}
        </div>
        <h3 className="t-titre">{video.title}</h3>
      </div>
    </>
  );

  if (upcoming) {
    return (
      <div className="card" aria-label={`« ${video.title} » — pas encore disponible`}>
        {body}
      </div>
    );
  }

  return (
    <a
      className="card"
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Regarder « ${video.title} » sur YouTube`}
    >
      {body}
    </a>
  );
}
