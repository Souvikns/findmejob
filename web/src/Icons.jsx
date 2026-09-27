/**
 * The icon set, drawn.
 *
 * One family, one grid, one weight: a 24×24 box, 1.5px strokes, round caps and
 * joins, and no fills except where a shape is genuinely solid. They inherit
 * `currentColor` so a tile's accent reaches its icon without a second token.
 *
 * Nothing here is a Unicode glyph standing in for an icon, and nothing is
 * borrowed at a different weight from the rest — a set assembled from three
 * sources reads as three sources.
 */

function Glyph({children, size = 20, className}) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {children}
        </svg>
    );
}

export function IconGithub(props) {
    return (
        <Glyph {...props}>
            <path
                d="M9 19.3c-4 1.2-4-2.1-5.6-2.5m11.2 5v-3.4c0-1 .1-1.4-.5-2 2.3-.3 4.4-1.1 4.4-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.7s-1.1-.3-3.5 1.3a8.9 8.9 0 0 0-4.6 0C6.8 5.7 5.7 6 5.7 6a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 4.5 11.5c0 3.8 2.1 4.6 4.4 5-.6.6-.6 1.2-.5 2v3.4"
                stroke="currentColor"
            />
        </Glyph>
    );
}

export function IconDownload(props) {
    return (
        <Glyph {...props}>
            <path d="M12 3.5v11" />
            <path d="M7.5 10.5 12 15l4.5-4.5" />
            <path d="M4 17.5v1.5a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-1.5" />
        </Glyph>
    );
}

export function IconPlay(props) {
    return (
        <Glyph {...props}>
            <path d="M8.5 5.6a.7.7 0 0 1 1-.6l8.2 6a.7.7 0 0 1 0 1.2l-8.2 6a.7.7 0 0 1-1-.6Z" fill="currentColor" stroke="none" />
        </Glyph>
    );
}

export function IconCopy(props) {
    return (
        <Glyph {...props}>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M15 6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15" />
        </Glyph>
    );
}

export function IconCheck(props) {
    return (
        <Glyph {...props}>
            <path d="M5 12.8 9.4 17 19 6.5" />
        </Glyph>
    );
}

export function IconSearch(props) {
    return (
        <Glyph {...props}>
            <circle cx="10.8" cy="10.8" r="6.3" />
            <path d="m15.6 15.6 3.9 3.9" />
        </Glyph>
    );
}

export function IconSliders(props) {
    return (
        <Glyph {...props}>
            <path d="M4 7.5h4m4 0h8" />
            <path d="M4 16.5h10m4 0h2" />
            <circle cx="10" cy="7.5" r="2" />
            <circle cx="16" cy="16.5" r="2" />
        </Glyph>
    );
}

export function IconGauge(props) {
    return (
        <Glyph {...props}>
            <path d="M4 17a8 8 0 1 1 16 0" />
            <path d="m15.5 10.5-3 4" />
            <circle cx="12" cy="15.6" r="1.4" fill="currentColor" stroke="none" />
        </Glyph>
    );
}

export function IconMessage(props) {
    return (
        <Glyph {...props}>
            <path d="M4.5 7A2.5 2.5 0 0 1 7 4.5h10A2.5 2.5 0 0 1 19.5 7v6A2.5 2.5 0 0 1 17 15.5H10l-4 4v-4H7A2.5 2.5 0 0 1 4.5 13Z" />
        </Glyph>
    );
}

export function IconKeyboard(props) {
    return (
        <Glyph {...props}>
            <rect x="3" y="6.5" width="18" height="11" rx="2" />
            <path d="M7 10h.01M10.5 10h.01M14 10h.01M17 10h.01M8 13.8h8" />
        </Glyph>
    );
}

export function IconShield(props) {
    return (
        <Glyph {...props}>
            <path d="M12 3.6 19 6v5.2c0 4.1-2.8 7.2-7 8.6-4.2-1.4-7-4.5-7-8.6V6Z" />
            <path d="M9.2 12.2 11.4 14.4l3.8-4.4" />
        </Glyph>
    );
}

export function IconRefresh(props) {
    return (
        <Glyph {...props}>
            <path d="M19.5 11.2a7.5 7.5 0 0 0-13-4.3L4.5 9" />
            <path d="M4.5 12.8a7.5 7.5 0 0 0 13 4.3l2-2.1" />
            <path d="M4.5 4.5V9H9M19.5 19.5V15H15" />
        </Glyph>
    );
}

export function IconArrow(props) {
    return (
        <Glyph {...props}>
            <path d="M5 12h13" />
            <path d="m13 7 5 5-5 5" />
        </Glyph>
    );
}
