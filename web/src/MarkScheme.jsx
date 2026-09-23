import useReveal from './useReveal';

/**
 * The mark scheme, drawn.
 *
 * "Five criteria at stated weights" is the page's least believable sentence and
 * its most important one, because the whole product rests on a number about
 * somebody's career being explainable. A paragraph asserts it; a chart shows
 * it. Every figure here is the real one from `frontend/src/ats.js` in the
 * application's source — nothing is illustrative, so there is nothing to label
 * as illustrative.
 *
 * The bars are monochrome on purpose. A weight is a proportion and the length
 * already carries it; tinting five criteria in five colours would imply a
 * ranking the colours do not encode. Colour appears one block down, on the
 * bands, where it does mean something — and those are the application's own
 * band tints, so the page and the product agree.
 *
 * Keep in step with ats.js. If the weights change there, they change here.
 */

const CRITERIA = [
    {label: 'Required skills', weight: 40},
    {label: 'Experience', weight: 20},
    {label: 'Seniority', weight: 15},
    {label: 'Role relevance', weight: 15},
    {label: 'Preferred skills', weight: 10},
];

const BANDS = [
    {label: 'Strong', from: '85 and up', tone: 'strong'},
    {label: 'Good', from: '70–84', tone: 'good'},
    {label: 'Partial', from: '50–69', tone: 'partial'},
    {label: 'Weak', from: 'under 50', tone: 'weak'},
];

export default function MarkScheme() {
    const [ref, stage] = useReveal();

    return (
        <section className="scheme" aria-labelledby="scheme-heading">
            <h2 id="scheme-heading">The mark scheme</h2>
            <div className="scheme-body" ref={ref} data-stage={stage}>
                <div className="scheme-side">
                    <p>
                        Every listing is scored against your profile on five criteria.
                        These are the weights — they sum to 100 — and the app shows
                        you which of them counted on the listing you are reading.
                    </p>
                    <p>
                        A criterion the posting says nothing about is dropped rather
                        than failed, and its weight is shared out across the rest —
                        roughly nine postings in ten state no experience requirement, so
                        scoring that silence as a mismatch would drag every number down
                        by the same amount and stop the score telling you anything.
                    </p>


                    <div className="bands">
                        <p className="bands-label">And the bands it lands in</p>
                        <ul>
                            {BANDS.map((b, i) => (
                                <li
                                    key={b.tone}
                                    className={`band band-${b.tone}`}
                                    style={{'--step': i}}
                                >
                                    <b>{b.label}</b>
                                    <span>{b.from}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <dl className="weights">
                    {CRITERIA.map((c, i) => (
                        <div
                            key={c.label}
                            className="weight"
                            /* The stagger is a real sequence, not a per-item
                               delay applied to the page: five steps, capped
                               well under half a second end to end. */
                            style={{'--step': i}}
                        >
                            <dt>{c.label}</dt>
                            <dd>
                                <span className="weight-track">
                                    <span
                                        className="weight-fill"
                                        style={{'--weight': c.weight}}
                                    />
                                </span>
                                <b>{c.weight}</b>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
