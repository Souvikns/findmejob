import {useState} from 'react';
import {EdgeMark, Perforations} from './sheet';

/**
 * One frame on the sheet.
 *
 * The frame is the light on a dark sheet — on a real contact print the film's
 * rebate passes light and prints black, while the frames themselves carry the
 * positive image. That is why a screenshot of a light desktop application is
 * the correct content for this world rather than a fight with it.
 *
 * A frame whose image has not been captured yet removes itself entirely. The
 * shots are taken by hand from the running app (`scripts/capture-screenshots.sh`
 * and `docs/SCREENSHOTS.md` in the private source repository), so a frame this
 * page knows about can be one nobody has shot. Dropping the file into
 * `public/shots/` is the whole fix; nothing here needs editing.
 */
export default function Frame({
    file,
    alt,
    caption,
    no,
    stock = 'jobscout 400',
    priority = false,
}) {
    const [missing, setMissing] = useState(false);
    if (missing) return null;

    return (
        <figure className="frame">
            <div className="frame-film">
                <Perforations side="top" />
                <div className="frame-window">
                    <img
                        src={`./shots/${file}`}
                        alt={alt}
                        loading={priority ? undefined : 'lazy'}
                        fetchPriority={priority ? 'high' : undefined}
                        decoding="async"
                        onError={() => setMissing(true)}
                    />
                </div>
                <Perforations side="bottom" />
                <EdgeMark>
                    {stock} <b>{no}</b>
                </EdgeMark>
            </div>
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}
