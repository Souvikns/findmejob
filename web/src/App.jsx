import {useEffect, useState} from 'react';
import {
    LATEST_URL,
    PLATFORMS,
    RELEASES_URL,
    REPO,
    detectPlatform,
    fetchLatestRelease,
    formatDate,
    formatSize,
    isMobile,
} from './release';
import FirstRun from './FirstRun';
import Frame from './Frame';
import MarkScheme from './MarkScheme';
import useReveal from './useReveal';
import {EdgeMark} from './sheet';

/**
 * The contact sheet.
 *
 * You shoot a roll, print every frame small on one sheet, and go down it with a
 * grease pencil ringing the two worth enlarging. That is the job search — many
 * candidates, cheaply surveyed, a few marked — and this page is that sheet.
 *
 * The page's job has not changed and is not subordinate to any of it: get the
 * right file into the visitor's hands, and stop them concluding the download is
 * broken when their operating system interrupts the first launch. That is why
 * the download is the one lit block on a dark sheet and the first-run note sits
 * directly beneath it rather than in a FAQ nobody opens.
 */
export default function App() {
    const [release, setRelease] = useState(null);
    const [failed, setFailed] = useState(false);
    const [detected, setDetected] = useState(null);
    const [chosen, setChosen] = useState(null);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const guess = detectPlatform();
        setDetected(guess);
        setChosen(guess);
        setMobile(isMobile());

        let live = true;
        fetchLatestRelease()
            .then((r) => live && setRelease(r))
            .catch(() => live && setFailed(true));
        return () => {
            live = false;
        };
    }, []);

    // Detection is only a default. Marking a different frame is the override,
    // and every platform stays reachable whether or not the guess landed.
    const picked = release?.downloads.find((d) => d.id === chosen && d.asset) ?? null;

    return (
        <>
            <a className="skip" href="#download">
                Skip to the download
            </a>

            <header className="masthead">
                <span className="wordmark">
                    <RingMark />
                    jobscout
                </span>
                <a className="masthead-link" href={`https://github.com/${REPO}`}>
                    GitHub
                </a>
            </header>

            <main>
                <section className="hero">
                    <div className="hero-copy">
                        <h1>
                            A job search that goes
                            <br />
                            down the roll for you.
                        </h1>
                        <p className="lede">
                            jobscout pulls openings from Greenhouse and Wellfound, reads
                            your résumé on your own machine, and marks every listing
                            against it — <strong>with the working shown</strong>. No
                            tabs, no feed, no notifications.
                        </p>

                        <div className="download" id="download">
                            <Download
                                release={release}
                                failed={failed}
                                picked={picked}
                                chosen={chosen}
                                mobile={mobile}
                            />
                            {!mobile && (
                                <Strip
                                    release={release}
                                    chosen={chosen}
                                    detected={detected}
                                    onChoose={setChosen}
                                />
                            )}
                        </div>

                        {chosen && !mobile && <FirstRun platform={chosen} />}
                    </div>

                    <HeroFrame>
                        <Frame
                            file="discover.png"
                            no="12A"
                            priority
                            alt="The jobscout Discover screen: a search field with what and where, filters for work mode, seniority, employment type and experience, and a column of job results showing title, company, location, a match percentage and the job board each came from."
                            caption="Discover — the screen the app opens on."
                        />
                    </HeroFrame>
                </section>

                <MarkScheme />

                <section className="what" aria-labelledby="what-heading">
                    <h2 id="what-heading">What it does</h2>
                    <Facts>
                        <div className="fact" style={{'--step': 0}}>
                            <dt>One corpus, and nothing stale</dt>
                            <dd>
                                Listings from Greenhouse and Wellfound, searched by title
                                and description. Every search is bounded to the last two
                                months — an older posting is usually filled or abandoned —
                                and each result says which of the two boards it came from,
                                because they differ in what they promise.
                            </dd>
                        </div>
                        <div className="fact" style={{'--step': 1}}>
                            <dt>Filtered the way you actually look</dt>
                            <dd>
                                Location, work mode, seniority, employment type and years
                                of experience, sorted by match or by newest. The location
                                suggestions carry their own job counts, so choosing
                                between two near-identical spellings is an informed
                                choice. An opened listing marks where your search words
                                landed in it.
                            </dd>
                        </div>
                        <div className="fact" style={{'--step': 2}}>
                            <dt>Scored against your résumé</dt>
                            <dd>
                                Drop a PDF into Settings and every listing is marked
                                against it. A result row carries its fit at a glance; an
                                opened listing adds the requirements buried in the
                                description and shows the whole breakdown — every
                                criterion that counted, what it found, and the skills the
                                posting wants that you have not answered.
                            </dd>
                        </div>
                        <div className="fact" style={{'--step': 3}}>
                            <dt>Ask an agent about a listing</dt>
                            <dd>
                                A conversation sits beside the posting, answered by a
                                coding agent you already have installed and signed in to —
                                Claude Code, opencode or codex — with the agent and model
                                chosen per thread.
                            </dd>
                        </div>
                        <div className="fact" style={{'--step': 4}}>
                            <dt>Everything from the keyboard</dt>
                            <dd>
                                A command palette on <kbd>⌘K</kbd> lists every action with
                                its shortcut beside it. <kbd>/</kbd> searches,{' '}
                                <kbd>J</kbd> and <kbd>K</kbd> move the cursor,{' '}
                                <kbd>O</kbd> opens the original posting, and{' '}
                                <kbd>?</kbd> shows the lot.
                            </dd>
                        </div>
                        <div className="fact" style={{'--step': 5}}>
                            <dt>Sign in once, and it follows you</dt>
                            <dd>
                                The GitHub session is stored on your machine and restored
                                the next time you open the app, and your profile is kept
                                with your account, so it follows you to another machine.
                                The résumé file itself is never uploaded and no score is
                                ever stored. Updates install in place on all three
                                platforms.
                            </dd>
                        </div>
                    </Facts>
                </section>

                {/* The rest of the roll. Every frame removes itself when its
                    shot has not been taken, so this shrinks to what exists
                    rather than showing a row of gaps. */}
                <section className="roll" aria-labelledby="roll-heading">
                    <h2 id="roll-heading">The rest of the roll</h2>
                    <div className="frames">
                        <Frame
                            file="job-score.png"
                            no="13"
                            alt="An opened job listing in jobscout showing its ATS match percentage, a breakdown naming each criterion with what it found and the share of the score it carried, and outlined chips for the skills the posting asks for that the profile does not answer."
                            caption="An opened listing, with the whole breakdown behind its number."
                        />
                        <Frame
                            file="job-chat.png"
                            no="14"
                            alt="A job listing open in jobscout with a conversation panel beside it: an agent and model picker at the head of the thread, and a reply about the posting."
                            caption="The conversation sits beside the posting, not in another window."
                        />
                        <Frame
                            file="profile.png"
                            no="15"
                            alt="The jobscout Settings screen showing the Profile section: a headline field, seniority, years of experience, a list of skill chips, and a résumé well with a PDF attached."
                            caption="The profile every listing is scored against."
                        />
                        <Frame
                            file="palette.png"
                            no="16"
                            alt="The jobscout command palette open over the Discover screen, listing commands by name with their keyboard shortcuts beside them and filter values as runnable rows."
                            caption="The palette states what the keyboard does."
                        />
                    </div>
                </section>
            </main>

            <footer>
                <p className="foot-links">
                    <a href={RELEASES_URL}>All releases</a>
                    <a href={`https://github.com/${REPO}/issues`}>Report a problem</a>
                    <a href={`https://github.com/${REPO}`}>Repository</a>
                </p>
                <p className="fine">
                    Every release ships <code>SHA256SUMS.txt</code> beside the binaries.
                    jobscout is free and unsigned, and built with Wails, Go and React.
                    The source is kept private; this page and the releases are public.
                </p>
            </footer>
        </>
    );
}

