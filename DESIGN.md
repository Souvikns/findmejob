---
name: jobscout
description: A contact sheet — many frames surveyed cheaply, the ones worth printing marked in grease pencil.
colors:
  paper: '#f2f0ea'
  sunk: '#e8e4da'
  rule: '#ddd8cc'
  ink: '#1a1714'
  silver: '#645e56'
  chinagraph: '#c0301a'
  amber: '#8a5a12'
  film: '#26221d'
  film-hi: '#322c25'
  film-deep: '#191612'
  film-silver: '#9a948a'
  window: '#fbfaf6'
  safelight: '#c98a2e'
  band-strong-bg: '#e1eee4'
  band-strong-ink: '#35634a'
  band-good-bg: '#dfe8ec'
  band-good-ink: '#406072'
  band-partial-bg: '#f3e9d5'
  band-partial-ink: '#6f5120'
  band-weak-bg: '#f0efeb'
  band-weak-ink: '#6d6c67'
typography:
  display:
    fontFamily: "'Bricolage Grotesque', Georgia, serif"
    fontSize: 'clamp(2.35rem, 5.4vw, 4rem)'
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: '-0.035em'
    fontVariation: "'wdth' 84"
  headline:
    fontFamily: "'Bricolage Grotesque', Georgia, serif"
    fontSize: '17px'
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: '-0.02em'
    fontVariation: "'wdth' 88"
  body:
    fontFamily: 'Archivo, system-ui, sans-serif'
    fontSize: '15px'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'Archivo, system-ui, sans-serif'
    fontSize: '11px'
    fontWeight: 700
    letterSpacing: '0.22em'
    fontVariation: "'wdth' 70"
  edge:
    fontFamily: 'Archivo, system-ui, sans-serif'
    fontSize: '10px'
    fontWeight: 600
    letterSpacing: '0.18em'
    fontVariation: "'wdth' 62"
rounded:
  none: '0'
spacing:
  gutter: 'clamp(20px, 5vw, 60px)'
  section: 'clamp(34px, 6vw, 72px)'
  page: '1240px'
components:
  button-primary:
    background: '{colors.ink}'
    color: '{colors.paper}'
    borderRadius: '{rounded.none}'
    padding: '0 30px'
  button-primary-hover:
    background: '#ffffff'
  button-ghost:
    background: 'transparent'
    color: '{colors.ink}'
    borderRadius: '{rounded.none}'
  chip-unselected:
    background: '{colors.film}'
    color: '{colors.window}'
    borderRadius: '{rounded.none}'
  chip-selected:
    background: '{colors.film-hi}'
    color: '{colors.window}'
    borderRadius: '{rounded.none}'
---

# Design System: jobscout

## Overview

**Creative North Star: "The Contact Sheet"**

You shoot a roll, print every frame small on one sheet, and go down it with a
grease pencil marking the ones worth enlarging. That is the job search — many
candidates, cheaply surveyed, a few marked — and it is the whole system. The
page is the worktop the sheet is lying on; the sheet is film; the mark is a
grease pencil stroke.

The character is workshop rather than studio: plain paper, real film, a tool
that has been used. It is quiet where the app is quiet and loud in exactly one
place, the chinagraph mark, which is the only saturated thing on the page and
appears at most twice in a viewport. The mark is always a straight stroke along
an edge — never a ring drawn round something. Nothing here is soft. There are
no shadows, no rounded corners, and no gradients.

The identity was chosen against a named anti-reference: the developer-tool
brand this category ships — geometric sans wordmark, one abstract glyph, a
single indigo accent, soft shadows — which is also what findmejob.xyz looked
like before it.

**Key Characteristics:**
- Paper ground, film objects, one grease-pencil stroke
- Square corners everywhere; the frame is the shape
- No shadows at any elevation
- Colour carries meaning exactly twice: the mark, and the four score bands
- Type at the scale of imagery, not above it

## Colors

