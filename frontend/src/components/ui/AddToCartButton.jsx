import { useState } from 'react'

export default function AddToCartButton({ menuItem, qty, onAdd, onRemove }) {
    const [added, setAdded] = useState(false)

    const handleAdd = () => {
        onAdd()
        setAdded(true)
        setTimeout(() => setAdded(false), 400)
    }

    if (qty > 0) {
        return (
        <div className="flex items-center gap-[7px] justify-center">
            <button
            onClick={onRemove}
            className="w-7 h-7 rounded-full border-2 border-bamboo/33 bg-cream flex items-center justify-center font-nunito font-extrabold text-dark text-[14px] cursor-pointer transition-all hover:bg-gold hover:border-gold"
            >−</button>

            <span className="font-pacifico text-[15px] text-red w-[22px] text-center">
            {qty}
            </span>

            <button
            onClick={handleAdd}
            className="w-7 h-7 rounded-full border-2 border-gold bg-gold flex items-center justify-center font-nunito font-extrabold text-dark text-[14px] cursor-pointer"
            style={added ? { animation: 'checkBounce 0.4s cubic-bezier(0.34,1.56,0.64,1) both' } : undefined}
            >+</button>
        </div>
        )
    }

    return (
        <button
        onClick={handleAdd}
        className="w-full py-[9px] rounded-xl font-nunito font-extrabold text-[12px] text-cream tracking-[0.04em] uppercase cursor-pointer flex items-center justify-center gap-1.5 transition-colors border-2"
        style={{
            background: added
            ? 'linear-gradient(135deg, #1A7A6E, #145A52)'
            : 'linear-gradient(135deg, var(--color-red), #9B2318)',
            borderColor: added ? 'rgba(26,122,110,0.4)' : 'rgba(232,160,32,0.4)',
            boxShadow: '0 3px 10px rgba(192,57,43,0.33)',
            ...(added ? { animation: 'checkBounce 0.4s cubic-bezier(0.34,1.56,0.64,1) both' } : {}),
        }}
        >
        {added ? '✓ Naidagdag!' : '+ Idagdag'}
        </button>
    )
}