/** The mark: a frame, ringed. */
function RingMark() {
    return (
        <svg className="ring-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <rect x="9" y="11" width="14" height="10" fill="currentColor" />
            <path
                d="M24.6 16.2c0 3.5-3.9 6.1-8.7 6.1-4.8 0-8.6-2.6-8.6-6.1 0-3.5 3.8-6.2 8.6-6.2 3.6 0 6.7 1.5 8 3.6"
                fill="none"
                stroke="var(--chinagraph)"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
        </svg>
    );
}

/**
 * The download: the one lit block on a dark sheet.
 *
 * Four states, none of them a dead end: loading, a platform whose asset is in
 * hand, a visitor on a phone, and a GitHub API that refused — its
 * unauthenticated limit is sixty requests an hour per address. The last three
 * fall through to the /releases/latest redirect, which needs no API call and
 * cannot go stale.
 */
function Download({release, failed, picked, chosen, mobile}) {
    const platform = PLATFORMS.find((p) => p.id === chosen);

    let href = LATEST_URL;
    let label = 'Download jobscout';
    let quiet = false;
    let waiting = false;
    let note = <>Choose your platform on the releases page.</>;

    if (mobile) {
        quiet = true;
        label = 'See the downloads';
        note = (
            <>
                jobscout is a desktop application — open this page on your computer to
                install it.
                {release ? (
                    <>
                        {' '}
                        Latest is <b>{release.tag}</b>.
                    </>
                ) : null}
            </>
        );
    } else if (failed) {
        note = (
            <>
                GitHub's release API did not answer, so this page cannot name the file.
                The releases page always can.
            </>
        );
    } else if (!release) {
        waiting = true;
        note = <>Finding the latest version…</>;
    } else if (picked) {
        href = picked.asset.url;
        label = `Download for ${picked.name}`;
        const size = formatSize(picked.asset.size);
        const date = formatDate(release.published);
        note = (
            <>
                <b>{picked.asset.name}</b>
                <br />
                {release.tag} · {picked.ext}
                {size ? ` · ${size}` : ''} · {picked.note}
                {date ? ` · released ${date}` : ''}
            </>
        );
    } else if (!chosen) {
        note = (
            <>
                Your platform was not recognised. Mark one below, or take{' '}
                <b>{release.tag}</b> from the releases page.
            </>
        );
    } else {
        note = (
            <>
                <b>{release.tag}</b> ships no {platform ? platform.name : 'matching'}{' '}
                build. The releases page lists everything it does have.
            </>
        );
    }

    return (
        <>
            {waiting ? (
                <span className="print print-wait" aria-hidden="true">
                    {label}
                </span>
            ) : (
                <a className={`print${quiet ? ' print-quiet' : ''}`} href={href}>
                    {label}
                </a>
            )}
            <p className="print-note" role={waiting ? 'status' : undefined} key={label}>
                {note}
            </p>
        </>
    );
}

