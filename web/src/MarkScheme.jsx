import MarkCard from './MarkCard';
import useReveal from './useReveal';

/**
 * The mark scheme.
 *
 * "Five criteria at stated weights" is the page's least believable sentence and
 * its most important one, because the whole product rests on a number about
 * somebody's career being explainable. A paragraph asserts it; published figures
 * show it. Every value here is the real one from `ats.js` in the application's
 * source — nothing is illustrative, so there is nothing to label as such.
 *
 * The weight bars are monochrome on purpose: a weight is a proportion, the length
 * already carries it, and tinting five criteria in five colours would imply a
 * ranking the colours do not encode. This is where the page's four accents
 * finally arrive, on the bands, because a band is the one thing on the site a
 * colour genuinely means — and they are the application's own band tints, so the
 * page and the product agree. They are given real scale here rather than a
 * 40px strip: this is the page's single chromatic statement and the claim the
 * whole design rests on, so it is said at the size of the claim.
 *
 * The worked example that used to open the page lives here now, beside the rule
 * it demonstrates: the card shows one listing scored, the strip below shows the
 * scheme it was scored against, and the bands show where the number lands. The
 * argument reads in one place instead of being split across the page.
 *
 * Keep in step with `ats.js` and with MarkCard.jsx. If the weights change there,
 * they change in all three.
 */

const CRITERIA = [
    {label: 'Required skills', weight: 40},
    {label: 'Experience', weight: 20},
    {label: 'Seniority', weight: 15},
    {label: 'Role relevance', weight: 15},
    {label: 'Preferred skills', weight: 10},
];

const BANDS = [
    {label: 'Strong', range: '85–100', spoken: '85 to 100', tone: 'strong'},
    {label: 'Good', range: '70–84', spoken: '70 to 84', tone: 'good'},
    {label: 'Partial', range: '50–69', spoken: '50 to 69', tone: 'partial'},
    {label: 'Weak', range: '0–49', spoken: '0 to 49', tone: 'weak'},
];

export default function MarkScheme() {
    const [ref, stage] = useReveal();

    return (
        <section className="scheme" id="scoring" aria-labelledby="scheme-heading">
            <div className="shell">
                <div className="scheme-grid">
                    <div className="scheme-copy">
                        <h2 id="scheme-heading">
                            The arithmetic is published, not asserted
                        </h2>
                        <p>
                            Every listing is scored against your profile on five criteria.
                            These are the weights — they sum to 100 — and the app names
                            which of them counted on the listing you are reading, what each
                            one found, and the skills the posting wants that you have not
                            answered.
                        </p>
                        <p>
                            A criterion the posting says nothing about is dropped rather
                            than failed, and its weight is shared out across the rest —
                            most postings state no experience requirement at all, and
                            scoring that silence as a mismatch would drag every number down
                            by the same amount and stop the score telling you anything. A
                            profile that answers none of the required skills is capped at
                            40 however well it does elsewhere.
                        </p>
                        <p className="scheme-fine">
                            The score is computed on your machine at the moment it is
                            shown, and never stored. A listing the app cannot score gets no
                            badge rather than a guess.
                        </p>
                    </div>

                    <MarkCard />
                </div>

                {/* One bar of a hundred units, cut into five. Each segment's
                    width is its weight, so the claim that they sum to 100 is
                    something you can see rather than something you are told. */}
                <div className="weights" ref={ref} data-stage={stage}>
                    <dl className="weightbar">
                        {CRITERIA.map((c, i) => (
                            <div
                                className="seg"
                                key={c.label}
                                style={{'--w': c.weight, '--step': i}}
                            >
                                <span className="seg-bar" />
                                <dt>{c.label}</dt>
                                <dd>{c.weight}</dd>
                            </div>
                        ))}
                    </dl>
                    <p className="weights-sum">
                        <span>Five criteria, renormalised when a posting is silent</span>
                        <b>100</b>
                    </p>
                </div>

                <ul className="bands">
                    {BANDS.map((b, i) => (
                        <li
                            className={`bandcard bandcard-${b.tone}`}
                            key={b.tone}
                            style={{'--step': i}}
                        >
                            {/* The dash is set for the eye; the spoken form is
                                set for a screen reader, because an en dash
                                between two numerals is read inconsistently and
                                these thresholds are the section's whole point. */}
                            <span className="bandcard-range" aria-hidden="true">
                                {b.range}
                            </span>
                            <b>
                                {b.label}
                                <span className="sr-only">, {b.spoken}</span>
                            </b>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
