/**
 * The sheet's own parts, drawn.
 *
 * A contact sheet is made of the film frame with its rebate and sprocket
 * perforations, and the frame number printed along the edge. This file owns
 * both.
 *
 * All geometry — rectangles and perforations. Nothing here imitates a
 * photograph; the photographs are the screenshots that sit inside the frames.
 */

/**
 * Edge printing: the tiny condensed type the manufacturer exposes along the
 * film between the perforations. It is the one place on the sheet where text
 * is allowed to be decorative, because on real film that is exactly what it is
 * — and it is also where the frame number lives, which is not decorative at
 * all.
 */
export function EdgeMark({children}) {
    return <span className="edge-mark">{children}</span>;
}

/**
 * Sprocket perforations, as a strip.
 *
 * Rendered as a repeating background rather than as elements: there are a dozen
 * per edge, none of them mean anything individually, and a dozen empty spans
 * per frame is markup nobody should pay for.
 */
export function Perforations({side}) {
    return <span className={`perfs perfs-${side}`} aria-hidden="true" />;
}
