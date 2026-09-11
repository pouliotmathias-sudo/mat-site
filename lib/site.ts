/**
 * Configuration centrale du site — tout ce qui identifie Mathias vit ici
 * (une seule source de vérité pour le nom, les liens et The ALGORITM).
 */
export const site = {
  name: "Mathias Pouliot",
  tagline: "Entrepreneur. Fondateur de The ALGORITM.",
  description:
    "Mathias Pouliot, entrepreneur québécois et fondateur de The ALGORITM, " +
    "studio d'automatisation IA pour les PME. Vidéos, articles et parcours : " +
    "ce que j'apprends en construisant.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mathiaspouliot.com",
  locale: "fr_CA",
  author: "Mathias Pouliot",
  city: "Lévis, Québec",
  /** Chaîne principale (compte de marque, contenu The ALGORITM). */
  youtube: "https://www.youtube.com/@MathiasPouliotBusiness",
  /** Chaîne d'origine : les vidéos longues listées sur /videos et les
   *  articles du blogue en viennent (scripts/fetch-videos.py). */
  youtubeJournal: "https://www.youtube.com/@mathias_pouliot",
  youtubeJournalHandle: "@mathias_pouliot",
  linkedin: "https://www.linkedin.com/in/mathias-pouliot-4932b5271/",
  instagram: "https://www.instagram.com/mathiaspouliot/",
  /** The ALGORITM — l'entreprise. Promesse : seules les deux formulations
   *  officielles (algoritm-brain, registre du 2026-09-10) sont permises. */
  algoritm: {
    name: "The ALGORITM",
    url: "https://the-algoritm.io",
    audit: "https://the-algoritm.io/#reserver",
    promesse:
      "On libère les dirigeants de TPE et PME de l'opérationnel en 30 jours.",
  },
  /** Clé d'accès Web3Forms — jamais le courriel lui-même dans le code client. */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
} as const;
