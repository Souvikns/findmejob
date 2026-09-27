import {useEffect, useState} from 'react';

/**
 * The remaining screenshots.
 *
 * The shots are taken by hand from the running app, so a screen this page knows
 * about can be one nobody has captured yet. Each one removes itself when its file
 * is missing, and the section removes itself when none of them landed — a row of
 * broken-image icons is worse than no section, and a heading over an empty grid is
 * worse than both. Dropping the files into `public/shots/` is the whole fix.
 *
 * Existence is asked for with HEAD rather than inferred from an `<img>` error,
 * because these images are below the fold and lazy: a lazy image outside the
 * viewport never attempts to load, so it never fires `error` either, and the
 * section would sit there as four empty frames until somebody scrolled to it.
 *
 * `discover.png` is not listed here: it carries the walkthrough above as its
 * poster frame, and the same image twice on one page is a gap wearing content's
 * clothes.
 */

const SHOTS = [
    {
        file: 'job-score.png',
        alt: 'An opened job listing in jobscout showing its ATS match percentage, a breakdown naming each criterion with what it found and the share of the score it carried, and outlined chips for the skills the posting asks for that the profile does not answer.',
        caption: 'An opened listing, with the whole breakdown behind its number.',
    },
    {
        file: 'job-chat.png',
        alt: 'A job listing open in jobscout with a conversation panel beside it: an agent and model picker at the head of the thread, and a reply about the posting.',
        caption: 'The conversation sits beside the posting, not in another window.',
    },
    {
        file: 'profile.png',
        alt: 'The jobscout Settings screen showing the Profile section: a headline field, seniority, years of experience, a list of skill chips, and a résumé well with a PDF attached.',
        caption: 'The profile every listing is scored against.',
    },
    {
        file: 'palette.png',
        alt: 'The jobscout command palette open over the Discover screen, listing commands by name with their keyboard shortcuts beside them and filter values as runnable rows.',
        caption: 'The palette states what the keyboard does.',
    },
];

const isImage = (res) => (res.headers.get('content-type') || '').startsWith('image/');

export default function Shots() {
    const [there, setThere] = useState(null);

    useEffect(() => {
        let alive = true;
        Promise.all(
            SHOTS.map((s) =>
                fetch(`./shots/${s.file}`, {method: 'HEAD'})
                    .then((res) => res.ok && isImage(res))
                    .catch(() => false),
            ),
        ).then((found) => {
            if (alive) setThere(SHOTS.filter((_, i) => found[i]).map((s) => s.file));
        });
        return () => {
            alive = false;
        };
    }, []);

    // Nothing renders until the answer is in, so the section never appears and
    // then collapses under the reader.
    if (there === null) return null;
    const live = SHOTS.filter((s) => there.includes(s.file));
    if (!live.length) return null;

    return (
        <section className="shots" aria-labelledby="shots-heading">
            <div className="shell">
                <h2 id="shots-heading">The other screens</h2>
                <div className="shot-grid">
                    {live.map((s) => (
                        <figure className="shot" key={s.file}>
                            <div className="shot-window">
                                <img
                                    src={`./shots/${s.file}`}
                                    alt={s.alt}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <figcaption>{s.caption}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
