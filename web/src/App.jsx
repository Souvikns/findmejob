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

/**
 * The download page.
 *
 * One job: get the right file into the visitor's hands and keep them from
 * bouncing off the unsigned-app warning thirty seconds later. Everything else
 * is subordinate to that, which is why the primary download sits in the first
 * viewport and the first-run note sits directly beneath it rather than in a
 * FAQ nobody opens.
 */
export default function App() {
    const [release, setRelease] = useState(null);
    const [failed, setFailed] = useState(false);
    const [platform, setPlatform] = useState(null);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        setPlatform(detectPlatform());
        setMobile(isMobile());
        let live = true;
        fetchLatestRelease()
            .then((r) => live && setRelease(r))
            .catch(() => live && setFailed(true));
        return () => {
            live = false;
        };
    }, []);

    // The visitor can always override the guess; `platform` is only the default.
    const primary = release?.downloads.find((d) => d.id === platform && d.asset);
    const others = release?.downloads.filter((d) => d !== primary && d.asset) || [];

    return (
        <>
            <a className="skip" href="#download">Skip to download</a>

            <header className="masthead">
                <span className="wordmark">jobscout</span>
                <a className="masthead-link" href={`https://github.com/${REPO}`}>
                    GitHub
                </a>
            </header>

            <main>
                {/* The product shares the first viewport with the offer: a
                    download page for a desktop app that shows no app is asking
                    for trust it has not earned. */}
                <section className="hero">
                    <div className="hero-copy">
                        <h1>
                            A quiet desktop
                            <br />
                            job search.
                        </h1>
                        <p className="lede">
                            Search openings from Greenhouse and Wellfound in one
                            focused window. No tabs, no feed, no notifications — just
                            the roles and the filters that narrow them.
                        </p>

                        <div className="download" id="download">
                            <Primary
                                release={release}
                                failed={failed}
                                primary={primary}
                                platform={platform}
                                mobile={mobile}
                            />
                            {others.length > 0 && (
                                <p className="others">
                                    Also for{' '}
                                    {others.map((d, i) => (
                                        <span key={d.id}>
                                            {i > 0 &&
                                                (i === others.length - 1 ? ' and ' : ', ')}
                                            <a href={d.asset.url}>
                                                {d.name}
                                                <span className="sr-only">
                                                    {' '}
                                                    — download the {d.ext}
                                                </span>
                                            </a>
                                        </span>
                                    ))}
                                    .
                                </p>
                            )}
                        </div>

                        {platform && !mobile && <FirstRun platform={platform} />}
                    </div>

                    <figure className="hero-shot">
                        <img
                            src="./shots/discover.png"
                            width="2400"
                            height="1600"
                            alt="The jobscout Discover screen: a search field, filters for location, seniority and employment type, and a list of job results showing title, company, location and salary."
                            fetchPriority="high"
                            decoding="async"
                        />
                        <figcaption>
                            Discover, the screen the app opens on.
                        </figcaption>
                    </figure>
                </section>

                <section className="what" aria-labelledby="what-heading">
                    <h2 id="what-heading">What it does</h2>
                    <dl className="facts">
                        <div>
                            <dt>One corpus, searched directly</dt>
                            <dd>
                                Listings from Greenhouse and Wellfound, searched by title
                                and description. Filter by remote, seniority and
                                employment type; page through everything that matches.
                            </dd>
                        </div>
                        <div>
                            <dt>Sign in once with GitHub</dt>
                            <dd>
                                The session is stored on your machine and restored the
                                next time you open the app, so signing in is a one-time
                                step rather than a daily one.
                            </dd>
                        </div>
                        <div>
                            <dt>A desktop app, not a website</dt>
                            <dd>
                                Built with Wails, Go and React. It opens in its own
                                window, keeps its place while you read, and does not
                                compete with the other forty tabs.
                            </dd>
                        </div>
                    </dl>
                </section>
            </main>

            <footer>
                <p>
                    <a href={RELEASES_URL}>All releases</a>
                    <span aria-hidden="true"> · </span>
                    <a href={`https://github.com/${REPO}/issues`}>Report a problem</a>
                </p>
                <p className="fine">
                    jobscout is free and unsigned. The source is kept private; this page
                    and the releases are public.
                </p>
            </footer>
        </>
    );
}

/**
 * The one button that matters.
 *
 * Four states, and none of them may be a dead end: loading, a matched platform,
 * a visitor whose platform was not recognised or who is on a phone, and a
 * GitHub API that refused (its rate limit is 60 requests an hour per address).
 * The last three all fall through to the /releases/latest redirect, which needs
 * no API call and cannot go stale.
 */
function Primary({release, failed, primary, platform, mobile}) {
    if (failed || (release && !primary && !platform)) {
        return (
            <>
                <a className="button" href={LATEST_URL}>
                    Download jobscout
                </a>
                <p className="version">
                    Choose your platform on the releases page.
                </p>
            </>
        );
    }

    if (!release) {
        return (
            <>
                <span className="button button-loading" aria-hidden="true">
                    Download jobscout
                </span>
                <p className="version" role="status">
                    Finding the latest version…
                </p>
            </>
        );
    }

    if (mobile) {
        return (
            <>
                <a className="button button-quiet" href={LATEST_URL}>
                    See the downloads
                </a>
                <p className="version">
                    jobscout is a desktop app — open this page on your computer to
                    install it. Latest is {release.tag}.
                </p>
            </>
        );
    }

    if (!primary) {
        const p = PLATFORMS.find((x) => x.id === platform);
        return (
            <>
                <a className="button" href={LATEST_URL}>
                    Download jobscout
                </a>
                <p className="version">
                    {release.tag} has no {p ? p.name : 'matching'} build — the releases
                    page lists everything it does have.
                </p>
            </>
        );
    }

    const size = formatSize(primary.asset.size);
    const date = formatDate(release.published);

    return (
        <>
            <a className="button" href={primary.asset.url}>
                Download for {primary.name}
            </a>
            <p className="version">
                {release.tag} · {primary.ext}
                {size ? ` · ${size}` : ''} · {primary.note}
                {date ? ` · released ${date}` : ''}
            </p>
        </>
    );
}
