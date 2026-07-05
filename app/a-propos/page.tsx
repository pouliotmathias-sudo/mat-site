import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import OrganicShape from "@/components/OrganicShape";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Qui est Mat ? Un entrepreneur de 23 ans, basé au Québec, qui explore, voyage et expérimente — et qui partage tout ce qu'il apprend sur l'IA, l'automatisation et le business.",
  alternates: { canonical: "/a-propos" },
};

const valeurs = [
  {
    titre: "Expérimenter d'abord",
    texte:
      "Je ne parle jamais d'une idée que j'ai pas testée moi-même. Chaque vidéo part d'une expérience réelle — avec ses résultats pis ses échecs.",
  },
  {
    titre: "Apprendre en public",
    texte:
      "Documenter le chemin, pas juste la destination. Les erreurs valent autant que les victoires quand on les partage honnêtement.",
  },
  {
    titre: "Les systèmes avant la motivation",
    texte:
      "La motivation est passagère. Un bon système, une bonne habitude, un bon processus — c'est ça qui tient sur des années.",
  },
];

export default function AProposPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    alternateName: "Mat",
    url: site.url,
    sameAs: [site.youtube, site.linkedin, site.instagram],
    jobTitle: "Entrepreneur et créateur de contenu",
    description: site.description,
    knowsAbout: [
      "Intelligence artificielle",
      "Automatisation",
      "Entrepreneuriat",
      "Systèmes de productivité",
    ],
    nationality: "Canadienne",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <OrganicShape flip />
        <div className={`container ${styles.heroInner}`}>
          <Reveal className={styles.photoWrap}>
            <div className={styles.photoDisc} aria-hidden />
            <Image
              src="/photos/mathias-relax.png"
              alt="Mat"
              width={480}
              height={600}
              priority
              className={styles.photo}
            />
          </Reveal>

          <div className={styles.heroText}>
            <Reveal>
              <p className="t-meta">À propos</p>
            </Reveal>
            <Reveal delay={89}>
              <h1 className="t-god">
                Salut, moi
                <br />
                c&apos;est Mat<span className="t-accent">.</span>
              </h1>
            </Reveal>
            <Reveal delay={178}>
              <p className="t-lead">
                23 ans. Entrepreneur. Basé à Québec, souvent ailleurs.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ HISTOIRE ============ */}
      <section className="section--tight">
        <div className={`container ${styles.story}`}>
          <Reveal>
            <h2 className="t-hero">
              J&apos;explore, j&apos;expérimente, pis je documente tout.
            </h2>
          </Reveal>
          <div className={styles.storyText}>
            <Reveal delay={89}>
              <p>
                Je suis un gars ordinaire qui a décidé de prendre sa vie comme
                un terrain d&apos;expérimentation. Le business, l&apos;IA, les
                systèmes de productivité, les voyages en backpack, les
                habitudes — tout passe au banc d&apos;essai. Ce qui marche, je
                le garde. Ce qui marche pas, j&apos;en parle quand même, parce
                que c&apos;est souvent là que se cache la vraie leçon.
              </p>
            </Reveal>
            <Reveal delay={178}>
              <p>
                Ma passion, c&apos;est les nouvelles technologies —
                l&apos;intelligence artificielle, l&apos;automatisation, les
                processus qui te redonnent ton temps. Je passe mes journées à
                construire des systèmes qui travaillent pendant que je dors,
                pis mes vidéos montrent exactement comment je fais, étape par
                étape, sans rien cacher.
              </p>
            </Reveal>
            <Reveal delay={267}>
              <p>
                La chaîne, c&apos;est mon journal de bord public. Pas de recette
                miracle, pas de promesses de millions — juste ce que
                j&apos;apprends pour vrai, au moment où je l&apos;apprends. Si
                t&apos;es le genre de personne qui aime comprendre comment les
                choses marchent pis bâtir sa vie à sa façon, tu vas te sentir
                chez vous.
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
            <h2 className="t-hero">On se suit ?</h2>
          </Reveal>
          <Reveal delay={89}>
            <div className={styles.ctaRow}>
              <a
                className="btn"
                href={site.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube <span className="arr">→</span>
              </a>
              <a
                className="btn btn--ghost"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
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
