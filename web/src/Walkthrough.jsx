import {useEffect, useRef, useState} from 'react';
import {IconPlay} from './Icons';

/**
 * The walkthrough.
 *
 * The video is self-hosted at `public/walkthrough.mp4` — no third-party embed, so
 * nothing about a visitor reaches a video platform, and the player's chrome stays
 * inside this design system instead of arriving with its own.
 *
 * That file has not been captured yet, and a `<video>` pointing at a 404 is a
 * broken black rectangle. So the section asks for it first and only builds a
 * player when it is actually there; until then the poster frame carries the
 * section under a plain note. Dropping the file into `public/` is the whole fix
 * and nothing here needs editing — the same rule the screenshots follow.
 */

const SRC = './walkthrough.mp4';
const POSTER = './shots/discover.png';

export default function Walkthrough() {
    const [state, setState] = useState('checking');
    const [playing, setPlaying] = useState(false);
    const video = useRef(null);

    useEffect(() => {
        let live = true;
        // HEAD is enough to know whether the file exists, and it costs no
        // bandwidth on a page whose visitor may never press play. The content
        // type is checked too: a host that falls back to `index.html` for an
        // unknown path answers HEAD with a cheerful 200, and a <video> pointed
        // at an HTML document is a black rectangle.
        fetch(SRC, {method: 'HEAD'})
            .then((res) => {
                const type = res.headers.get('content-type') || '';
                const ok = res.ok && type.startsWith('video/');
                if (live) setState(ok ? 'ready' : 'absent');
            })
            .catch(() => live && setState('absent'));
        return () => {
            live = false;
        };
    }, []);

    function start() {
        setPlaying(true);
        // The controls only appear once play has been asked for, so the first
        // frame reads as one composed image rather than as a browser widget.
        requestAnimationFrame(() => video.current?.play());
    }

    return (
        <section className="walk" id="walkthrough" aria-labelledby="walk-heading">
            <div className="shell">
                <div className="walk-head">
                    <h2 id="walk-heading">It goes down the list for you</h2>
                    <p>
                        jobscout pulls openings from Greenhouse and Wellfound, reads
                        your résumé on your own machine, and marks every one of them
                        against it — showing the arithmetic.{' '}
                        {state === 'ready' ? (
                            <>
                                Here it is doing that: a search over both boards, the
                                filters narrowing it, a listing opened with its breakdown,
                                and the same work done from the keyboard alone.
                            </>
                        ) : (
                            <>
                                A recording of it working is not up yet; what that will
                                show is below, and the screens are real captures rather
                                than mockups.
                            </>
                        )}
                    </p>
                </div>

                <figure className="player">
                    <div className="player-bar">
                        <span className="player-name">jobscout — Discover</span>
                        <span className="player-meta">
                            {state === 'ready' ? 'Walkthrough' : 'Still frame'}
                        </span>
                    </div>

                    <div className="player-stage">
                        {state === 'ready' ? (
                            <>
                                <video
                                    ref={video}
                                    className="player-video"
                                    src={SRC}
                                    poster={POSTER}
                                    controls={playing}
                                    playsInline
                                    preload="metadata"
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(true)}
                                />
                                {!playing && (
                                    <button
                                        type="button"
                                        className="player-play"
                                        onClick={start}
                                    >
                                        <IconPlay size={22} />
                                        Play the walkthrough
                                    </button>
                                )}
                            </>
                        ) : (
                            <img
                                className="player-still"
                                src={POSTER}
                                alt="The jobscout Discover screen: a search field with what and where, filters for work mode, seniority, employment type and experience, and a column of job results showing title, company, location, a match percentage and the job board each came from."
                                fetchPriority="low"
                                decoding="async"
                            />
                        )}
                    </div>

                    <figcaption>
                        {state === 'absent' ? (
                            <>
                                The walkthrough has not been recorded yet. This is the
                                screen the app opens on.
                            </>
                        ) : (
                            <>Recorded against the current release. No narration.</>
                        )}
                    </figcaption>
                </figure>

                <ol className="beats">
                    <li>
                        <b>Search</b>
                        <span>
                            One query over both boards, the last two months by default.
                        </span>
                    </li>
                    <li>
                        <b>Narrow</b>
                        <span>
                            Location, work mode, seniority, employment type, years.
                        </span>
                    </li>
                    <li>
                        <b>Open</b>
                        <span>
                            The breakdown behind the number, and where your words landed.
                        </span>
                    </li>
                    <li>
                        <b>Ask</b>
                        <span>
                            A thread beside the posting, answered by your own agent.
                        </span>
                    </li>
                </ol>
            </div>
        </section>
    );
}
