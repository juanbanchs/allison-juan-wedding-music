# Allison & Juan — Wedding Remembrance

A small keepsake site featuring nine songs from our wedding day.

Built with Vite + React + TypeScript + Tailwind CSS v4.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/allison-juan-wedding-music/
npm run build    # outputs to dist/
npm run preview  # serves the production build
```

## Deploying to GitHub Pages

The repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`
that builds and deploys to Pages on every push to `main`. To wire it up:

1. **Create the repo on GitHub** (one-time, browser):

   <https://github.com/new>
   - Name: `allison-juan-wedding-music`
   - Owner: `juanbanchs`
   - Public, no README, no .gitignore, no license

2. **Push the code**:

   ```bash
   git push -u origin main
   ```

3. **Enable Pages** (one-time, browser):

   Repo → **Settings** → **Pages** → **Build and deployment** → set
   **Source** to **GitHub Actions**.

4. The workflow will run automatically. Live at:
   <https://juanbanchs.github.io/allison-juan-wedding-music/>

### Manual deploy fallback

If the Action ever fails, the `gh-pages` package is also wired up:

```bash
npm run deploy
```

## Adding or swapping content

- **Photos** — drop new files into `public/photos/` and reference them in
  `src/tracks.ts`. The hero photo is `heroPhoto` at the bottom of that file.
- **Songs** — drop new MP3s into `public/audio/` and update `src/tracks.ts`.
- **Lyrics** — edit the `lyrics` field in `src/tracks.ts`. Tracks without a
  `lyrics` field hide the toggle button.

The originals (HEIC photos, lyrics .txt drafts, .docx) live in `music/`,
`photos/`, and `web-photos/` — those folders are gitignored, kept locally
as a master backup. The web-ready copies in `public/` are what ships.