A worktop palette: paper and ink, with real film laid on it and one pencil.

### Primary
- **Chinagraph** (`#c0301a`): the grease-pencil mark, and nothing else. It is
  the leading edge of the chosen platform frame and the left edge of the
  first-run warning, and it is the focus ring. It appears at most twice in a
  viewport and is always a stroke along an edge.

### Secondary
- **Safelight Amber** (`#c98a2e`): film edge printing only — the stock name and
  frame number exposed along the film between the perforations. Its darker
  sibling **Amber Ink** (`#8a5a12`) carries section labels on paper, where the
  lighter value would fail contrast.

### Neutral
- **Paper** (`#f2f0ea`): the page ground, the worktop the sheet lies on.
- **Sunk** (`#e8e4da`): recessed panels — the first-run note, bar tracks, keycaps.
- **Rule** (`#ddd8cc`): section dividers and hairlines.
- **Ink** (`#1a1714`): primary text, the download block, command blocks. 15.7:1.
- **Silver** (`#645e56`): secondary text. 4.8:1 on paper.

### Film
These do not invert with the page. A rebate that prints black prints black
whatever it is lying on.
- **Film** (`#26221d`): the rebate — the body of a strip.
- **Film Hi** (`#322c25`): sprocket-strip ground, hover.
- **Film Deep** (`#191612`): the window of a frame that holds text, not a picture.
- **Window** (`#fbfaf6`): the light inside a frame.
- **Film Silver** (`#9a948a`): secondary text on film.

### Bands
The four score bands are the application's own tints, so a band means the same
thing on the page as it does in the window: strong `#e1eee4`/`#35634a`, good
`#dfe8ec`/`#406072`, partial `#f3e9d5`/`#6f5120`, weak `#f0efeb`/`#6d6c67`.
Every ink passes AA on its own ground.

### Named Rules

**The Mark Rule.** Chinagraph is a mark, never a surface carrying text. It
fails AA as a text ground at 3.71:1, and a grease pencil was never a fill
anyway. It marks an edge; it does not hold anything.

**The Straight Stroke Rule.** The mark is a stroke along an edge. No rings, no
circled elements, no drawn-on loops — they read as defacing the thing they are
meant to single out, especially over a screenshot.

**The Two Meanings Rule.** Colour carries meaning in exactly two places — the
mark, and the score bands. Everywhere else is paper, ink, film and silver. A
third coloured thing is a defect.

## Typography

**Display Font:** Bricolage Grotesque (variable: opsz, wdth, wght)
**Body Font:** Archivo (variable: wdth 62–125, wght 100–900)
**Label/Edge Font:** Archivo at width 62

**Character:** An industrial grotesque over a print workhorse — the voice of
type printed on film cans and darkroom equipment rather than of a software
brand. Archivo's width axis does three jobs from one file: reading text at
normal width, section labels at 70, and the film's own edge printing at 62.

### Hierarchy
- **Display** (700, `clamp(2.35rem, 5.4vw, 4rem)`, 1.02, `-0.035em`, wdth 84):
  the headline, once per page.
- **Headline** (700, 17px, 1.25, `-0.02em`, wdth 88): fact titles.
- **Body** (400, 15–17px, 1.6): prose, held to roughly 40–46ch in a column and
  never past 62ch.
- **Label** (700, 11px, `0.22em`, uppercase, wdth 70): section labels, in amber.
- **Edge** (600, 10px, `0.18em`, uppercase, wdth 62): film edge printing only.

### Named Rules

**The Imagery Rule.** Type is a primary material, not labelling. The display
line runs at the scale of pictures and is never introduced by a kicker.

**The Edge Rule.** Edge printing is the one place text may be decorative,
because on real film that is exactly what it is. It never carries information
the page needs, except the frame number, which is not decorative at all.

## Layout

