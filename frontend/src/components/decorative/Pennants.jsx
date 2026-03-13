// A row of triangular pennant flags strung across the navbar.
// Each pennant is a CSS triangle created via the border trick:
// - border-top: coloured (the visible triangle face)
// - border-left and border-right: transparent (the angled sides)
// - zero width/height — the entire shape is made of borders
//
// The pennantWave keyframe (defined in index.css) applies a skew + scale
// oscillation to each flag. Each flag gets a different animation-delay
// and animation-duration to create an organic, wind-blown effect.

// The colour sequence mirrors the prototype exactly.
// Using string hex values here (not var()) because SVG/HTML border-color
// is a computed style — CSS variables work in border-color but the
// DevTools display is cleaner with direct values for debugging.
const PENNANT_COLOURS = [
    '#C0392B', '#E8A020', '#2D6A2D', '#5BA4CF', '#E8607A',
    '#1A7A6E', '#E8A020', '#C0392B', '#2D6A2D', '#5BA4CF',
    '#E8607A', '#E8A020', '#1A7A6E', '#C0392B', '#E8A020',
    '#2D6A2D', '#5BA4CF', '#E8607A',
]

export default function Pennants() {
    return (
        <div style={{ display: 'flex', padding: '0 8px' }}>
        {PENNANT_COLOURS.map((colour, i) => (
            <div
            key={i}
            style={{
                // The CSS border triangle technique:
                // A zero-dimension element whose borders form a triangle.
                width: 0,
                height: 0,
                borderStyle: 'solid',
                // Top border is the visible coloured face of the triangle.
                // The value is the triangle height.
                borderTopWidth: '26px',
                borderTopColor: colour,
                // Left and right borders form the angled sides — transparent.
                // Their width is half the triangle width (12px = 24px total width).
                borderLeftWidth: '12px',
                borderLeftColor: 'transparent',
                borderRightWidth: '12px',
                borderRightColor: 'transparent',
                // Each flag waves at a slightly different rate and offset —
                // creates the organic "light breeze" effect.
                animation: 'pennantWave 1.8s ease-in-out infinite',
                animationDelay: `${i * 0.12}s`,
                animationDuration: `${1.6 + (i % 3) * 0.4}s`,
                flexShrink: 0,
            }}
            />
        ))}
        </div>
    )
}