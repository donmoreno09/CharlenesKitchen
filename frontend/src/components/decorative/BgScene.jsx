// Fixed background layer: four coconut palms + two bahay kubos.
// Sits at z-index:0, pointer-events:none — purely decorative,
// never blocks user interaction.
//
// This component is placed once in RootLayout (Phase R3) and persists
// across all page navigation without remounting or re-animating.
//
// Opacity values are intentionally very low (0.06–0.20) — the scene
// should feel ambient, not dominant. The content always reads clearly
// against it.

import CoconutPalm from './CoconutPalm'
import BahayKubo   from './BahayKubo'

export default function BgScene() {
    return (
        <div
        style={{
            position: 'fixed',
            inset: 0,               // Covers the full viewport
            pointerEvents: 'none',  // Never intercepts clicks
            zIndex: 0,              // Behind all page content
            overflow: 'hidden',     // Prevents palms from causing horizontal scroll
        }}
        >
        {/* ── Warm sky gradient ─────────────────────────────────────────────
            A vertical gradient simulating a Filipino late-afternoon sky:
            gold at the horizon rising to deep purple overhead.
            opacity: 0.22 keeps it very subtle. */}
        <div
            style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #F9D06A 0%, #F5A623 18%, #E8764A 38%, #C2503A 55%, #8B2252 72%, #3D1A4A 100%)',
            opacity: 0.22,
            }}
        />

        {/* ── Ground glow ───────────────────────────────────────────────────
            A subtle green gradient at the bottom — suggests grass/ground. */}
        <div
            style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 100,
            background: 'linear-gradient(to top, rgba(45,106,45,0.10), transparent)',
            }}
        />

        {/* ── Left palms ────────────────────────────────────────────────────
            Two palms at the left edge, staggered in size and opacity.
            The sway/swayR animations are defined in index.css.
            animation is applied inline since these are div wrappers, not SVGs. */}
        <div
            style={{
            position: 'absolute', bottom: 0, left: -18,
            opacity: 0.20,
            animation: 'sway 6s ease-in-out infinite',
            }}
        >
            <CoconutPalm style={{ width: 130, height: 'auto' }} />
        </div>
        <div
            style={{
            position: 'absolute', bottom: 0, left: 70,
            opacity: 0.12,
            animation: 'swayR 8.5s ease-in-out infinite',
            }}
        >
            <CoconutPalm style={{ width: 90, height: 'auto' }} />
        </div>

        {/* ── Right palms (flipped) ─────────────────────────────────────────
            flip prop mirrors the palm SVG via scaleX(-1) — right-leaning palms
            frame the right side of the screen. */}
        <div
            style={{
            position: 'absolute', bottom: 0, right: -18,
            opacity: 0.20,
            animation: 'swayR 7s ease-in-out infinite',
            }}
        >
            <CoconutPalm style={{ width: 130, height: 'auto' }} flip />
        </div>
        <div
            style={{
            position: 'absolute', bottom: 0, right: 75,
            opacity: 0.12,
            animation: 'sway 9s ease-in-out infinite',
            }}
        >
            <CoconutPalm style={{ width: 90, height: 'auto' }} flip />
        </div>

        {/* ── Bahay kubos ───────────────────────────────────────────────────
            Two silhouettes at very low opacity — almost subliminal.
            Positioned toward the lower third of the screen, partly behind
            the palms for a layered depth effect. */}
        <div style={{ position: 'absolute', bottom: 0, right: '16%', opacity: 0.08 }}>
            <BahayKubo style={{ width: 280, height: 'auto' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: '11%', opacity: 0.06 }}>
            <BahayKubo style={{ width: 190, height: 'auto' }} />
        </div>

        </div>
    )
}