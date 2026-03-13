// An inline SVG coconut palm tree.
// Used in BgScene.jsx — four instances (two left, two right) at low opacity
// create the background tropical atmosphere.
//
// Props:
//   style  : CSS style object forwarded to the <svg> element (for width/height)
//   flip   : boolean — mirrors horizontally via scaleX(-1) for the right-side palms

export default function CoconutPalm({ style = {}, flip = false }) {
    return (
        <svg
        viewBox="0 0 120 320"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            ...style,
            // flip=true mirrors the palm so left-leaning palms become right-leaning
            transform: flip ? 'scaleX(-1)' : undefined,
        }}
        >
        {/* ── Trunk ─────────────────────────────────────────────────────────
            Two overlapping paths create a slight 3D effect:
            - Primary stroke: bamboo colour (warm tan)
            - Secondary stroke: rust at low opacity (shadow side)
            Both paths curve slightly — a straight trunk looks artificial. */}
        <path
            d="M60,310 Q55,250 58,190 Q60,140 62,80"
            stroke="var(--color-bamboo)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
        />
        <path
            d="M60,310 Q65,250 62,190 Q60,140 58,80"
            stroke="var(--color-rust)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
        />

        {/* ── Trunk texture rings ────────────────────────────────────────────
            Horizontal lines at decreasing intervals simulate the ring-scarring
            pattern of a real coconut palm trunk.
            map() over Y positions — the array of numbers is the Y coordinate
            for each ring. */}
        {[300, 280, 260, 240, 220, 200, 180, 160, 140, 120, 100].map((y, i) => (
            <line
            key={i}
            x1={57 - i * 0.3}   // Slightly narrows toward the top
            y1={y}
            x2={63 + i * 0.3}
            y2={y}
            stroke="var(--color-dark)"
            strokeWidth="1.5"
            opacity="0.18"
            />
        ))}

        {/* ── Coconuts ──────────────────────────────────────────────────────
            Two circles at the frond base — slightly offset to suggest a cluster */}
        <circle cx="54" cy="82" r="7"   fill="var(--color-bamboo)" opacity="0.8" />
        <circle cx="66" cy="78" r="6.5" fill="var(--color-rust)"   opacity="0.7" />

        {/* ── Fronds ────────────────────────────────────────────────────────
            Six curved paths radiate from the crown (60,76).
            Even-indexed fronds are slightly thicker (primary fronds).
            Odd-indexed fronds are thinner (secondary fronds between primaries). */}
        {[
            'M60,76 Q-10,40 -30,10',   // Far left
            'M60,76 Q10,20 30,-10',    // Left
            'M60,76 Q80,20 110,0',     // Right
            'M60,76 Q120,50 150,40',   // Far right
            'M60,76 Q30,55 -5,55',     // Lower left
            'M60,76 Q85,55 115,60',    // Lower right
        ].map((d, i) => (
            <path
            key={i}
            d={d}
            stroke="var(--color-green, #2D6A2D)"
            strokeWidth={i % 2 === 0 ? 4 : 3}
            fill="none"
            strokeLinecap="round"
            opacity="0.88"
            />
        ))}

        {/* Frond highlight — lighter green along two of the main fronds */}
        <path d="M60,76 Q-10,40 -30,10"  stroke="var(--color-leafLt, #4A8C3F)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />
        <path d="M60,76 Q110,50 145,40" stroke="var(--color-leafLt, #4A8C3F)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />
        </svg>
    )
}