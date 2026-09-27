import {useEffect, useState} from 'react';
import {
    PLATFORMS,
    RELEASES_URL,
    REPO,
    detectPlatform,
    fetchLatestRelease,
    isMobile,
} from './release';
import {DownloadButton, PlatformStrip} from './Download';
import FirstRun from './FirstRun';
import {Foot, Nav} from './Chrome';

/**
 * The install page.
 *
 * Everything about getting jobscout onto a machine, off the landing page and in
 * one place: the right file for the visitor's platform, and the reason their
 * operating system is about to interrupt them.
 *
 * The landing page keeps a single line pointing here. That line is not
 * decoration — PRODUCT.md is explicit that a visitor who meets macOS's
 * "jobscout is damaged and can't be opened" with no warning concludes the
 * download is corrupt and leaves, and that a download ending in a deleted `.dmg`
 * is a failure of this site. A page nobody is sent to would be the FAQ that
 * warning exists to avoid.
 *
 * Unlike the landing page, this one shows all three platforms' notes rather than
 * only the detected one. Somebody arriving here is either installing now or
 * checking on behalf of a machine they are not sitting at, and both are served
 * by having the lot visible.
 */
export default function DownloadPage() {
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

    const picked = release?.downloads.find((d) => d.id === chosen && d.asset) ?? null;

    // The detected platform's note leads; the other two follow in the page's
    // usual order, so nothing is hidden behind a control.
    const ordered = [
        ...PLATFORMS.filter((p) => p.id === chosen),
        ...PLATFORMS.filter((p) => p.id !== chosen),
    ];

    return (
        <>
            <a className="skip" href="#download">
                Skip to the download
            </a>

            <Nav here="install" download={{picked, chosen, mobile}} />

            <main>
                <section className="page-head">
                    <div className="shell">
                        <h1>Install jobscout</h1>
                        <p>
                            One file, no installer to configure, and nothing to sign up
                            for. Your operating system will interrupt the first launch,
                            because the build is not code-signed — that is what the notes
                            below are for.
                        </p>

                        <div className="act" id="download">
                            <DownloadButton
                                release={release}
                                failed={failed}
                                picked={picked}
                                chosen={chosen}
                                mobile={mobile}
                            />
                            {!mobile && (
                                <PlatformStrip
                                    release={release}
                                    chosen={chosen}
                                    detected={detected}
                                    onChoose={setChosen}
                                />
                            )}
                        </div>
                    </div>
                </section>

                <section className="notes" aria-labelledby="notes-heading">
                    <div className="shell">
                        <h2 id="notes-heading">What your machine will say</h2>
                        <div className="note-grid">
                            {ordered.map((p) => (
                                <FirstRun
                                    key={p.id}
                                    platform={p.id}
                                    label={p.name}
                                    boxed
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="verify" aria-labelledby="verify-heading">
                    <div className="shell verify-inner">
                        <div>
                            <h2 id="verify-heading">Checking what you downloaded</h2>
                            <p>
                                Every release ships <code>SHA256SUMS.txt</code> beside the
                                binaries, so you can check the file you have against the
                                one that was built. The builds are unsigned, so this is the
                                only verification there is — we would rather say that
                                plainly than let it go unmentioned.
                            </p>
                        </div>
                        <div>
                            <h2>If something is wrong</h2>
                            <p>
                                The <a href={RELEASES_URL}>releases page</a> lists every
                                build and every checksum, and always works even when this
                                page cannot reach GitHub's API. Anything else belongs in{' '}
                                <a href={`https://github.com/${REPO}/issues`}>the issue
                                tracker</a>.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Foot />
        </>
    );
}
