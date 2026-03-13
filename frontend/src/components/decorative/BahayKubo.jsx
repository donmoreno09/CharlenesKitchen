// An inline SVG traditional Filipino bahay kubo (nipa hut).
// Used in BgScene at very low opacity — visible only as a subtle silhouette
// in the background. Its role is atmosphere, not detail.
//
// Props:
//   style : CSS style object forwarded to the <svg> element

export default function BahayKubo({ style = {} }) {
    return (
        <svg
        viewBox="0 0 280 200"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        >
        {/* ── Roof ──────────────────────────────────────────────────────────
            Two overlapping triangles:
            - Outer (darker green): the roof silhouette
            - Inner (lighter green, lower opacity): highlights the ridge line
            The array of lines adds rafters — structural detail that reads
            well even at small sizes or low opacity. */}
        <polygon
            points="140,10 20,110 260,110"
            fill="var(--color-green, #2D6A2D)"
            opacity="0.85"
        />
        <polygon
            points="140,10 40,110 240,110"
            fill="var(--color-leafLt, #4A8C3F)"
            opacity="0.45"
        />

        {/* Roof rafters — lines from the peak to the eave */}
        {[0, 1, 2, 3, 4].map(i => (
            <line
            key={i}
            x1="140" y1="10"
            x2={40 + i * 40} y2="110"
            stroke="var(--color-gold)"
            strokeWidth="1"
            opacity="0.28"
            />
        ))}

        {/* ── Walls ─────────────────────────────────────────────────────────
            A rectangle in bamboo colour represents the woven bamboo walls.
            Vertical lines simulate the woven/slatted texture. */}
        <rect x="55" y="110" width="170" height="80" fill="var(--color-bamboo)" opacity="0.7" />

        {/* Wall slats */}
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <line
            key={i}
            x1={55 + i * 25} y1="110"
            x2={55 + i * 25} y2="190"
            stroke="var(--color-dark)"
            strokeWidth="1"
            opacity="0.15"
            />
        ))}

        {/* ── Door ──────────────────────────────────────────────────────────
            Centred rectangle in rust — the same colour used for secondary UI
            text. Divided by a vertical line into two door panels. */}
        <rect x="115" y="140" width="50" height="50" fill="var(--color-rust)" opacity="0.65" rx="3" />
        <line
            x1="140" y1="140" x2="140" y2="190"
            stroke="var(--color-dark)"
            strokeWidth="1.5"
            opacity="0.35"
        />

        {/* ── Windows ───────────────────────────────────────────────────────
            Two small windows flanking the door, in sky blue. */}
        <rect x="65"  y="120" width="35" height="25" fill="var(--color-sky, #5BA4CF)" opacity="0.55" rx="3" />
        <rect x="180" y="120" width="35" height="25" fill="var(--color-sky, #5BA4CF)" opacity="0.55" rx="3" />

        {/* ── Steps ─────────────────────────────────────────────────────────
            Two bamboo-coloured rectangles form the entrance steps. */}
        <rect x="120" y="188" width="40" height="6" fill="var(--color-bamboo)" opacity="0.5" rx="2" />
        <rect x="113" y="194" width="54" height="6" fill="var(--color-bamboo)" opacity="0.4" rx="2" />
        </svg>
    )
}