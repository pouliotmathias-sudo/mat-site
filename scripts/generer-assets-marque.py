"""Génère les assets visuels du site depuis le kit de marque (algoritm-brain).

- public/fonts/Nunito-Variable.woff2   (sous-ensemble latin, axe wght conservé)
- public/fonts/ALGORITM-Regular.woff2  (police du nom, capitales seulement)
- public/brand/trame-dark-blue.svg     (trame sombre, ligne d'accent bleue)
- public/brand/trame-dark.svg          (trame sombre, sans accent)
- public/brand/algoritm-lockup-white.svg (le seul logo ALGORITM du site)
- public/og.png                        (image de partage 1200 × 630)
- app/favicon.ico + app/apple-icon.png (monogramme M)

Usage : python scripts/generer-assets-marque.py [chemin/vers/algoritm-brain]
Relancer si la photo, le nom ou la trame changent.
"""
import shutil
import sys
from pathlib import Path

from fontTools import subset
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
BRAIN = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Desktop" / "algoritm-brain"
MARQUE = BRAIN / "00-systeme" / "marque"
FONTS = MARQUE / "algoritm-font" / "fonts"

BLUE = (6, 98, 248)
WHITE = (255, 255, 255)
SUMI = (20, 20, 20)


def woff2(src: Path, dst: Path, unicodes: str) -> None:
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    font = subset.load_font(str(src), opts)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(unicodes))
    sub.subset(font)
    subset.save_font(font, str(dst), opts)
    print(f"  {dst.relative_to(ROOT)}  {dst.stat().st_size // 1024} Ko")


def fonts() -> None:
    out = ROOT / "public" / "fonts"
    out.mkdir(parents=True, exist_ok=True)
    # Latin de base + Latin-1 + Latin étendu A + ponctuation typographique française
    latin = "U+0020-007E,U+00A0-00FF,U+0100-017F,U+2010-2027,U+2030-203A,U+20AC,U+2192,U+2713"
    woff2(FONTS / "nunito" / "Nunito.ttf", out / "Nunito-Variable.woff2", latin)
    woff2(FONTS / "ALGORITM-Regular.ttf", out / "ALGORITM-Regular.woff2", "U+0020-007E")


def brand() -> None:
    out = ROOT / "public" / "brand"
    out.mkdir(parents=True, exist_ok=True)
    for name in ("trame-dark-blue.svg", "trame-dark.svg"):
        shutil.copy(MARQUE / "motif-trame" / name, out / name)
    shutil.copy(MARQUE / "logo-kit" / "lockup-full-white.svg", out / "algoritm-lockup-white.svg")
    print("  public/brand/ : trame-dark-blue.svg, trame-dark.svg, algoritm-lockup-white.svg")


def og() -> None:
    W, H = 1200, 630
    img = Image.open(MARQUE / "motif-trame" / "trame-dark-blue-1440.png").convert("RGB").crop((0, 700, W, 700 + H))  # la ligne bleue file vers le visage
    d = ImageDraw.Draw(img)

    # Photo détourée à droite, posée sur un disque sumi pour décoller la chemise noire du fond
    photo = Image.open(ROOT / "public" / "photos" / "mathias-sourire.png").convert("RGBA")
    ph = 700
    photo = photo.resize((int(photo.width * ph / photo.height), ph), Image.LANCZOS)
    px = W - photo.width + 60
    disc_r = 250
    cx, cy = px + photo.width // 2, H - 170
    d.ellipse((cx - disc_r, cy - disc_r, cx + disc_r, cy + disc_r), fill=SUMI, outline=(52, 52, 52), width=2)
    img.paste(photo, (px, H - ph + 90), photo)

    algo = str(FONTS / "ALGORITM-Regular.ttf")
    nunito = str(FONTS / "nunito" / "Nunito-ExtraBold.ttf")
    x = 72
    d.text((x, 118), "FONDATEUR DE THE ALGORITM", font=ImageFont.truetype(nunito, 24), fill=(160, 160, 160))
    d.rectangle((x, 160, x + 55, 163), fill=BLUE)
    name = ImageFont.truetype(algo, 104)
    d.text((x, 196), "MATHIAS", font=name, fill=WHITE)
    d.text((x, 306), "POULIOT", font=name, fill=WHITE)
    d.text((x, 448), "Entrepreneur · Automatisation IA · MBA", font=ImageFont.truetype(nunito, 30), fill=(210, 210, 210))
    d.text((x, 540), "mathiaspouliot.com", font=ImageFont.truetype(nunito, 24), fill=(140, 140, 140))

    img.save(ROOT / "public" / "og.png", optimize=True)
    print("  public/og.png")


def icons() -> None:
    algo = str(FONTS / "ALGORITM-Regular.ttf")

    def monogram(size: int, radius_ratio: float) -> Image.Image:
        s = size * 4  # suréchantillonnage, puis réduction
        im = Image.new("RGBA", (s, s), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)
        d.rounded_rectangle((0, 0, s - 1, s - 1), radius=int(s * radius_ratio), fill=(0, 0, 0, 255))
        f = ImageFont.truetype(algo, int(s * 0.62))
        l, t, r, b = d.textbbox((0, 0), "M", font=f)
        d.text(((s - (r - l)) / 2 - l, (s - (b - t)) / 2 - t - s * 0.03), "M", font=f, fill=WHITE)
        bar_w = s * 0.34
        d.rectangle(((s - bar_w) / 2, s * 0.80, (s + bar_w) / 2, s * 0.84), fill=BLUE)
        return im.resize((size, size), Image.LANCZOS)

    app = ROOT / "app"
    monogram(256, 0.18).save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (256, 256)])
    monogram(180, 0.0).convert("RGB").save(app / "apple-icon.png")
    print("  app/favicon.ico, app/apple-icon.png")


if __name__ == "__main__":
    if not MARQUE.exists():
        sys.exit(f"Kit de marque introuvable : {MARQUE}")
    fonts()
    brand()
    og()
    icons()
