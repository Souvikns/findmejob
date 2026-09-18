# The download site

A small Vite + React page that hands visitors the right build of jobscout.

```sh
cd web
npm install
npm run dev      # http://localhost:5173
npm run build    # -> web/dist
```

## How it works

The page reads the newest release from the GitHub API at load time rather than
hardcoding a version, so **cutting a release updates this site with no
redeploy**. Only a change under `web/` needs one.

It guesses the visitor's operating system to lead with one download instead of a
menu, and puts the first-run instructions for that OS directly under the button:
jobscout is unsigned, and macOS reports unsigned apps as *damaged*, which reads
like a corrupt download rather than a missing signature. A visitor who meets
that with no warning concludes the app is broken.

Every path degrades to something that still works. The GitHub API allows 60
unauthenticated requests an hour per address; when it refuses, when the platform
is not recognised, or when the visitor is on a phone, the button falls back to
the `/releases/latest` redirect, which needs no API call and cannot go stale.

`src/release.js` matches assets by filename suffix — `.dmg`, `_setup.exe`,
`.AppImage`. Those names are set by `.github/workflows/release.yml`; if the
release assets are ever renamed, that file has to change with them or the page
will fall back to the releases listing.

## Screenshots

`public/shots/` holds real captures of the app, not mockups. They go stale when
the UI changes. The procedure for retaking them lives in the private repo at
`docs/SCREENSHOTS.md`, along with `scripts/capture-screenshots.sh`, which
captures the window at a canonical 1200x800.

The captures are the window's exact frame — square corners, no shadow. The
rounding and the drop shadow are applied in CSS so the asset stays reusable.

## Design

The tokens are jobscout's own, taken from `DESIGN.md` in the private repo: warm
off-white ground, near-black ink, one blue-grey accent, Nunito, 8px control and
12px panel radii, one border or one shadow but never both. No gradients and no
dark theme — both are decisions the product has not made.

## Hosting

`vite.config.js` sets a relative base, so the same build works at a domain root
or under a project path. `.github/workflows/site.yml` deploys to GitHub Pages
but stays inactive until Pages is switched to "GitHub Actions" in the repository
settings. For a custom domain, add `public/CNAME` with the bare hostname.
