/**
 * Everything the page needs to know about where a visitor is and which file
 * they should get.
 *
 * The asset list comes from the live GitHub release rather than being hardcoded,
 * so a new release updates this page without a rebuild. The names it matches on
 * are set by the release workflow in .github/workflows/release.yml — keep the
 * two in step.
 *
 * There is now a third consumer: the app's own updater, in the private source
 * repo at internal/updater/github.go, matches the same suffixes to decide what
 * to download for a platform. Renaming a release asset breaks this page and
 * silently stops every installed copy from updating, so all three move
 * together.
 */

export const REPO = 'Souvikns/findmejob';
export const RELEASES_URL = `https://github.com/${REPO}/releases`;
export const LATEST_URL = `${RELEASES_URL}/latest`;

/** The three platforms a release ships, in the order the page lists them. */
export const PLATFORMS = [
    {
        id: 'macos',
        name: 'macOS',
        note: 'Intel and Apple Silicon',
        // One universal build covers both architectures.
        match: (n) => n.endsWith('.dmg'),
        ext: 'DMG',
    },
    {
        id: 'windows',
        name: 'Windows',
        note: '64-bit',
        match: (n) => n.endsWith('_setup.exe'),
        ext: 'Installer',
    },
    {
        id: 'linux',
        name: 'Linux',
        note: 'x86_64, any distro',
        match: (n) => n.endsWith('.AppImage'),
        ext: 'AppImage',
    },
];

/**
 * Guess the visitor's platform so the page can lead with one download instead
 * of a menu. A guess is all this is: every platform stays reachable below, and
 * an unrecognised agent simply gets the full list.
 */
export function detectPlatform() {
    if (typeof navigator === 'undefined') return null;

    // userAgentData is the non-deprecated source where it exists.
    const hinted = navigator.userAgentData?.platform;
    const ua = `${hinted || ''} ${navigator.platform || ''} ${navigator.userAgent || ''}`;

    // Android carries "Linux" in its UA and iOS carries "Mac" in some modes, so
    // both are ruled out before anything else is considered.
    if (/android/i.test(ua)) return null;
    if (/iphone|ipad|ipod/i.test(ua)) return null;

    if (/win/i.test(ua)) return 'windows';
    if (/mac|darwin/i.test(ua)) return 'macos';
    if (/linux|x11|cros/i.test(ua)) return 'linux';
    return null;
}

/** True when the visitor is on a phone or tablet, where no download applies. */
export function isMobile() {
    if (typeof navigator === 'undefined') return false;
    return /android|iphone|ipad|ipod/i.test(navigator.userAgent || '');
}

/**
 * Fetch the newest release. Unauthenticated GitHub API calls are rate limited
 * to 60 per hour per address, so every failure path has to degrade to something
 * that still works: the caller falls back to the /releases/latest redirect,
 * which needs no API and never goes stale.
 */
export async function fetchLatestRelease() {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
        headers: {Accept: 'application/vnd.github+json'},
    });
    if (!res.ok) throw new Error(`GitHub returned ${res.status}`);
    const data = await res.json();

    const assets = (data.assets || []).map((a) => ({
        name: a.name,
        url: a.browser_download_url,
        size: a.size,
    }));

    return {
        tag: data.tag_name,
        published: data.published_at,
        url: data.html_url,
        downloads: PLATFORMS.map((p) => ({
            ...p,
            asset: assets.find((a) => p.match(a.name)) || null,
        })),
    };
}

export function formatSize(bytes) {
    if (!bytes) return null;
    return `${Math.round(bytes / 1048576)} MB`;
}

export function formatDate(iso) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
