import { useReveal }       from '../../hooks/useReveal'
import AddToCartButton     from './AddToCartButton'

export default function MenuCard({ menuItem, qty, onAdd, onRemove, delay = 0 }) {
    const cardRef = useReveal(delay)

    return (
        // 'reveal' class: opacity:0 starting state (defined in index.css @layer base)
        // useReveal adds 'show' on scroll → triggers cardReveal keyframe
        // useReveal adds 'done' on animationend → locks opacity:1
        <div
        ref={cardRef}
        className="reveal group relative flex flex-col bg-cream rounded-[20px] overflow-hidden border-[2.5px] border-bamboo/33 cursor-pointer transition-all duration-300"
        style={{
            // Hover lift is defined here because Tailwind's group-hover:
            // cannot apply cubic-bezier transform + box-shadow + border-color
            // all at once cleanly. The alternative is adding them to
            // @layer components in index.css — acceptable in a larger project.
        }}
        >

        {/* Hover styles via @layer — add this once to index.css @layer components */}
        {/* Alternatively, use the group pattern in Tailwind for simpler hover states */}

        {/* ── Rainbow stripe ─────────────────────────────────────────────── */}
        <div
            className="h-[7px]"
            style={{ background: 'linear-gradient(90deg, var(--color-red), var(--color-gold), #2D6A2D, #5BA4CF, var(--color-red))' }}
        />

        {/* ── Image area ─────────────────────────────────────────────────── */}
        <div
            className="h-[155px] relative overflow-hidden flex items-center justify-center"
            style={{ background: 'linear-gradient(148deg, var(--color-sand) 0%, rgba(200,169,110,0.27) 100%)' }}
        >
            {/* Grid texture overlay */}
            <div
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: `
                repeating-linear-gradient(0deg,  transparent, transparent 6px, rgba(200,169,110,0.11) 6px, rgba(200,169,110,0.11) 7px),
                repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(200,169,110,0.11) 6px, rgba(200,169,110,0.11) 7px)
                `,
            }}
            />

            {menuItem.image_url ? (
            <img
                src={menuItem.image_url}
                alt={menuItem.name}
                className="w-full h-full object-cover relative z-[1]"
            />
            ) : (
            <span
                className="text-[60px] relative z-[1] block transition-transform duration-[450ms] group-hover:scale-[1.18] group-hover:-rotate-6 group-hover:-translate-y-1"
                style={{ filter: 'drop-shadow(0 6px 14px rgba(26,15,0,0.27))' }}
            >
                🍽️
            </span>
            )}

            {/* Badges */}
            {menuItem.is_featured && (
            <span className="absolute top-2.5 left-2.5 z-[4] bg-red text-cream border-2 border-gold rounded-[6px] font-nunito text-[9px] font-extrabold tracking-[0.06em] py-[3px] px-2 uppercase">
                ★ Paborito
            </span>
            )}
            <span className="absolute top-2.5 right-2.5 z-[4] bg-dark/80 text-gold rounded-[6px] font-nunito text-[9px] font-bold py-[3px] px-2">
            ⏱ {menuItem.prep_time ?? '15 min'}
            </span>

            {/* Add-to-cart overlay — slides up on hover via group-hover */}
            <div
            className="absolute bottom-0 left-0 right-0 z-[3] px-3 py-2.5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
            style={{
                background: 'linear-gradient(to top, rgba(253,246,232,1) 50%, transparent)',
            }}
            >
            <AddToCartButton
                menuItem={menuItem}
                qty={qty}
                onAdd={onAdd}
                onRemove={onRemove}
            />
            </div>
        </div>

        {/* ── Card body ──────────────────────────────────────────────────── */}
        <div className="p-4 flex-1 flex flex-col gap-1.5">
            <div className="font-playfair text-[17px] font-bold text-dark leading-tight">
            {menuItem.name}
            </div>
            <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px]">⭐</span>
            <span className="font-nunito text-[11px] text-bamboo font-bold">
                {menuItem.rating ?? '4.8'}
            </span>
            </div>
            <div className="font-nunito text-[12px] text-rust leading-[1.6]">
            {menuItem.description}
            </div>
            <div className="font-pacifico text-[20px] text-red mt-auto pt-1.5">
            €{parseFloat(menuItem.price).toFixed(2)}
            </div>
        </div>

        </div>
    )
}