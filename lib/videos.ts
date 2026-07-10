import videosData from "@/data/videos.json";

export type Video = {
  id: string;
  title: string;
  description: string;
  liveAt: string;
  duration: string;
  thumbnail: string;
};

/**
 * Vidéos longues de la chaîne, déjà en ligne (les programmées dont la
 * date de publication n'est pas encore passée sont exclues du rendu —
 * elles apparaîtront automatiquement au prochain build après leur date).
 */
export function getVideos(): Video[] {
  const now = new Date().toISOString();
  return (videosData as Video[]).filter((v) => v.liveAt <= now);
}

/**
 * Vidéos longues programmées mais pas encore publiques (scheduling natif
 * YouTube, private + publishAt) — triées de la plus proche à la plus
 * lointaine. Affichées comme cartes "à venir" (miniature + date, pas
 * cliquables, voir VideoCard) plutôt que jouables en avance (2026-07-10 :
 * priorité donnée au signal de constance pour l'algorithme YouTube).
 */
export function getUpcomingVideos(): Video[] {
  const now = new Date().toISOString();
  return (videosData as Video[])
    .filter((v) => v.liveAt > now)
    .sort((a, b) => (a.liveAt < b.liveAt ? -1 : 1));
}

export function getVideo(id: string): Video | undefined {
  return (videosData as Video[]).find((v) => v.id === id);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Toronto",
  });
}
