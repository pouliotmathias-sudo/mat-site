import Reveal from "./Reveal";
import styles from "./Timeline.module.css";

type TimelineItem = {
  date: string;
  title: string;
  text: string;
  variant?: "pop" | "mauve";
};

const items: TimelineItem[] = [
  {
    date: "2020 — 2022",
    title: "Bars, restos, salle à manger",
    text: "Serveur, barman, homme à tout faire — à Québec pis à Whistler, en français et en anglais. Le service sous pression, avant même de savoir que ça s'appellerait un jour du sales.",
  },
  {
    date: "2022 — 2026",
    title: "Bacc en enseignement de l'éducation physique",
    text: "Université Laval. En parallèle : suppléant dans plus de 50 écoles de la Capitale-Nationale et de Chaudière-Appalaches — gérer une classe, c'est gérer une salle pleine d'objections.",
  },
  {
    date: "Été 2024",
    title: "Backpack solo — Amérique centrale",
    text: "Premier grand voyage seul. Des semaines à décider de tout, tout seul, dans un contexte qui change à chaque jour.",
    variant: "pop",
  },
  {
    date: "Août 2024",
    title: "Vipassana — 10 jours, 100 heures de méditation",
    text: "Silence total, aucun téléphone. Le déclic sur l'équanimité qui revient dans à peu près toutes mes vidéos depuis.",
  },
  {
    date: "Mars 2025",
    title: "École d'Entrepreneurship de Beauce",
    text: "Séjour intensif — mentorat, ateliers, réseautage avec des entrepreneurs aguerris. Le moment où l'entrepreneuriat est passé d'une idée à un choix concret.",
    variant: "mauve",
  },
  {
    date: "Mars 2026",
    title: "Développement des affaires — startup IA",
    text: "Partenariats et développement des affaires pour une jeune entreprise en IA souveraine. Apprendre à vendre quelque chose en quoi je crois vraiment.",
  },
  {
    date: "Mai 2026",
    title: "Fin du bacc",
    text: "Quatre ans, plus de 50 écoles, un diplôme — et la certitude que je veux construire plutôt qu'enseigner à temps plein.",
  },
  {
    date: "Mai — Juin 2026",
    title: "M4E",
    text: "Une étape de plus dans le parcours entrepreneurial, entre la fin des études et le début du MBA.",
    variant: "pop",
  },
  {
    date: "Automne 2026",
    title: "MBA — Entrepreneuriat et gestion de PME",
    text: "Le prochain chapitre : structurer ce que j'ai appris sur le terrain avec un cadre plus rigoureux.",
  },
  {
    date: "Été 2026",
    title: "Backpack solo — Asie",
    text: "Le deuxième grand voyage seul. Même exercice qu'en 2024, ailleurs — voir ce qui a changé en moi entre les deux.",
    variant: "mauve",
  },
];

export default function Timeline() {
  return (
    <ol className={styles.timeline}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={(i % 4) * 89} className={styles.item}>
          <div
            className={`${styles.dot} ${
              item.variant === "pop"
                ? styles.dotPop
                : item.variant === "mauve"
                ? styles.dotMauve
                : ""
            }`}
            aria-hidden
          />
          <div className={styles.body}>
            <p className="t-meta">{item.date}</p>
            <h3 className="t-titre">{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
