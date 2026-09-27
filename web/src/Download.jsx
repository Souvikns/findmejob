import {
    LATEST_URL,
    PLATFORMS,
    formatDate,
    formatSize,
} from './release';
import {IconDownload} from './Icons';

/**
 * The download: the one white thing on a black page.
 *
 * The label is decided by the user agent and the href by the API, and those are
 * independent on purpose. Detection needs no network, so the button names the
 * visitor's own platform on the first paint; the API only ever upgrades the link
 * from the `/releases/latest` redirect to the exact asset. GitHub rate-limits
 * unauthenticated calls to sixty an hour per address, and when that bites, the
 * button is still correct — it just goes one hop further round.
 *
 * `detail` is what the landing page turns off. There the button stands alone: no
 * filename, no version, no loading line and nothing to say when the API refuses,
 * because a visitor who came to download something should not be reading status
 * text. The install page turns it on, where the filename and size are the point.
 *
 * The pill is the design system's single primary: white ground, black text,
 * 8px radius. Nothing else on the page is allowed to be white and filled, which
 * is the whole reason it reads as the action from across the room.
 */
export function downloadTarget({picked, chosen, mobile}) {
    const platform = PLATFORMS.find((p) => p.id === chosen);
    return {
        href: picked ? picked.asset.url : LATEST_URL,
        label: mobile
            ? 'See the downloads'
            : platform
              ? `Download for ${platform.name}`
              : 'Download jobscout',
        short: mobile ? 'Downloads' : platform ? platform.name : 'Download',
        quiet: mobile,
    };
}

export function DownloadButton({
    release,
    failed,
    picked,
    chosen,
    mobile,
    detail = true,
}) {
    const platform = PLATFORMS.find((p) => p.id === chosen);
    const {href, label, quiet} = downloadTarget({picked, chosen, mobile});

    let note = null;
    if (detail) {
        if (mobile) {
            note = (
                <>
                    jobscout is a desktop application — open this page on your computer
                    to install it.
                    {release ? (
                        <>
                            {' '}
                            Latest is <b>{release.tag}</b>.
                        </>
                    ) : null}
                </>
            );
        } else if (failed) {
            note = (
                <>
                    GitHub's release API did not answer, so this page cannot name the
                    file. The button still works — it goes to the latest release.
                </>
            );
        } else if (!release) {
            note = <>Finding the latest version…</>;
        } else if (picked) {
            const bytes = formatSize(picked.asset.size);
            const date = formatDate(release.published);
            // The filename gets its own line: it is the one string somebody may
            // want to check against what landed in their downloads folder, and
            // buried mid-chain it is unreadable.
            note = (
                <>
                    <b className="pill-file">{picked.asset.name}</b>
                    {release.tag}
                    <span className="dot" aria-hidden="true" />
                    {picked.ext}
                    {bytes ? (
                        <>
                            <span className="dot" aria-hidden="true" />
                            {bytes}
                        </>
                    ) : null}
                    <span className="dot" aria-hidden="true" />
                    <span className="nowrap">{picked.note}</span>
                    {date ? (
                        <>
                            <span className="dot" aria-hidden="true" />
                            {/* A date that breaks across a line reads as two facts. */}
                            <span className="nowrap">released {date}</span>
                        </>
                    ) : null}
                </>
            );
        } else if (!chosen) {
            note = (
                <>
                    Your platform was not recognised, so this is the releases page. Pick
                    a build below.
                </>
            );
        } else {
            note = (
                <>
                    <b>{release.tag}</b> ships no {platform ? platform.name : 'matching'}{' '}
                    build. The releases page lists everything it does have.
                </>
            );
        }
    }

    return (
        <>
            <a className={`pill${quiet ? ' pill-quiet' : ''}`} href={href}>
                <IconDownload size={18} />
                {label}
            </a>
            {note && (
                <p className="pill-note" key={label}>
                    {note}
                </p>
            )}
        </>
    );
}

/**
 * The platform strip.
 *
 * Detection is only a default: all three platforms stay reachable whether or not
 * the guess landed, and an unrecognised agent gets three unfilled tabs rather
 * than a dead end. The chosen one is filled to `--surface-elevated` with a
 * stronger hairline — state is a change of surface, never a colour, because
 * colour on this page means a score band.
 *
 * It calls itself a radio group, so it has to behave like one. The group holds a
 * single tab stop and the arrow keys move between platforms, selecting as they
 * go; Home and End jump to the ends. Announcing `role="radio"` while leaving
 * three separate tab stops and no arrow handling tells a screen-reader user to
 * expect one thing and then does another, which is worse than the plain buttons
 * it would otherwise be.
 */
export function PlatformStrip({release, chosen, detected, onChoose}) {
    // With nothing chosen the first tab holds the stop, so the group is always
    // reachable — a roving index that roves off the end of an empty selection
    // is a group nobody can tab into at all.
    const at = Math.max(0, PLATFORMS.findIndex((p) => p.id === chosen));

    function onKeyDown(e) {
        const step = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}[e.key];
        let next = null;
        if (step) next = (at + step + PLATFORMS.length) % PLATFORMS.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = PLATFORMS.length - 1;
        if (next === null) return;

        e.preventDefault();
        onChoose(PLATFORMS[next].id);
        e.currentTarget.parentElement?.children[next]?.focus();
    }

    return (
        <div className="strip" role="radiogroup" aria-label="Your platform">
            {PLATFORMS.map((p, i) => {
                const asset = release?.downloads.find((d) => d.id === p.id)?.asset;
                const bytes = formatSize(asset?.size);
                const on = chosen === p.id;
                return (
                    <button
                        key={p.id}
                        type="button"
                        className={`tab${on ? ' is-on' : ''}`}
                        role="radio"
                        aria-checked={on}
                        tabIndex={i === at ? 0 : -1}
                        onClick={() => onChoose(p.id)}
                        onKeyDown={onKeyDown}
                    >
                        <b>{p.name}</b>
                        <span>
                            {p.ext}
                            {bytes ? ` · ${bytes}` : ''}
                        </span>
                        {detected === p.id && (
                            <span className="sr-only"> — detected</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
