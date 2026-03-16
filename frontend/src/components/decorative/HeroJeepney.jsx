// The animated jeepney SVG used in the hero section's road lane.
// In Phase R4, two instances are placed in the lane:
//   - One at full size, full opacity (foreground)
//   - One slightly smaller, 45% opacity (background — depth illusion)
//
// The jeepDrive keyframe (defined in index.css) drives it from right to left.
// The spinWheel keyframe is applied inline to the wheel spokes.
//
// This component has no props — it always renders the same jeepney.
// The animation timing and positioning are controlled by the parent lane element.

export default function HeroJeepney() {
    return (
        <svg
        width="420"
        height="120"
        viewBox="0 0 420 120"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
        >
        {/* ── Drop shadow ───────────────────────────────────────────────────
            An ellipse below the vehicle simulates a ground shadow.
            opacity="0.1" keeps it subtle — just enough to ground the vehicle. */}
        <ellipse cx="210" cy="116" rx="185" ry="7" fill="var(--color-dark)" opacity="0.1" />

        {/* ── Body ──────────────────────────────────────────────────────────
            The main body rectangle. Red is the dominant colour — matching the
            navbar and brand identity. */}
        <rect x="16" y="26" width="388" height="78" rx="11" fill="var(--color-red)" />

        {/* ── Roof chrome ───────────────────────────────────────────────────
            A bamboo-coloured roof bar with a cream highlight strip.
            The highlight (opacity: 0.65) simulates reflected light on chrome. */}
        <rect x="12"  y="20" width="396" height="14" rx="6" fill="var(--color-bamboo)" />
        <rect x="18"  y="22" width="384" height="4"  rx="2" fill="#FFF8DC" opacity="0.65" />

        {/* ── Roof pennant flags ────────────────────────────────────────────
            Triangles pointing downward from the roof edge — a classic jeepney
            decoration. Each flag gets a colour from the palette. */}
        {['var(--color-gold)', 'var(--color-green, #2D6A2D)', 'var(--color-sky, #5BA4CF)',
            'var(--color-pink, #E8607A)', 'var(--color-teal, #1A7A6E)', 'var(--color-gold)',
            'var(--color-green, #2D6A2D)', 'var(--color-sky, #5BA4CF)',
            'var(--color-pink, #E8607A)', 'var(--color-teal, #1A7A6E)',
        ].map((col, i) => (
            <polygon
            key={i}
            points={`${52 + i * 34},20 ${65 + i * 34},35 ${78 + i * 34},20`}
            fill={col}
            opacity="0.92"
            />
        ))}

        {/* ── Windows ───────────────────────────────────────────────────────
            Six evenly-spaced windows along the body, plus one rear window.
            Sky blue at 0.55 opacity suggests tinted glass. */}
        {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={i} x={34 + i * 56} y="34" width="42" height="32" rx="6"
            fill="var(--color-sky, #5BA4CF)" opacity="0.55" />
        ))}
        <rect x="376" y="32" width="22" height="36" rx="5"
            fill="var(--color-sky, #5BA4CF)" opacity="0.48" />

        {/* ── Gold side trim ────────────────────────────────────────────────
            Two thin stripes along the body — gold over cream.
            A signature jeepney decoration. */}
        <rect x="16" y="72" width="388" height="3" rx="1.5" fill="var(--color-gold)" opacity="0.55" />
        <rect x="16" y="76" width="388" height="2" rx="1"   fill="#FFF8DC"            opacity="0.28" />

        {/* ── Front grill ───────────────────────────────────────────────────
            The left end of the jeepney (front). A bamboo-coloured grill panel
            with dark horizontal slats and a cream headlight. */}
        <rect x="12" y="38" width="18" height="44" rx="4" fill="var(--color-bamboo)" opacity="0.85" />
        {[0, 1, 2, 3].map(i => (
            <line key={i}
            x1="13" y1={42 + i * 9}
            x2="28" y2={42 + i * 9}
            stroke="var(--color-dark)" strokeWidth="1.2" opacity="0.25"
            />
        ))}
        <circle cx="19" cy="52" r="7" fill="var(--color-cream)" opacity="0.9" />
        <circle cx="19" cy="52" r="4" fill="#FFF8DC" />

        {/* ── Rear bumper ───────────────────────────────────────────────────
            The right end of the jeepney (rear). Bamboo coloured. */}
        <rect x="402" y="60" width="10" height="28" rx="4" fill="var(--color-bamboo)" opacity="0.8" />

        {/* ── License plate ─────────────────────────────────────────────────
            Cream background, dark text. "CK · 2025" — Charlene's Kitchen, 2025. */}
        <rect x="172" y="88" width="76" height="18" rx="4" fill="var(--color-cream)" />
        <text
            x="210" y="101"
            textAnchor="middle"
            fontFamily="'Nunito', sans-serif"
            fontSize="9.5"
            fontWeight="800"
            fill="var(--color-dark)"
            letterSpacing="1.5"
        >
            CK · 2025
        </text>

        {/* ── Body label ────────────────────────────────────────────────────
            The restaurant name on the side of the jeepney. Playfair italic,
            cream at 70% opacity — visible but not competing with the windows. */}
        <text
            x="210" y="60"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontSize="13"
            fontWeight="700"
            fontStyle="italic"
            fill="#FFF8DC"
            opacity="0.7"
            letterSpacing="2"
        >
            Charlene's Kitchen
        </text>

        {/* ── Decorative side circles ───────────────────────────────────────
            Five small gold dots along the lower body — another classic jeepney
            embellishment. */}
        {[80, 150, 220, 290, 360].map(x => (
            <circle key={x} cx={x} cy="80" r="5" fill="var(--color-gold)" opacity="0.4" />
        ))}

        {/* ── Rear wheel ────────────────────────────────────────────────────
            A group (g) lets us apply a transform to all wheel parts at once.
            The wheel is made of three circles (dark rubber, brown inner, bamboo hub)
            plus eight spokes.
            Each spoke has spinWheel applied inline — the entire spoke group rotates
            around its own centre (transformOrigin: '0 0' in the g's coordinate space). */}
        <g transform="translate(322,104)">
            <circle r="24" fill="var(--color-dark)" />
            <circle r="16" fill="#3A2818" />
            <circle r="10" fill="var(--color-bamboo)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line
                key={angle}
                x1={Math.cos(angle * Math.PI / 180) * 10}
                y1={Math.sin(angle * Math.PI / 180) * 10}
                x2={Math.cos(angle * Math.PI / 180) * 16}
                y2={Math.sin(angle * Math.PI / 180) * 16}
                stroke="var(--color-dark)"
                strokeWidth="2"
                style={{
                transformOrigin: '0 0',
                animation: 'spinWheel 1.2s linear infinite',
                }}
            />
            ))}
            <circle r="4" fill="var(--color-dark)" />
        </g>

        {/* ── Front wheel ───────────────────────────────────────────────────
            Identical to rear wheel, positioned at the front of the jeepney. */}
        <g transform="translate(86,104)">
            <circle r="24" fill="var(--color-dark)" />
            <circle r="16" fill="#3A2818" />
            <circle r="10" fill="var(--color-bamboo)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line
                key={angle}
                x1={Math.cos(angle * Math.PI / 180) * 10}
                y1={Math.sin(angle * Math.PI / 180) * 10}
                x2={Math.cos(angle * Math.PI / 180) * 16}
                y2={Math.sin(angle * Math.PI / 180) * 16}
                stroke="var(--color-dark)"
                strokeWidth="2"
                style={{
                transformOrigin: '0 0',
                animation: 'spinWheel 1.2s linear infinite',
                }}
            />
            ))}
            <circle r="4" fill="var(--color-dark)" />
        </g>

        {/* ── Exhaust puffs ─────────────────────────────────────────────────
            Three ellipses behind the rear bumper (right side of SVG, since
            the jeepney drives left-to-right in the SVG's own coordinate space).
            exhaustPuff is NOT yet in index.css — add it alongside the other
            keyframes. See the note below. */}
        {[0, 1, 2].map(i => (
            <ellipse
            key={i}
            cx={410 + i * 10}
            cy={85 - i * 7}
            rx="6" ry="5"
            fill="var(--color-bamboo)"
            opacity="0.3"
            style={{
                animation: `exhaustPuff ${0.7 + i * 0.22}s ease-out ${i * 0.18}s infinite`,
            }}
            />
        ))}
        </svg>
    )
}