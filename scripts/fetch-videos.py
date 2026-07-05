#!/usr/bin/env python3
"""
fetch-videos.py — Régénère data/videos.json depuis l'API YouTube.

À relancer quand des nouvelles vidéos sont publiées sur la chaîne
(ou à brancher dans le pipeline check_drive_videos.py plus tard).

Utilise l'OAuth du compte personnel pouliot.mathias@gmail.com
(mêmes credentials que youtube-pipeline-orchestrator).

Usage : python scripts/fetch-videos.py   (depuis la racine de mat-site)
"""

import json
import re
import sys
from pathlib import Path

import requests

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

OAUTH_PATH = r"C:\Users\Mathias Pouliot\.claude\youtube-oauth-keys.json"
CREDS_PATH = r"C:\Users\Mathias Pouliot\.claude\youtube-credentials.json"
OUT = Path(__file__).resolve().parent.parent / "data" / "videos.json"


def get_token():
    keys = json.load(open(OAUTH_PATH, encoding="utf-8"))["web"]
    creds = json.load(open(CREDS_PATH, encoding="utf-8"))
    r = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "client_id": keys["client_id"],
            "client_secret": keys["client_secret"],
            "refresh_token": creds["refresh_token"],
            "grant_type": "refresh_token",
        },
        timeout=30,
    )
    r.raise_for_status()
    return r.json()["access_token"]


def iso_duration_to_readable(d):
    """PT16M51S -> '17 min' (arrondi à la minute la plus proche)."""
    m = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", d or "")
    if not m:
        return ""
    h, mn, s = (int(x) if x else 0 for x in m.groups())
    total_min = h * 60 + mn + (1 if s >= 30 else 0)
    if total_min >= 60:
        return f"{total_min // 60} h {total_min % 60:02d}"
    return f"{max(total_min, 1)} min"


def main():
    token = get_token()
    H = {"Authorization": f"Bearer {token}"}

    r = requests.get(
        "https://www.googleapis.com/youtube/v3/channels",
        headers=H,
        params={"part": "contentDetails", "mine": "true"},
        timeout=30,
    )
    r.raise_for_status()
    uploads = r.json()["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]

    items, page = [], None
    while True:
        p = {"part": "snippet", "playlistId": uploads, "maxResults": 50}
        if page:
            p["pageToken"] = page
        r = requests.get(
            "https://www.googleapis.com/youtube/v3/playlistItems",
            headers=H,
            params=p,
            timeout=30,
        )
        r.raise_for_status()
        d = r.json()
        items.extend(d["items"])
        page = d.get("nextPageToken")
        if not page:
            break

    ids = [i["snippet"]["resourceId"]["videoId"] for i in items]
    videos = []
    for i in range(0, len(ids), 50):
        r = requests.get(
            "https://www.googleapis.com/youtube/v3/videos",
            headers=H,
            params={
                "part": "snippet,contentDetails,status",
                "id": ",".join(ids[i : i + 50]),
                "maxResults": 50,
            },
            timeout=30,
        )
        r.raise_for_status()
        videos.extend(r.json()["items"])

    out = []
    for v in videos:
        s, st, cd = v["snippet"], v["status"], v["contentDetails"]
        title = s["title"]
        is_short = "#Shorts" in title or "#shorts" in title
        # Le site liste les vidéos longues publiques OU programmées
        # (une programmée devient cliquable à sa date de publication —
        # le front filtre par date au rendu).
        if is_short:
            continue
        if st.get("privacyStatus") == "public":
            live_at = s.get("publishedAt")
        elif st.get("publishAt"):
            live_at = st["publishAt"]
        else:
            continue
        thumbs = s.get("thumbnails", {})
        thumb = (
            thumbs.get("maxres") or thumbs.get("standard") or thumbs.get("high") or {}
        ).get("url", "")
        out.append(
            {
                "id": v["id"],
                "title": title.strip(),
                "description": s.get("description", "").split("\n")[0][:220],
                "liveAt": live_at,
                "duration": iso_duration_to_readable(cd.get("duration")),
                "thumbnail": thumb,
            }
        )

    out.sort(key=lambda x: x["liveAt"], reverse=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    json.dump(out, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{len(out)} vidéos longues écrites dans {OUT}")


if __name__ == "__main__":
    main()
