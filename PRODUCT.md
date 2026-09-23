# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People looking for work who are comfortable installing a desktop application and
signing in with GitHub. The evidence for that reading is in the product rather
than in usage data: authentication is GitHub OAuth only, the download is an
unsigned binary whose first launch requires clearing a macOS quarantine flag or
dismissing a SmartScreen warning, and one feature drives coding-agent CLIs the
user already has installed. Each of those is a filter. No analytics, survey or
interview data exists, and none may be invented.

## Product Purpose

This repository is the public face of **jobscout**, a desktop job-search
application whose source is private in `Souvikns/jobscout`. Two things live
here: the GitHub releases people download, and the website at `findmejob.xyz`
that sends them to the right file.

The site's job is narrow. A visitor arrives not knowing what jobscout is; the
site must make the mechanism intelligible, make it credible enough to install an
unsigned binary, hand over the correct file for their operating system, and stop
them concluding the download is broken when their OS interrupts the first
launch. A download that ends in a deleted `.dmg` is a failure of this page.

## Positioning

jobscout's differentiator is where the work happens. Every job board asks the
seeker to read the listings and judge fit themselves; jobscout reads the
seeker's résumé on their own machine and marks each listing against it there,
showing the arithmetic. The résumé file never leaves the computer, the score is
computed at render time and never stored, and the conversation about a listing
runs through a coding-agent CLI the user already has.

That is a claim about mechanism, not outcomes. Nothing may claim jobscout gets
anyone hired, improves an application's success rate, or beats a real applicant
tracking system. None of that is measured.

## Operating Context

- The site is a React + Vite single-page build in `web/`, deployed static, with
  a relative base so one build works at a domain root and under a Pages path.
- The download list is read live from the GitHub Releases API at page load.
  Unauthenticated calls are rate-limited to 60/hour per address, so every
  failure path degrades to the `/releases/latest` redirect, which needs no API
  call and cannot go stale.
- Asset filenames are matched by suffix in `web/src/release.js`. The same
  suffixes are produced by `.github/workflows/release.yml` and consumed by the
  app's updater at `internal/updater/github.go`. Renaming one breaks all three.
- The visitor's platform is guessed from the user agent and is only a default.
- Release builds run in this public repo because Actions minutes are unmetered
  here; the private source is cloned with a read-only token and never appears.

## Capabilities and Constraints

What the site must keep doing, all already built:

- Detect the visitor's OS and lead with one download, other platforms reachable.
- Fetch the latest release and show its tag, file type, size and date.
- Survive four states without a dead end: loading, matched platform, unknown
  platform or phone, and a GitHub API that refused.
- Answer the unsigned-app interruption per platform, before it happens, with a
  copyable command where a command is the answer.
- Link to all releases and the issue tracker.

What jobscout does, verified in source:

- Full-text search over **Greenhouse** and **Wellfound**, by title and
  description. **Every search is bounded to the last two months**
  (`search.MaxAgeMonths = 2`, raised in `Query.Normalize` so no transport can
  widen it) because an older posting is usually filled or abandoned.
- Filters: location (suggestions carry their own job counts), work mode,
  seniority, employment type, years of experience. Sort by match or by newest.
- Every result states which board it came from; the boards differ in pay
  conventions, application flow and missing metadata.
- An opened listing **marks where the search words landed** in it.
- A **profile**, fillable from a résumé PDF read inside the app's own window.
  Only filename, size and extracted text are kept — the file never leaves. The
  profile itself syncs to the user's Supabase row, so it follows them to another
  machine.
- A **match score** computed locally over five criteria — required skills 40,
  experience 20, seniority 15, role relevance 15, preferred skills 10. A
  criterion the posting is silent about is dropped and the remaining weights
  renormalised; a profile answering no required skill is capped at 40. Bands:
  strong 85+, good 70, partial 50, weak below. A row shows **Fit**; an opened
  listing reads the description too and shows **ATS match** with the full
  breakdown. An unscorable listing gets no badge. No score is ever stored.
- A **conversation beside a listing**, answered by a coding agent already
  installed and signed in — Claude Code, opencode or codex — agent and model
  chosen per thread.
- **Full keyboard operation**: palette on `mod+K`, `?` for every shortcut, `/`
  to search, `j`/`k` for the result cursor, `o` for the original, `⌥` chords for
  filters, resolved through a scope stack.
- **In-app updates** on all three platforms; GitHub session restored on launch.

Hard constraints on what may be said:

- There is **no saved-jobs list and no application tracker**. The app has two
  destinations, Discover and Settings.
- Builds are **not code-signed** on macOS or Windows. Stated plainly, never
  softened.
- Linux is x86_64 only; macOS is one universal build; Windows is 64-bit.
- No fabricated job counts, companies, salaries, testimonials, user numbers,
  download counts or press mentions. Screenshots show the real application.

## Brand Commitments

A new visual identity is being designed for jobscout. Two things are fixed and
everything else is open, including light versus dark:

- The product is named **jobscout**, lower case.
- The site lives at **findmejob.xyz**. The domain and the product name differ;
  an identity must reconcile that deliberately rather than ignore it.

The identity is designed for both surfaces but applied to the website first. The
desktop app keeps its current system (`DESIGN.md` in the private repo: Geist Sans
and Mono, warm off-white `#FBFBF9`, ink `#232320`, no gradients, no dark theme)
until a later pass moves it across. Where the two disagree after this work, the
website is the newer statement and the app is the one to bring forward.

Existing assets that carry no commitment and may be replaced:
`web/public/favicon.svg`, `frontend/src/assets/images/logo-universal.png`.

## Evidence on Hand

- `web/src/App.jsx`, `web/src/FirstRun.jsx`, `web/src/release.js`: the site and
  every behaviour that must survive a redesign.
- `web/src/MarkScheme.jsx`: the scoring weights and bands as published figures.
- `README.md`, `.github/workflows/release.yml`: install truth and what a release
  ships.
- The private repo's `PRODUCT.md`, `DESIGN.md`, `frontend/src/` and
  `docs/SCREENSHOTS.md`: the feature set above, and the capture procedure.
- `web/public/shots/discover.png`: recaptured 2026-09-23 against v0.10.0 and
  current. The other four shots the site references are not yet taken.
- No analytics, conversion data or user research exists.

## Product Principles

- State only what is true, and state the awkward parts early. The quarantine
  warning is the clearest case.
- Show the product working rather than describing it.
- Never let a failed API call become a dead end. Every path reaches a download.
- Respect that the visitor is mid-job-search and tired. Get them the file.

## Accessibility & Inclusion

No standard is formally adopted, but the site already meets a floor a redesign
may not fall below: a skip link to the download, visible focus rings never
removed for mouse styling, screen-reader text on links labelled only by platform
name, a `role="status"` loading region, full alternatives on every screenshot,
WCAG AA contrast, and a `prefers-reduced-motion` path that reduces movement
without erasing the feedback that confirms an action.
