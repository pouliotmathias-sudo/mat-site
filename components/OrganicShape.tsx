/**
 * La forme organique du fond des vidéos YouTube, en SVG —
 * une bande courbe crème qui traverse la section en diagonale douce.
 * Décorative seulement (aria-hidden), positionnée derrière le contenu.
 */
export default function OrganicShape({
  flip = false,
  opacity = 1,
}: {
  flip?: boolean;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        transform: flip ? "scaleX(-1)" : undefined,
        opacity,
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          d="M 1560 -80
             C 1280 60, 1150 180, 1040 330
             C 930 480, 860 560, 700 650
             C 540 740, 420 800, 300 960
             L 640 1000
             C 760 840, 880 760, 1040 670
             C 1200 580, 1300 460, 1400 320
             C 1500 180, 1580 80, 1700 -40
             Z"
          fill="var(--cream)"
        />
      </svg>
    </div>
  );
}
