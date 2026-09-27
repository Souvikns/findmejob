import {
    IconKeyboard,
    IconMessage,
    IconSearch,
    IconSliders,
} from './Icons';

/**
 * The feature showcase.
 *
 * Deliberately not four equal cards of icon-plus-heading-plus-paragraph: the
 * tiles run at two different widths, each one carries a drawn fragment of the
 * application's own chrome rather than an illustration of it, and the section
 * ends on three plain columns under a hairline with no card behind them at
 * all, so the rhythm breaks before it becomes a pattern.
 *
 * The section is entirely monochrome. On this page colour means a score band and
 * nothing else, so the four accents wait for the mark scheme immediately below
 * and every value shown here is real: the two boards, the two-month bound, the
 * app's actual filter values, its actual shortcuts, and the three coding agents
 * it can drive. There is no company name, salary or job count anywhere in it,
 * because none of those may be invented.
 */
export default function Features() {
    return (
        <section className="features" id="features" aria-labelledby="features-heading">
            <div className="shell">
                <div className="features-head">
                    <h2 id="features-heading">What the app actually does</h2>
                    <p>
                        Two destinations, Discover and Settings. No feed, no
                        notifications, no saved-jobs list and no application tracker —
                        those do not exist, and this page will not show you one.
                    </p>
                </div>

                <div className="mosaic">
                    <article className="tile tile-wide">
                        <TileHead icon={<IconSearch />}>
                            One corpus, and nothing stale
                        </TileHead>
                        <p>
                            Listings from Greenhouse and Wellfound, searched by title and
                            description. Searches reach back two months by default — an
                            older posting is usually filled or abandoned — and Settings
                            widens that to a year when you want the long view. Each result
                            says which of the two boards it came from, because they differ
                            in what they promise.
                        </p>
                        <BoardArt />
                    </article>

                    <article className="tile">
                        <TileHead icon={<IconKeyboard />}>
                            Everything from the keyboard
                        </TileHead>
                        <p>
                            A command palette lists every action with its shortcut beside
                            it. Nothing needs the mouse.
                        </p>
                        <KeyArt />
                    </article>

                    <article className="tile">
                        <TileHead icon={<IconSliders />}>
                            Filtered the way you look
                        </TileHead>
                        <p>
                            Sorted by match or by newest. Location suggestions carry their
                            own job counts, so choosing between two near-identical
                            spellings is an informed choice.
                        </p>
                        <FilterArt />
                    </article>

                    <article className="tile tile-wide">
                        <TileHead icon={<IconMessage />}>
                            Ask an agent about a listing
                        </TileHead>
                        <p>
                            A conversation sits beside the posting, answered by a coding
                            agent you already have installed and signed in to. The agent
                            and the model are chosen per thread, and the work happens on
                            your machine through a CLI you already trust.
                        </p>
                        <AgentArt />
                    </article>
                </div>

                <div className="tenets">
                    <div>
                        <h3>Your résumé file never leaves the machine</h3>
                        <p>
                            The PDF is read inside the app's own window and is never
                            uploaded. Only the filename, the size and the extracted text
                            are kept — that text syncs to your account so the profile
                            follows you, and it is what the agent is given when you ask it
                            about a listing. No score is ever stored: every number is
                            computed the moment it is shown.
                        </p>
                    </div>
                    <div>
                        <h3>Sign in once, and it follows you</h3>
                        <p>
                            The GitHub session is restored the next time you open the app,
                            and the profile is kept with your account, so it reaches
                            another machine without you filling it in again.
                        </p>
                    </div>
                    <div>
                        <h3>Updates install in place</h3>
                        <p>
                            On macOS, Windows and Linux alike. You clear the unsigned-app
                            warning once, on the first install, and not again.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TileHead({icon, children}) {
    return (
        <h3 className="tile-head">
            <span className="tile-icon">{icon}</span>
            {children}
        </h3>
    );
}

/** The two boards, and the window every search is held inside. */
function BoardArt() {
    return (
        <div className="art art-boards" aria-hidden="true">
            <div className="art-rows">
                <span>
                    <i />
                    Greenhouse
                </span>
                <span>
                    <i />
                    Wellfound
                </span>
            </div>
            <div className="art-range">
                <em className="art-range-old">Older postings</em>
                <em className="art-range-live">2 months, or up to a year</em>
            </div>
        </div>
    );
}

/** The shortcuts, as the palette prints them. */
function KeyArt() {
    const KEYS = [
        [['⌘', 'K'], 'Command palette'],
        [['/'], 'Search'],
        [['J'], 'Next result'],
        [['O'], 'Open the posting'],
        [['?'], 'Every shortcut'],
    ];
    return (
        <dl className="art art-keys" aria-hidden="true">
            {KEYS.map(([keys, what]) => (
                <div key={what}>
                    <dt>
                        {keys.map((k) => (
                            <kbd key={k}>{k}</kbd>
                        ))}
                    </dt>
                    <dd>{what}</dd>
                </div>
            ))}
        </dl>
    );
}

/** The filter values the app actually offers, one row on. */
function FilterArt() {
    const ROWS = [
        ['Remote', 'Hybrid', 'On-site'],
        ['Mid', 'Senior', 'Lead'],
        ['Full-time', 'Contract'],
    ];
    return (
        <div className="art art-filters" aria-hidden="true">
            {ROWS.map((row, i) => (
                <div className="art-pills" key={i}>
                    {row.map((v, j) => (
                        <span className={j === i % row.length ? 'is-on' : ''} key={v}>
                            {v}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}

/** The agent picker at the head of a thread. */
function AgentArt() {
    const AGENTS = ['Claude Code', 'opencode', 'codex'];
    return (
        <div className="art art-agents" aria-hidden="true">
            <div className="art-agent-rows">
                {AGENTS.map((a, i) => (
                    <span className={i === 0 ? 'is-on' : ''} key={a}>
                        <i />
                        {a}
                    </span>
                ))}
            </div>
            <span className="art-agent-note">Model chosen per thread</span>
        </div>
    );
}
