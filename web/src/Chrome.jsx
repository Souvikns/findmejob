import {RELEASES_URL, REPO} from './release';
import {downloadTarget} from './Download';
import {IconArrow, IconDownload, IconGithub} from './Icons';

/**
 * The parts both pages share.
 *
 * There are two HTML entry points now — the landing page and the install page —
 * and the chrome is identical on both. Kept here rather than copied so the
 * bar, the wordmark and the footer cannot drift apart between them.
 */

/**
 * The mark: a short list with one row marked.
 *
 * The same drawing as the favicon, and one of the few places outside the mark
 * scheme and the hero gradient where a band colour appears — because it is a
 * band, in the strong green, doing the one thing the product does.
 */
export function Mark() {
    return (
        <svg className="mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <rect width="32" height="32" rx="7" fill="var(--surface)" />
            <rect x="7" y="8" width="11" height="3" rx="1.5" fill="var(--stone)" />
            <rect
                x="7"
                y="14.5"
                width="18"
                height="3"
                rx="1.5"
                fill="var(--accent-green)"
            />
            <rect x="7" y="21" width="9" height="3" rx="1.5" fill="var(--stone)" />
        </svg>
    );
}

/**
 * The hero field: the band scale as drifting diagonal light.
 *
 * Six stripes laid across the headline at a shallow angle, in the scale's own
 * order left to right — greens, then blue, then yellow, then reds — blurred into
 * one another and dusted with grain. Each drifts and breathes on its own clock
 * under a slow sweep of the whole field, so it never visibly loops and no two
 * stripes ever line up the same way twice.
 *
 * The colours are accents at low alpha over the near-black canvas rather than
 * accents at full strength. That is not timidity: white on `#59d499` is 1.9:1
 * and could not carry a headline, where white on the same green mixed into this
 * canvas clears the 3:1 that large text needs with room to spare. The stripes
 * read as deep light rather than as paint.
 *
 * Nothing here is decorative in the sense the page's own rule forbids. It is the
 * four score bands, in order, at the scale of the words.
 */
export function HeroField() {
    // Position, width, band and weight per stripe, left to right in scale
    // order. Six rather than more, and each wide: the field is about a thousand
    // pixels across, and a stripe narrower than its own blur is not a stripe.
    const STRIPES = [
        {x: -12, w: 26, c: 'green', o: 0.62, d: 11, delay: -2},
        {x: 12, w: 15, c: 'green', o: 0.4, d: 15, delay: -7},
        {x: 26, w: 24, c: 'blue', o: 0.6, d: 9, delay: -4},
        {x: 48, w: 16, c: 'yellow', o: 0.4, d: 13, delay: -1},
        {x: 64, w: 22, c: 'red', o: 0.54, d: 10, delay: -6},
        {x: 84, w: 24, c: 'red', o: 0.36, d: 16, delay: -3},
    ];

    return (
        <div className="hero-field" aria-hidden="true">
            <div className="hero-stripes">
                {STRIPES.map((s, i) => (
                    <i
                        key={i}
                        className={`stripe stripe-${s.c}`}
                        style={{
                            '--x': `${s.x}%`,
                            '--w': `${s.w}%`,
                            '--o': s.o,
                            '--d': `${s.d}s`,
                            '--delay': `${s.delay}s`,
                        }}
                    />
                ))}
            </div>
            <div className="hero-grain" />
        </div>
    );
}

export function Nav({home = false, here, download}) {
    // On the install page the section anchors are not on this page, so they
    // reach across to the landing page rather than pointing at nothing.
    const at = home ? '' : './index.html';
    const target = download ? downloadTarget(download) : null;

    return (
        <header className="nav">
            <div className="nav-bar">
                <a className="wordmark" href={home ? './' : './index.html'}>
                    <Mark />
                    jobscout
                </a>

                <nav className="nav-links" aria-label="Sections">
                    <a href={`${at}#walkthrough`}>Walkthrough</a>
                    <a href={`${at}#features`}>Features</a>
                    <a href={`${at}#scoring`}>Scoring</a>
                    <a href={RELEASES_URL}>Releases</a>
                </nav>

                <div className="nav-end">
                    <a
                        className="nav-plain"
                        href={`https://github.com/${REPO}`}
                        aria-label="GitHub"
                    >
                        <IconGithub size={17} />
                    </a>
                    <a
                        className="nav-plain nav-optional"
                        href="./download.html"
                        aria-current={here === 'install' ? 'page' : undefined}
                    >
                        Install
                    </a>
                    {target && (
                        <a
                            className={`pill pill-sm${target.quiet ? ' pill-quiet' : ''}`}
                            href={target.href}
                        >
                            <IconDownload size={15} />
                            <span className="nav-label">{target.short}</span>
                            <span className="sr-only">{target.label}</span>
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
}

export function Foot() {
    return (
        <footer className="foot">
            <div className="shell foot-inner">
                <span className="wordmark wordmark-sm">
                    <Mark />
                    jobscout
                </span>
                <nav className="foot-links" aria-label="Project">
                    <a href="./download.html">
                        Install notes
                        <IconArrow size={14} />
                    </a>
                    <a href={RELEASES_URL}>
                        All releases
                        <IconArrow size={14} />
                    </a>
                    <a href={`https://github.com/${REPO}/issues`}>
                        Report a problem
                        <IconArrow size={14} />
                    </a>
                    <a href={`https://github.com/${REPO}`}>
                        Repository
                        <IconArrow size={14} />
                    </a>
                </nav>
                <p className="fine">
                    jobscout is free and unsigned, and built with Wails, Go and React. The
                    source is kept private; this page and the releases are public.
                </p>
            </div>
        </footer>
    );
}