/**
 * The platform strip: three frames, and the ring is on yours.
 *
 * Marking a different frame is how the guess gets overridden. The chosen one
 * carries a chinagraph edge — state is a mark, not a fill, so it never competes
 * with the download for being the lit thing on the page. Every platform is
 * present whether or not detection landed, so an unrecognised agent is a frame
 * nobody has marked yet rather than a dead end.
 */
function Strip({release, chosen, detected, onChoose}) {
    return (
        <div className="strip" role="radiogroup" aria-label="Your platform">
            {PLATFORMS.map((p) => {
                const asset = release?.downloads.find((d) => d.id === p.id)?.asset;
                const size = formatSize(asset?.size);
                const on = chosen === p.id;
                return (
                    <button
                        key={p.id}
                        type="button"
                        className={`chip${on ? ' is-chosen' : ''}`}
                        role="radio"
                        aria-checked={on}
                        onClick={() => onChoose(p.id)}
                    >
                        <span className="chip-window">
                            <b>{p.name}</b>
                            <span>
                                {p.ext}
                                {size ? ` · ${size}` : ''}
                            </span>
                        </span>
                        {detected === p.id && <span className="sr-only"> — detected</span>}
                    </button>
                );
            })}
        </div>
    );
}

/** The hero frame, arriving once rather than simply being there. */
function HeroFrame({children}) {
    const [ref, stage] = useReveal({rootMargin: '0px'});
    return (
        <div className="hero-frame" ref={ref} data-stage={stage}>
            {children}
        </div>
    );
}

/**
 * The feature list, entering as one sequence.
 *
 * A list is the one shape a stagger genuinely describes, so this is the only
 * staggered entrance on the page. The CSS declares the finished state, so with
 * no JavaScript, or with reduced motion asked for, every fact is simply there.
 */
function Facts({children}) {
    const [ref, stage] = useReveal();
    return (
        <dl className="facts" ref={ref} data-stage={stage}>
            {children}
        </dl>
    );
}
