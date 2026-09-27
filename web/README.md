# The download site

A small Vite + React site that hands visitors the right build of jobscout. Two
pages: `index.html` is the landing page, `download.html` is the install page.

They are two HTML entry points, not client-side routes. The site deploys static
with a relative base, so real files resolve at a domain root and under a project
path with no server rewrites; adding a page means adding an entry to
`rollupOptions.input` in `vite.config.js` and a sibling to `src/main.jsx`.

One trap: macOS filesystems are case-insensitive, so `src/download.jsx` and
`src/Download.jsx` are the same file. The install page's entry is `src/install.jsx`
for that reason.

```sh
cd web
npm install
npm run dev      # http://localhost:4004
npm run build    # -> web/dist
```

## How it works

The page reads the newest release from the GitHub API at load time rather than
hardcoding a version, so **cutting a release updates this site with no
redeploy**. Only a change under `web/` needs one.

It guesses the visitor's operating system to lead with one download instead of a
menu. The first-run instructions live on `download.html`, which shows all three
platforms' notes at once.

**Do not let that page become unreachable.** jobscout is unsigned, and macOS
reports unsigned apps as *damaged*, which reads like a corrupt download rather
than a missing signature; a visitor who meets that with no warning concludes the
app is broken and leaves. The landing page therefore keeps a line under the
download button and a line in its closing section pointing at the install page,
and the footer links it on both pages. Removing those links is what turns this
from an answer into the FAQ nobody opens.

Every path degrades to something that still works. The GitHub API allows 60
unauthenticated requests an hour per address; when it refuses, when the platform
is not recognised, or when the visitor is on a phone, the button falls back to
the `/releases/latest` redirect, which needs no API call and cannot go stale.

`src/release.js` matches assets by filename suffix — `.dmg`, `_setup.exe`,
`.AppImage`. Those names are set by `.github/workflows/release.yml`; if the
release assets are ever renamed, that file has to change with them or the page
will fall back to the releases listing.

## The walkthrough video

The walkthrough section plays `public/walkthrough.mp4`, self-hosted — there is
no third-party embed, so nothing about a visitor reaches a video platform.

That file is not in the repository yet. `Walkthrough.jsx` asks for it with a
`HEAD` request before it builds a player, checks the response really is a video
rather than an `index.html` fallback, and until then shows `discover.png` under
a note saying the walkthrough has not been recorded. Dropping an `.mp4` into
`public/` is the whole fix; nothing in the source needs editing.

## Screenshots

`public/shots/` holds real captures of the app, not mockups. They go stale when
the UI changes. The procedure for retaking them lives in the private repo at
`docs/SCREENSHOTS.md`, along with `scripts/capture-screenshots.sh`, which
captures the window at a canonical 1200x800.

`discover.png` is the walkthrough's still frame. `Shots.jsx` knows about four
more — `job-score`, `job-chat`, `profile` and `palette` — probes for each the
same way, and removes the whole section while none of them exist.

## Design

The site's tokens live in `src/tokens.css`, transcribed from `DESIGN.md` at the
repository root: one continuous near-black canvas, a four-rung surface ladder,
1px hairlines, 6–10px radii, Inter with the `ss03` stylistic set on site-wide,
and a single white pill carrying every download. Nothing on the page casts a
shadow; separation is the surface ladder and the hairlines.

Two rules are worth knowing before editing anything here:

- **Colour means a score band.** Green is strong, blue good, yellow partial, red
  weak, and those four accents appear nowhere else — which is why the feature
  tiles are monochrome and why a selected control changes surface rather than
  taking a tint. A new accent on a new element breaks the only thing colour says
  on this site. The hero's gradient is not an exception to this: the 3px rule
  across the top of the page and the drifting stripe field behind the tagline are
  both the four bands in scale order, so the gradient *is* the scale. Reorder them
  and it stops meaning anything.
- **The stripe field's alphas are contrast ceilings, not taste.** White on
  `#59d499` is 1.9:1 and could not carry a headline; white on the same green mixed
  into this canvas clears 4.4:1 against the 3:1 large text needs. If you raise one,
  re-measure the brightest ground under every hero text element rather than
  eyeballing it, and score large text against 3:1 rather than 4.5:1.
- **The nav is fixed, not sticky.** That is what lets the hero be a clean full
  screen with the bar floating over its gradient. The cost is that every section
  an in-page anchor can reach needs `scroll-margin-top`, or the anchor lands
  underneath the bar. Add a new anchor target, add the scroll margin.
- **The download button needs no network to be correct.** Its label comes from the
  user agent and its href from the GitHub API, independently: the button names the
  right platform on first paint, and the API only upgrades the link from
  `/releases/latest` to the exact asset. That is why the landing page shows no
  loading line and no error text — pass `detail` only where the filename is the
  point, which is the install page.
- **Text stops at `--mute`.** `--ash` and `--stone` are for drawn marks and
  disabled controls; against this canvas they fall below 4.5:1 and must not
  carry body text.

The desktop app keeps its own, older system (Geist, warm off-white) until a
later pass brings this one across. Where the two disagree, this is the newer
statement.

## Hosting

`vite.config.js` sets a relative base, so the same build works at a domain root
or under a project path. `.github/workflows/site.yml` deploys to GitHub Pages
but stays inactive until Pages is switched to "GitHub Actions" in the repository
settings. For a custom domain, add `public/CNAME` with the bare hostname.
