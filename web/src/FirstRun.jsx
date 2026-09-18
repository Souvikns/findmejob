import {useState} from 'react';

/**
 * The unsigned-app warning, answered before it happens.
 *
 * jobscout is not signed with an Apple Developer certificate or a Windows
 * code-signing certificate, so both systems interrupt the first launch — macOS
 * with "jobscout is damaged and can't be opened", which reads like a corrupt
 * download rather than a missing signature. A visitor who meets that with no
 * warning concludes the app is broken and leaves, so the answer sits directly
 * under the download button rather than in documentation they would have to
 * go looking for.
 */
const QUARANTINE = 'xattr -dr com.apple.quarantine /Applications/jobscout.app';

const NOTES = {
    macos: {
        heading: 'macOS will say the app is damaged. It is not.',
        body: (
            <>
                jobscout is not signed with an Apple Developer certificate, and that is
                the message macOS shows for any unsigned app that arrived over the
                internet. Drag it to Applications, then run this once:
            </>
        ),
        command: QUARANTINE,
        after: 'You only need it once per install.',
    },
    windows: {
        heading: 'Windows will show a SmartScreen warning.',
        body: (
            <>
                The installer is not code-signed, so Windows shows{' '}
                <strong>“Windows protected your PC”</strong> the first time you run it.
                Click <strong>More info</strong>, then <strong>Run anyway</strong>.
            </>
        ),
        after:
            'Windows 10 and 11 already include the WebView2 runtime jobscout renders with.',
    },
    linux: {
        heading: 'Make it executable, then run it.',
        body: (
            <>
                Nothing to install and no packages to add first — the AppImage carries
                its own GTK and WebKit, so the same file works on Debian, Ubuntu,
                Fedora and Arch.
            </>
        ),
        command: 'chmod +x jobscout-*.AppImage && ./jobscout-*.AppImage',
        after: null,
    },
};

export default function FirstRun({platform}) {
    const note = NOTES[platform];
    const [copied, setCopied] = useState(false);

    if (!note) return null;

    async function copy() {
        try {
            await navigator.clipboard.writeText(note.command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard access is denied in some contexts; the command is
            // selectable text either way, so there is nothing to recover from.
        }
    }

    return (
        <aside className="firstrun">
            <h2>{note.heading}</h2>
            <p>{note.body}</p>
            {note.command && (
                <div className="command">
                    <code>{note.command}</code>
                    <button type="button" onClick={copy}>
                        {copied ? 'Copied' : 'Copy'}
                        <span className="sr-only"> the command to your clipboard</span>
                    </button>
                </div>
            )}
            {note.after && <p className="after">{note.after}</p>}
        </aside>
    );
}
