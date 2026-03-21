// CSS-only spinner using the spin keyframe from index.css.
// The spin keyframe already exists in index.css from Phase R1.
//
// Props:
//   size       : number — diameter in pixels (default: 20)
//   colorClass : string — Tailwind border colour class (default: 'border-gold')

export default function Spinner({ size = 20, colorClass = 'border-gold' }) {
    return (
        <div
        className={`rounded-full border-[3px] ${colorClass} flex-shrink-0`}
        style={{
            width: size,
            height: size,
            // spin is a custom keyframe — must reference it inline
            animation: 'spin 0.7s linear infinite',
            // Only the top border segment is transparent, creating the gap
            // that makes the element look like it is rotating rather than
            // being a static coloured ring.
            borderTopColor: 'transparent',
        }}
        />
    )
}