A single centred column capped at 1240px with a fluid gutter of
`clamp(20px, 5vw, 60px)`. The hero is two columns from 1000px — copy left,
frame right, roughly 1 : 1.05 — and one column below that. Feature grids are
`auto-fit` with a 290px minimum; frame grids use 300px. Sections are separated
by a single hairline rule and `clamp(34px, 6vw, 72px)` of space above, always
more above a heading than below it.

## Elevation & Depth

**There are no shadows anywhere in this system.** Depth is the sheet and the
objects lying on it: paper, then film (dark against it), then the window (light
inside the film), then the mark (on top of everything). Layering is by value,
not by blur. A drop shadow would make the film look like it is floating above
the worktop rather than resting on it.

### Named Rules

**The Flat Sheet Rule.** If something needs to read as raised, give it a
different value, not a shadow.

## Shapes

Square corners, everywhere, with no exceptions. `border-radius` is `0` across
the whole system — a rounded film frame is not a film frame. The recurring
silhouette is the frame: a light rectangle inside a dark strip, bounded above
and below by sprocket perforations and closed by a line of edge printing. The
only curve in the system is the chinagraph mark, and it is hand-drawn.

## Components

### Buttons
- **Shape:** square (`0`)
- **Primary:** ink ground, paper text, `0 30px` / 54px line — the one dark block
  on a light page, and the page's only primary action.
- **Hover / Focus:** ground to pure white; press scales to `0.99` over 80ms.
  Focus is a 2px chinagraph outline at 3px offset.
- **Ghost:** transparent with a 2px rule inset, for the phone case where no
  download applies.

### Chips (the platform strip)
- **Style:** small film frames — `film` ground, a `film-deep` window, the
  platform name in window-light and its file type in film-silver.
- **State:** the chosen one takes `film-hi` and a 3px chinagraph inset edge down
  its leading side. State is a mark, not a fill: a lit chip beside the lit
  download gave the page two primary actions.

### Cards / Containers
There are none. Grouping is done with rules and column position. The only
bounded blocks are frames, the first-run note, and command blocks — each a real
object rather than a container.

### Frames (signature component)
A screenshot in a film frame: `film` strip, sprocket perforations top and
bottom rendered as a repeating gradient, a `window` well holding the image, and
a line of edge printing carrying the stock name and frame number. A frame whose
image is missing removes itself entirely rather than showing a broken picture.

### Navigation
A masthead only: the wordmark with the ring mark at left, one text link right.
No nav bar; the page is one scroll.

## Motion

One easing, `cubic-bezier(0.16, 1, 0.3, 1)`. Arrivals are 380–620ms, feedback
140ms, presses 80ms. The authored moment is the mark scheme drawing itself —
five weight bars filling in sequence 70ms apart with their figures arriving
behind them, capped well under a second end to end. Everything else is
supporting: the hero frame settling in, the six facts arriving as one 275ms
sequence, and the version line settling when the release resolves.

Under `prefers-reduced-motion: reduce` nothing arms at all — the reveal hook
checks the preference and returns early, so every element renders finished.
Colour feedback that confirms an action survives; only movement goes.

## Do's and Don'ts

### Do:
- **Do** keep chinagraph to at most two appearances per viewport.
- **Do** put screenshots inside frames. On a contact print the rebate is black
  and the frames are the light, which is why a light app screenshot belongs
  there and does not fight the page.
- **Do** use the application's own band tints for scores, so page and product
  agree.
- **Do** let a frame remove itself when its capture is missing.
- **Do** state proportions with length and keep bars monochrome.
- **Do** mark state with a stroke along an edge.

### Don't:
- **Don't** put text on chinagraph. It fails AA at 3.71:1.
- **Don't** add a `border-radius`. Anywhere.
- **Don't** add a shadow. Depth is value, not blur.
- **Don't** tint a set of bars to imply a ranking the colours do not encode.
- **Don't** invert the film with the page. A rebate prints black on any ground.
- **Don't** introduce a kicker above a heading.
- **Don't** draw a ring, circle or loop round anything. Marks are straight
  strokes on edges.
