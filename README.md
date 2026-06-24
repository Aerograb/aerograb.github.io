# AeroGrab — Project Page

Static project website for **AeroGrab: A Unified Framework for Aerial Grasping
in Cluttered Environments** (IEEE/RSJ IROS).

Plain HTML / CSS / JS — no build step, no dependencies. Just add your media to
`assets/` and push to GitHub Pages.

## Files

```
aerograb-site/
├── index.html        # all page content (edit text + links here)
├── style.css         # all styling (palette + fonts live in :root at the top)
├── script.js         # scroll reveals, animated pipeline, nav, copy-BibTeX
├── .nojekyll          # tells GitHub Pages to serve files as-is
├── README.md          # this file
└── assets/
    └── README.txt     # exact filenames the page expects (figures, video, PDF)
```

## Before you publish

1. Add your media to `assets/` (see `assets/README.txt` for the exact names).
2. In `index.html`, fill in the `TODO` items:
   - confirm the venue / year line in the hero,
   - set the **arXiv** and **Code** button links,
   - set the **PDF / poster / slides** links (or keep the `assets/...` defaults),
   - choose local `demo.mp4` vs. a YouTube `<iframe>` in the Video section,
   - update the BibTeX `booktitle` / `year` / `pages` once final,
   - set the absolute `og:image` URL for the social preview.
3. Retheme if you like: every color and font is a variable at the top of
   `style.css` (`:root`).

## Deploy on GitHub Pages

**Option A — project site (`username.github.io/REPO/`):**

1. Create a repo (e.g. `aerograb`) and push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "AeroGrab project page"
   git branch -M main
   git remote add origin https://github.com/USERNAME/aerograb.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment**.
   Set **Source: Deploy from a branch**, **Branch: `main`**, **Folder: `/ (root)`**, Save.
3. Wait ~1 minute. Your page is live at
   `https://USERNAME.github.io/aerograb/`.

**Option B — user/organization site (`username.github.io`):**

Name the repo exactly `USERNAME.github.io`, push the same files to `main`,
and it will be served at `https://USERNAME.github.io/`.

> All asset links are relative, so both options work without edits.

## Local preview

Open `index.html` directly, or run a tiny server (recommended so video/paths
behave exactly like production):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## License

The page template is free to reuse and adapt. Replace the content and assets
with your own.
