import Reveal from "./Reveal";
import styles from "./Timeline.module.css";

type TimelineItem = {
  date: string;
  title: string;
  text: string;
  /** Jalon qui a changé la trajectoire — point bleu. */
  key?: boolean;
  /** Toujours en cours — pastille « En cours ». */
  current?: boolean;
};

// Ordre chronologique. Sources : CV + dictée de Mathias (2026-07-06),
// audit LinkedIn du 2026-09-11 (algoritm-brain/02-marketing).
const items: TimelineItem[] = [
  {
    date: "2020 — 2022",
    title: "Bars, restos, salle à manger",
    text: "Serveur, barman, homme à tout faire, à Québec et à Whistler, en français et en anglais. Le service sous pression, avant même de savoir que ça s'appellerait un jour de la vente.",
  },
  {
    date: "2022 — 2026",
    title: "Bacc en enseignement de l'éducation physique",
    text: "Université Laval. En parallèle : suppléant dans plus de 50 écoles de la Capitale-Nationale et de Chaudière-Appalaches. Gérer une classe, c'est gérer une salle pleine d'objections.",
  },
  {
    date: "Été 2024",
    title: "Backpack solo — Amérique centrale",
    text: "Premier grand voyage seul. Des semaines à décider de tout, tout seul, dans un contexte qui change chaque jour.",
  },
  {
    date: "Août 2024",
    title: "Vipassana — 10 jours, 100 heures de méditation",
    text: "Silence total, aucun téléphone. Le déclic sur l'équanimité qui revient dans à peu près toutes mes vidéos depuis.",
  },
  {
    date: "Mars 2025",
    title: "École d'Entrepreneurship de Beauce",
    text: "Séjour intensif : mentorat, ateliers, réseautage avec des entrepreneurs aguerris. Le moment où l'entrepreneuriat est passé d'une idée à un choix concret.",
    key: true,
  },
  {
    date: "Mars — juillet 2026",
    title: "Développement des affaires — startup québécoise en IA",
    text: "Prospection de PME, activation de partenaires et mes premières automatisations de prospection. Apprendre à vendre quelque chose en quoi je crois vraiment.",
  },
  {
    date: "Mai 2026",
    title: "Fin du bacc",
    text: "Quatre ans, plus de 50 écoles, un diplôme, et la certitude que je veux construire plutôt qu'enseigner à temps plein.",
  },
  {
    date: "Mai — juin 2026",
    title: "M4E",
    text: "Une étape de plus dans le parcours entrepreneurial, entre la fin des études et le début du MBA.",
  },
  {
    date: "Été 2026",
    title: "Backpack solo — Asie du Sud-Est",
    text: "Deux mois seul, entre autres en Thaïlande et au Vietnam. Même exercice qu'en 2024, ailleurs, pour voir ce qui avait changé entre les deux.",
  },
  {
    date: "Septembre 2026",
    title: "Lancement de The ALGORITM",
    text: "Mon entreprise : un studio d'automatisation IA pour les dirigeants de TPE et PME. On libère les dirigeants de TPE et PME de l'opérationnel en 30 jours.",
    key: true,
    current: true,
  },
  {
    date: "Automne 2026",
    title: "MBA — Entrepreneuriat et gestion de PME",
    text: "Université Laval. Structurer ce que j'apprends sur le terrain avec un cadre plus rigoureux, au contact d'autres dirigeants.",
    current: true,
  },
];

export default function Timeline() {
  return (
    <ol className={styles.timeline}>
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.title}
          delay={(i % 4) * 89}
          className={styles.item}
        >
          <div
            className={`${styles.dot} ${item.key ? styles.dotKey : ""}`}
            aria-hidden
          />
          <div className={styles.body}>
            <p className={styles.date}>
              <span className="t-meta">{item.date}</span>
              {item.current && <span className="pill pill--signal">En cours</span>}
            </p>
            <h3 className="t-titre">{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
