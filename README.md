# SYS-HOMELAB

**Learn. Build. Document.**

Private Homelab-Website und Control-Center-Dashboard — Lernplattform, Portfolio-Projekt und Testumgebung für Linux, Docker, Netzwerke, Automatisierung und IT-Security.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite / Übersicht |
| `dashboard.html` | Control Center (Systemstatus, Topologie, Aktivitäten) |
| `system.html` | Hardware & Betriebssystem |
| `netzwerk.html` | Netzwerk-Topologie & Konfiguration |
| `dienste.html` | Host-Dienste & geplante Docker-Container |
| `storage.html` | Festplatte & Belegung |
| `streaming.html` | Geplanter Streaming-Bereich |
| `logs.html` | Ereignisprotokoll |
| `projekt.html` | SYS-Ökosystem (SYS-Portfolio, SYS-Garden) |
| `dokumentation.html` | Screenshot-Richtlinien & Corporate Design |
| `roadmap.html` | 8-Phasen-Plan |
| `blog.html` | Baufortschritt-Artikel |
| `ueber-mich.html` | Kurzprofil |

## Struktur

```
SYS-Homelab/
├── index.html ... ueber-mich.html   ← alle Seiten, echte Dateien (keine Anchor-Links)
├── assets/
│   ├── css/sys-homelab.css          ← EIN gemeinsames Stylesheet für alle Seiten
│   ├── js/sys-homelab.js            ← EIN gemeinsames Script (Uhr, Nav, Live-Werte)
│   └── img/                         ← Platzhalter für Screenshots/Icons/Logo
├── projects/
│   ├── configs/                     ← docker-compose.yml etc. (folgt Phase 3)
│   ├── documentation/               ← Setup-Notizen pro Dienst
│   └── scripts/                     ← Bash-Automatisierung (folgt Phase 7)
└── blog-posts/                      ← einzelne Blogartikel als Markdown
```

## Nutzung

Einfach `index.html` im Browser öffnen — kein Build-Schritt nötig.
Für die volle Navigation zwischen den Seiten am besten den ganzen Ordner
zusammen entpacken/hosten (z. B. GitHub Pages, Netlify, oder direkt vom
SYS-HOMELAB-Server selbst ausliefern lassen).

## Status

Phase 1/8 abgeschlossen: Ubuntu Server 26.04 LTS installiert, Netzwerk
(DHCP) eingerichtet, System aktualisiert, SSH-Dienst aktiv. Alle
weiteren Dienste (Cockpit, Docker, Portainer, Grafana, …) sind geplant
und in `dienste.html` / `roadmap.html` als solche gekennzeichnet — die
Seiten zeigen bewusst den echten Stand, nicht einen fiktiven Endzustand.

„Der beste Weg, die Zukunft vorherzusagen, ist sie zu gestalten." — Peter Drucker
