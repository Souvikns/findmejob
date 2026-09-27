---
version: 1
slug: "web-src-app-jsx"
primary_target: "web/src/App.jsx"
related_targets: ["web/src/styles.css","web/index.html"]
---

## Scope

`findmejob.xyz` — the site in `web/`, now two static pages: the landing page
(`index.html`) and the install page (`download.html`). Two HTML entry points
rather than client-side routing, because the site deploys static with a relative
base and both URLs then resolve at a domain root and under a project path with no
server rewrites. Visitor mode:
**Persuade**. This pass replaces the visual identity outright: the darkroom
contact-sheet world is retired and the user has pinned its replacement in
`DESIGN.md`. Behaviour, copy facts and functionality carry over unchanged. The
desktop app keeps its own design system until a later pass brings it across.

## Audience, job, action

A person looking for work, comfortable installing a desktop app and signing in
with GitHub, arriving not knowing what jobscout is. The page must make the
mechanism intelligible, make it credible enough to install an unsigned binary,
hand over the right file, and stop them concluding the download is broken when
their OS interrupts the first launch.

Primary action: download the right asset. Secondary: watch the walkthrough, and
reach the install page before the first launch rather than after it.

The landing page no longer carries the unsigned-app answer itself. PRODUCT.md
still governs it: a visitor who meets macOS's "damaged" dialog unwarned concludes
the download is corrupt and leaves, so one line under the pill and one line in the
close both point at `download.html`, and that page leads with all three platforms'
notes. A page nobody is sent to would be the FAQ the warning exists to avoid.

## Proof and content

The product's own arithmetic, which is publishable: five weighted criteria
(40/20/15/15/10), criteria dropped when a posting is silent, four bands (strong
85+, good 70–84, partial 50–69, weak under 50). A walkthrough video of the real
app at `public/walkthrough.mp4`, not yet captured. Real screenshots; only
`discover.png` exists today. No fabricated companies, job counts, salaries,
testimonials or download counts — so no mock job feed anywhere on the page.

## Constraints that outlive this design

- GitHub Releases API is rate-limited to 60/hour per address; every failure path
  degrades to the `/releases/latest` redirect.
- Asset suffixes in `web/src/release.js` are shared with the release workflow and
  the app's updater. Renaming one breaks all three.
- No saved-jobs list and no application tracker exist. Never show one.
- Builds are unsigned on macOS and Windows. Stated plainly.
- The name is `jobscout`; the domain is `findmejob.xyz`. Both fixed.

## Direction contract

**THESIS.** The page is the product's own chrome at marketing scale — the visitor
reads the app before they read an argument about it. It refuses the arrangement
this category ships: white ground, floating drop-shadowed screenshot, three equal
icon-heading-paragraph columns, and a testimonial wall there is no data for. It
also refuses the sheet it replaces. One idea only: **a number about your career
is only worth having if you can see the arithmetic behind it**, so the
arithmetic is the hero.

**OWN-WORLD.** The world is pinned by `DESIGN.md` and inherited whole: one
continuous near-black canvas `#07080a` with a faint surface ladder
(`#0d0d0d` → `#101111` → `#121212`), 1px hairlines at `#242728`, 6–10px radii,
no shadows anywhere, Inter with `ss03` on site-wide, and a single white pill
carrying every download. Geist Mono appears only where there is genuinely code.
jobscout's own claim on that world, in place of Raycast's red launch stripes:
**the four saturated accents are the score bands and nothing else** — green
`#59d499` strong, blue `#57c1ff` good, yellow `#ffc533` partial, red `#ff6161`
weak. Colour on this page always means a band, so it never decorates and never
appears where a band is not what is being said. The hero's one gradient is the
exception that proves it: a 3px spectrum rule across the top of the page and,
behind the tagline, seven drifting diagonal stripes — both running green → blue →
yellow → red in scale order, so the gradient is the score scale rather than
atmosphere. The stripe form is taken from Raycast's own hero at the user's
request; its red is not, because red already means the weak band here. The alphas
are contrast ceilings rather than taste. A band's 15% soft tint may be a
ground carrying text — `DESIGN.md` sanctions exactly that in `badge-info-soft`,
and the band cards use it — but a saturated accent never is: at 3.71:1 against
white the red could not carry text, and a system where one accent behaves
differently from the other three is not a system.

**STORY.** The visitor watches a score resolve out of five named criteria before
they have read a sentence, understands within one viewport that this thing goes
down a long list and marks each posting against them, believes it because the
weights and bands are published rather than asserted, watches the real app work
in the walkthrough, and takes the file for their platform having already read why
their OS will interrupt them.

**FIRST VIEWPORT.** A 3px spectrum rule at the very top, then a floating 60px
bar inset from the edges — translucent, blurred, hairline-ringed — carrying the
wordmark, the section links, and a compact white download pill. It is fixed, so
it floats over the hero's colour rather than capping it, and the section links
stand down on a phone while the pill never does. Below it a
single centred column and nothing else: the tagline *Find jobs that are meant for
you* at up to 86px, one white pill naming the visitor's own platform, and one
underlined caption-sized line to the install page. No lede, no screenshot, no
second button, no status text, no platform tabs — the pill's label comes from the
user agent and its href upgrades to the exact binary when the API answers, so
there is nothing to report and nothing to choose. The section is
one full screen tall, so the walkthrough begins exactly at the fold. Behind the
words and sized by them, the band-scale bloom: six diagonal stripes in scale
order, grained, each drifting on its own clock under a slow sweep, feathered to
nothing on every side and masked clear of the button.

**FORM.** The product's own chrome, scaled up. Not dealt by the roll: the user
pinned this world by writing `DESIGN.md`, and a brief-pinned direction beats the
roll. The section order is likewise the user's own: landing, walkthrough,
feature showcase. No seed key — no direction round was run, and none was owed.

**FINISH.** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment

The mark card resolving, once. Five criterion tracks fill to their real weights
in one orchestrated sequence, the ATS number counts up in tabular figures, and
the band chip lights green at the end. It is the product's whole argument
performed in about a second, built from published figures, and it invents no
company, listing or count. Reduced motion is handed the finished card outright.

## Unresolved

- `public/walkthrough.mp4` is not captured. The walkthrough section detects it
  and falls back to `discover.png` under a plain note until the file lands, and
  its deck changes with that state rather than claiming a running time for
  footage nobody has shot. It carries no chapter markers and no timecodes: those
  would have to be invented against a file that does not exist. The four beats
  beneath the player describe the application's own sequence, so they are true
  either way and stay put.
- `public/shots/` holds only `discover.png`. `job-score`, `job-chat`, `profile`
  and `palette` each remove themselves until captured.
