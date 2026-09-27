import {useEffect, useState} from 'react';
import {detectPlatform, fetchLatestRelease, isMobile} from './release';
import {DownloadButton} from './Download';
import Features from './Features';
import MarkScheme from './MarkScheme';
import Shots from './Shots';
import Walkthrough from './Walkthrough';
import {Foot, HeroField, Nav} from './Chrome';

/**
 * findmejob.xyz — one continuous dark page that reads like the product's own
 * chrome at marketing scale.
 *
 * The page's job has not changed and is not subordinate to the design: get the
 * right file into the visitor's hands, and stop them concluding the download is
 * broken when their operating system interrupts the first launch. That is why the
 * white pill is the only filled white element on the whole site, and why the
 * first-run note sits directly beneath it rather than in a FAQ nobody opens.
 *
 * The argument above it is the arithmetic. A number about somebody's career is
 * only worth having if you can see where it came from, so the hero performs the
 * breakdown — five real weights, a number that is exactly their sum — before the
 * visitor has read a sentence of persuasion.
 */
export default function App() {
    const [release, setRelease] = useState(null);
    const [failed, setFailed] = useState(false);
    const [chosen, setChosen] = useState(null);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        setChosen(detectPlatform());
        setMobile(isMobile());

        let live = true;
        fetchLatestRelease()
            .then((r) => live && setRelease(r))
            .catch(() => live && setFailed(true));
        return () => {
            live = false;
        };
    }, []);

    // Detection is only a default. Picking another platform is the override, and
    // every platform stays reachable whether or not the guess landed.
    const picked = release?.downloads.find((d) => d.id === chosen && d.asset) ?? null;
    const download = {release, failed, picked, chosen, mobile};

    return (
        <>
            <a className="skip" href="#download">
                Skip to the download
            </a>

            <Nav home download={download} />

            <main>
                {/* One line and one button. The lede, the breakdown card and the
                    unsigned-app note all left this section; the card moved down
                    to the mark scheme and the note to its own page. */}
                <section className="hero">
                    <div className="shell hero-inner">
                        {/* The field is a sibling of the headline, not of the
                            section, so it is sized and centred on the words
                            themselves rather than on the viewport. */}
                        <div className="hero-head">
                            <HeroField />
                            <h1>Find jobs that are meant for you</h1>
                        </div>

                        <div className="act" id="download">
                            <DownloadButton {...download} detail={false} />
                            {/* The one line that survives here, and it has two
                                jobs: the other platforms, and the warning.
                                PRODUCT.md is explicit that a visitor who meets
                                macOS's damaged-app dialog unwarned concludes the
                                download is corrupt and leaves, so the notes may
                                move off this page but may not become a page
                                nobody is sent to. */}
                            <a className="act-aside" href="./download.html">
                                Other platforms, and why your first launch is
                                interrupted
                            </a>
                        </div>
                    </div>
                </section>

                <Walkthrough />
                <Features />
                <MarkScheme />
                <Shots />

                <section className="close" aria-labelledby="close-heading">
                    <div className="shell close-inner">
                        <h2 id="close-heading">
                            Free, unsigned, and yours in one file.
                        </h2>
                        <p>
                            macOS, Windows and Linux. The{' '}
                            <a href="./download.html">install notes</a> cover what each one
                            says on first launch and how to get past it.
                        </p>
                        <div className="act">
                            <DownloadButton {...download} detail={false} />
                        </div>
                    </div>
                </section>

            </main>

            <Foot />

        </>
    );
}
