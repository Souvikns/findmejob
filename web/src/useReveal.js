import {useEffect, useRef, useState} from 'react';

/**
 * Run an entrance once, the first time an element is scrolled into view.
 *
 * Two rules shape this. The page must read correctly with no JavaScript at all,
 * so the final state is what the CSS declares and the *from* state is only ever
 * added here, in a layout effect, before the browser paints. And somebody who
 * has asked for reduced motion never gets armed at all — they get the finished
 * state immediately, which is the point of the setting, rather than a movement
 * that has merely been shortened.
 *
 * Returns a ref to attach and the stage: `''` (no animation will happen),
 * `'armed'` (held at the from state) or `'running'`.
 */
export default function useReveal({rootMargin = '0px 0px -12% 0px'} = {}) {
    const ref = useRef(null);
    const [stage, setStage] = useState('');

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        const still = window.matchMedia?.('(prefers-reduced-motion: reduce)');
        if (still?.matches || typeof IntersectionObserver === 'undefined') return undefined;

        // Arming happens in the same frame the element mounts, so the from
        // state is never painted as a flash of the finished one.
        setStage('armed');

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                setStage('running');
                observer.disconnect();
            },
            {rootMargin, threshold: 0.2},
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [rootMargin]);

    return [ref, stage];
}
