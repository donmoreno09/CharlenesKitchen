// A circular badge with text following the arc of the circle.
// The outer ring spins continuously (spin keyframe from index.css).
// The centre emoji stays static via absolute positioning inside a relative wrapper.
//
// Used in the hero section (bottom-right of the floating dish column).
// The SVG technique used here — textPath on a circular arc — is a classic
// SVG text layout pattern.

export default function SpinBadge() {
    return (
        // Outer wrapper: relative positioning so the centred emoji can be
        // absolutely positioned on top of the spinning SVG.
        <div style={{ position: 'relative', width: 80, height: 80 }}>

        {/* ── Spinning ring ────────────────────────────────────────────────
            The spin keyframe rotates the entire SVG.
            14s is slow enough to be ambient, fast enough to notice. */}
        <svg
            viewBox="0 0 80 80"
            style={{ animation: 'spin 14s linear infinite' }}
        >
            <defs>
            {/* Define an invisible circular path for the text to follow.
                The path starts at the leftmost point of the circle (270° from top)
                and goes clockwise one full revolution.
                'm-31,0' moves to the left edge; 'a31,31 0 1,1 62,0' draws a
                semi-circle; the second arc closes the loop. */}
            <path
                id="spinPath"
                d="M40,40 m-31,0 a31,31 0 1,1 62,0 a31,31 0 1,1 -62,0"
            />
            </defs>

            {/* Red background circle */}
            <circle cx="40" cy="40" r="36" fill="var(--color-red)" />

            {/* Text following the circular path.
                textPath href="#spinPath" references the invisible path above.
                The text is Nunito bold gold — maximises readability on red. */}
            <text
            fill="var(--color-gold)"
            fontFamily="'Nunito', sans-serif"
            fontSize="6.5"
            fontWeight="800"
            letterSpacing="1.2"
            >
            <textPath href="#spinPath">
                Bukas Ngayon · Sariwang Lutuin ·{' '}
            </textPath>
            </text>
        </svg>

        {/* ── Centre emoji ─────────────────────────────────────────────────
            Absolutely centred over the spinning SVG.
            It does NOT rotate because it is outside the <svg> element. */}
        <div
            style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            }}
        >
            🍽️
        </div>

        </div>
    )
    }