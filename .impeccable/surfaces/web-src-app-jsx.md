---
version: 1
slug: "web-src-app-jsx"
primary_target: "web/src/App.jsx"
related_targets: ["web/src/styles.css","web/index.html"]
---

## Scope

`findmejob.xyz` — the single-page download site in `web/`. Visitor mode:
**Persuade**. This pass replaces the visual identity outright; behaviour, copy
facts and functionality carry over unchanged. The desktop app keeps its own
`DESIGN.md` until a later pass brings it across.

## Audience, job, action

A person looking for work, comfortable installing a desktop app and signing in
with GitHub, arriving not knowing what jobscout is. The page must make the
mechanism intelligible, make it credible enough to install an unsigned binary,
hand over the right file, and stop them concluding the download is broken when
their OS interrupts the first launch.

Primary action: download the right asset. Secondary: read the first-run note.

## Proof and content

The product's own arithmetic, which is publishable: five weighted criteria
(40/20/15/15/10), criteria dropped when a posting is silent, four bands. Real
screenshots of the running app. No fabricated counts, companies, salaries or
testimonials — see PRODUCT.md.

## Constraints that outlive this design

- GitHub Releases API is rate-limited to 60/hour per address; every failure path
  degrades to the `/releases/latest` redirect.
- Asset suffixes in `web/src/release.js` are shared with the release workflow and
  the app's updater. Renaming one breaks all three.
- No saved-jobs list and no application tracker exist. Never show one.
- Builds are unsigned on macOS and Windows. Stated plainly.
- The name is `jobscout`; the domain is `findmejob.xyz`. Both fixed.

## Direction contract

**THESIS.** You shoot a roll, print every frame small on one sheet, and go down
it with a grease pencil ringing the two worth enlarging. That is the job search:
many candidates, cheaply surveyed, a few marked. The site is that sheet. It
refuses the arrangement this category ships and that findmejob.xyz ships today —
white ground, centred hero, one dark button, a floating drop-shadowed screenshot,
three equal feature columns.

**OWN-WORLD.** Warm fibre-paper near-black `#191612` is the ground, because on a
real contact print the film rebate prints black and the frames are the light —
which makes a light application screenshot the correct content for a frame
rather than a fight with the page. `#26221D` for rebate strips and panels,
`#F3F1EA` for frame light and primary text, `#9A948A` for secondary,
`#C98A2E` safelight amber for film-edge printing. Chinagraph `#E2402B` is a
**mark, never a surface carrying text** — it fails AA as a text ground at
3.71:1, and a grease pencil was never a fill anyway. Bricolage Grotesque carries
the wordmark and display; Archivo variable carries text, tabular figures and the
condensed film-edge type at wdth 62. Frames have square corners, rebate edges
and sprocket perforations. No shadows: depth is the sheet and the frames on it.

**STORY.** The visitor sees a sheet of frames with one ringed, understands
within a viewport that this thing goes down a long list and marks what fits
them, believes it because the marking criteria are published, and takes the file
for their platform having already read why their OS will interrupt them.

**FIRST VIEWPORT.** The sheet, full bleed. Top-left the wordmark with the ring
mark; top-right GitHub. Left column: the headline at display scale, the lede,
and the download as the one lit block on a dark sheet — `#F3F1EA` ground,
`#191612` text, square. Under it the platform strip: three small frames, the
detected one carrying the chinagraph ring. Right column: the hero frame — the
Discover screenshot in a film frame with rebate, sprocket perforations and its
frame number set in safelight amber — ringed in chinagraph.

**FORM.** The darkroom contact sheet, marked in grease pencil. Candidate 1 of my
ordered grounded list, offered as the pick and taken by the user over the
assigned direction. Seed key `2b2890fb`.

Raises carried in from the declined challengers: the mark carries before a word
is read, on favicon, installer and 404 alike (endurance livery); three facts in
fixed positions every time (pulp rack); type as primary material at the scale of
imagery, not as labelling (alphabet storm); the seam stays visible — never a
polished result with the working smoothed away (coiled earth tower).

**FINISH.** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment

The travelling chinagraph ring. Choosing a platform draws the grease-pencil ring
onto that frame with a stroke that starts where a hand would start and does not
quite close, while the previous ring lifts. Picking your platform is marking a
frame — the same gesture the whole sheet is about, and it preserves the existing
behaviour exactly: detection pre-marks one, all three stay reachable.

## Unresolved

`web/public/shots/` holds only `discover.png`, recaptured 2026-09-23 and current.
The other four frames the sheet has room for — `job-score`, `job-chat`,
`profile`, `palette` — are not yet captured; each removes itself until its file
lands. Procedure: `docs/SCREENSHOTS.md` in the private repo.
