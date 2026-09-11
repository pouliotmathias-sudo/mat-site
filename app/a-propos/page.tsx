import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Qui est Mathias Pouliot ? Entrepreneur québécois, fondateur de The ALGORITM, étudiant au MBA à l'Université Laval et formé en enseignement : le parcours, du bar au business.",
  alternates: { canonical: "/a-propos" },
};

const valeurs = [
  {
    titre: "Expérimenter d'abord",
    texte:
      "Je ne parle jamais d'une idée que je n'ai pas testée moi-même. Chaque vidéo part d'une expérience réelle, avec ses résultats et ses échecs.",
  },
  {
    titre: "Apprendre en public",
    texte:
      "Documenter le chemin, pas juste la destination. Les erreurs valent autant que les victoires quand on les partage honnêtement.",
  },
  {
    titre: "Les systèmes avant la motivation",
    texte:
      "La motivation est passagère. Un bon système, une bonne habitude, un bon processus : c'est ça qui tient sur des années.",
  },
];

export default function AProposPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    url: site.url,
    image: `${site.url}/photos/mathias-sourire.png`,
    sameAs: [
      site.linkedin,
      site.youtube,
      site.youtubeJournal,
      site.instagram,
    ],
    jobTitle: "Fondateur",
    worksFor: {
      "@type": "Organization",
      name: site.algoritm.name,
      url: site.algoritm.url,
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Université Laval" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lévis",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    description: site.description,
    knowsAbout: [
      "Automatisation des processus",
      "Intelligence artificielle",
      "Gestion de PME",
      "Entrepreneuriat",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ HERO ============ */}
      <section className={`bg-trame-blue ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal className={styles.photoWrap}>
            <Image
              src="/photos/manga-ordi.png"
              alt="Mathias, en train de construire"
              width={480}
              height={641}
              priority
              className={styles.photo}
            />
          </Reveal>

          <div className={styles.heroText}>
            <Reveal>
              <div className="eyebrow-row">
                <span className="t-meta">À propos</span>
              </div>
            </Reveal>
            <Reveal delay={89}>
              <h1 className="t-god">
                Salut, moi
                <br />
                c&apos;est <span className="t-mark">Mathias</span>.
              </h1>
            </Reveal>
            <Reveal delay={178}>
              <p className="t-lead">
                Fondateur de The ALGORITM. Étudiant au MBA. Basé à Lévis,
                souvent ailleurs.
              </p>
            </Reveal>
            <Reveal delay={267}>
              <div className={styles.tagRow}>
                <span className="pill pill--accent">Fondateur</span>
                <span className="pill">MBA en cours</span>
                <span className="pill">Formé en enseignement</span>
                <span className="pill">Voyageur solo</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ HISTOIRE ============ */}
      <section className="section--tight">
        <div className={`container ${styles.story}`}>
          <Reveal>
            <h2 className="t-hero">
              J&apos;explore, je construis, et je documente tout.
            </h2>
          </Reveal>
          <div className={styles.storyText}>
            <Reveal delay={89}>
              <p>
                J&apos;ai pris ma vie comme un terrain d&apos;expérimentation. Le
                business, l&apos;IA, les systèmes, les voyages en solo, les
                habitudes : tout passe au banc d&apos;essai. Ce qui marche, je le
                garde. Ce qui ne marche pas, j&apos;en parle quand même, parce que
                c&apos;est souvent là que se cache la vraie leçon.
              </p>
            </Reveal>
            <Reveal delay={178}>
              <p>
                Je viens de l&apos;enseignement : quatre ans de bacc et plus de
                50 écoles comme suppléant. Former des gens à de nouvelles façons
                de faire, c&apos;est mon métier d&apos;origine. Ensuite, dans une
                startup québécoise en IA, j&apos;ai prospecté des PME et activé
                des partenaires, et j&apos;ai automatisé ma propre prospection
                en chemin.
              </p>
            </Reveal>
            <Reveal delay={267}>
              <p>
                Aujourd&apos;hui, je bâtis{" "}
                <a
                  className="link-u"
                  href={site.algoritm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The ALGORITM
                </a>
                , un studio d&apos;automatisation IA pour les dirigeants de TPE
                et PME, et je fais un MBA en entrepreneuriat et gestion de PME à
                l&apos;Université Laval. Ce site, c&apos;est le reste : mon
                journal de bord public, sans recette miracle ni promesse de
                millions. Juste ce que j&apos;apprends pour vrai, au moment où je
                l&apos;apprends.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PARCOURS ============ */}
      <section className="section--tight">
        <div className={`container ${styles.parcours}`}>
          <Reveal>
            <div className="eyebrow-row">
              <span className="t-meta">Le parcours</span>
            </div>
            <h2 className="t-hero" style={{ marginBottom: "var(--s-6)" }}>
              Du bar au <span className="t-mark">business</span>.
            </h2>
          </Reveal>
          <Timeline />
        </div>
      </section>

      {/* ============ MOMENTS (galerie) ============ */}
      <section className={styles.moments}>
        <div className="container">
          <Reveal>
            <div className="eyebrow-row">
              <span className="t-meta">Quelques moments</span>
            </div>
          </Reveal>
          <div className={styles.momentsGrid}>
            <Reveal delay={0} className={styles.momentCard}>
              <Image
                src="/photos/vipassana.jpeg"
                alt="Au centre de méditation Vipassana, août 2024"
                width={600}
                height={800}
                className={styles.momentImg}
              />
              <p className={styles.momentCaption}>
                Vipassana — 10 jours de silence, août 2024
              </p>
            </Reveal>
            <Reveal delay={89} className={styles.momentCard}>
              <Image
                src="/photos/manga-networking.png"
                alt="Soirée de réseautage"
                width={600}
                height={800}
                className={styles.momentImg}
              />
              <p className={styles.momentCaption}>
                Réseauter, poser des questions, écouter
              </p>
            </Reveal>
            <Reveal delay={178} className={styles.momentCard}>
              <Image
                src="/photos/mathias-conference.jpeg"
                alt="Mathias sur scène"
                width={600}
                height={800}
                className={styles.momentImg}
              />
              <p className={styles.momentCaption}>
                Partager ce que j&apos;apprends, en public
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ VALEURS ============ */}
      <section className={styles.valeurs}>
        <div className="container">
          <div className={styles.valGrid}>
            {valeurs.map((v, i) => (
              <Reveal key={v.titre} delay={i * 89}>
                <div className={styles.valCard}>
                  <span className={styles.valNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-titre">{v.titre}</h3>
                  <p>{v.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section--tight">
        <div className={`container ${styles.ctaBlock}`}>
          <Reveal>
            <h2 className="t-hero">Restons en contact.</h2>
          </Reveal>
          <Reveal delay={89}>
            <div className={styles.ctaRow}>
              <a
                className="btn"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span className="arr">→</span>
              </a>
              <a
                className="btn btn--ghost"
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
              <a
                className="btn btn--ghost"
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <Link className="btn btn--ghost" href="/contact">
                M&apos;écrire
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
