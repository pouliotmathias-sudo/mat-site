/**
 * Configuration centrale du site — tout ce qui identifie "Mat" vit ici.
 * Changer le domaine ici quand il sera acheté (une seule source de vérité).
 */
export const site = {
  name: "Mat",
  tagline: "Explorer. Expérimenter. Partager.",
  description:
    "Mat — un entrepreneur de 23 ans qui explore, voyage et expérimente. " +
    "IA, automatisation, business et systèmes : je partage ce que j'apprends au quotidien.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://matlearned.com",
  locale: "fr_CA",
  author: "Mathias",
  youtube: "https://www.youtube.com/@matlearned",
  youtubeHandle: "@matlearned",
  linkedin: "https://www.linkedin.com/in/mathias-pouliot",
  instagram: "https://www.instagram.com/matlearned",
  /** Clé d'accès Web3Forms — à créer sur web3forms.com avec le courriel
   *  de réception. Jamais le courriel lui-même dans le code client. */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
} as const;
