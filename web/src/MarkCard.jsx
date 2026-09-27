import {useEffect, useRef, useState} from 'react';
import useReveal from './useReveal';

/**
 * The mark card: the product's whole argument, performed once.
 *
 * The page's one authored moment. Five criterion tracks fill to the share of the
 * score each one carried, the number counts up in tabular figures, and the band
 * chip lights at the end. It runs a single time, on first view, and somebody who
 * has asked for reduced motion is handed the finished card outright rather than a
 * shortened version of the sequence.
 *
 * Everything in it is arithmetic rather than a claim. The weights are the real
 * ones from the application's `ats.js` — 40 / 20 / 15 / 15 / 10 — the bands are
 * the real thresholds, and the earned points sum to exactly the number shown, so
 * a visitor who adds them up gets 87. What the card does *not* do is invent a
 * listing: there is no company, no salary and no job count anywhere in it,
 * because none of those may be fabricated. The caption beneath says plainly that
 * the score is an example.
 *
 * Keep in step with the application. If the weights change in `ats.js`, they
 * change here and in MarkScheme.jsx together.
 */

const ROWS = [
    {label: 'Required skills', of: 40, got: 36, found: '9 of 10 matched'},
    {label: 'Experience', of: 20, got: 20, found: '5 yrs, asks 3+'},
    {label: 'Seniority', of: 15, got: 15, found: 'Senior — exact'},
    {label: 'Role relevance', of: 15, got: 11, found: 'Backend, adjacent'},
    {label: 'Preferred skills', of: 10, got: 5, found: '2 of 4 matched'},
];

const SCORE = ROWS.reduce((n, r) => n + r.got, 0);
const WIDEST = Math.max(...ROWS.map((r) => r.of));

export default function MarkCard() {
    const [ref, stage] = useReveal({rootMargin: '0px'});
    const shown = useCountUp(SCORE, stage);

    return (
        <div className="markcard-wrap">
            <div className="markcard" ref={ref} data-stage={stage}>
                <div className="markcard-head">
                    <span className="markcard-title">ATS match</span>
                    <span className="chip chip-strong">
                        <i className="chip-dot" aria-hidden="true" />
                        Strong
                    </span>
                </div>

                <div className="markcard-score">
                    <b>
                        {shown}
                        <span className="markcard-pct">%</span>
                    </b>
                    <span className="markcard-of">
                        85 and up is a strong match. The five criteria below sum to it.
                    </span>
                </div>

                <dl className="markcard-rows">
                    {ROWS.map((r, i) => (
                        <div className="markrow" key={r.label} style={{'--step': i}}>
                            <dt>{r.label}</dt>
                            <dd>
                                <span className="markrow-found">{r.found}</span>
                                <span
                                    className="markrow-track"
                                    style={{'--of': r.of, '--widest': WIDEST}}
                                >
                                    <span
                                        className="markrow-fill"
                                        style={{'--share': r.got / r.of}}
                                    />
                                </span>
                                <span className="markrow-num">
                                    <b>{r.got}</b>
                                    <i>/{r.of}</i>
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="markcard-foot">
                    <span>
                        <kbd>↵</kbd> Open posting
                    </span>
                    <span>
                        <kbd>⌘</kbd>
                        <kbd>K</kbd> Actions
                    </span>
                </div>
            </div>

            <p className="markcard-caption">
                The breakdown jobscout shows on an opened listing. The weights and bands
                are the real ones; the score is an example.
            </p>
        </div>
    );
}

/**
 * Count to a number once, when the element that owns it starts running.
 *
 * A stage of `''` means no animation is going to happen — reduced motion, or no
 * IntersectionObserver — so the final value is returned immediately. That keeps
 * the number from being a figure that only appears if JavaScript and motion both
 * cooperate.
 */
function useCountUp(target, stage, duration = 760) {
    const [value, setValue] = useState(stage === 'armed' ? 0 : target);
    const done = useRef(false);

    useEffect(() => {
        if (stage !== 'running' || done.current) return undefined;
        done.current = true;

        let frame = 0;
        const started = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - started) / duration);
            // The same exponential ease-out the tracks use, so the number and
            // the bars settle together rather than racing each other.
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(target * eased));
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [stage, target, duration]);

    useEffect(() => {
        if (stage === 'armed' && !done.current) setValue(0);
    }, [stage]);

    return value;
}
