import { Link } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { useCart } from '../../context/useCart'
import Pennants from '../decorative/Pennants'

const MARQUEE_ITEMS = [
    'Masarap', 'Lutong Bahay', 'Kamay ang Gamit', 'Sariwang Sangkap',
    'Mula sa Puso', 'Kain Na', 'Sulit at Masustansya', 'Linamnam',
    'Pinoy Pride', 'Luto ng Pag-ibig',
]

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth()
    const { cartCount, openDrawer, clearCart } = useCart()

    const handleLogout = async () => {
        clearCart()
        await logout()
    }

    return (
        <header
        className="sticky top-0 z-[100]"
        style={{ animation: 'slideDown 0.5s ease both' }}
        >

        {/* ── Gold chrome trim ────────────────────────────────────────────── */}
        {/* Multi-stop gradient — inline is correct here */}
        <div
            className="h-[3px]"
            style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--color-gold) 8%, #FFF8DC 20%, var(--color-gold) 32%, #E8A020 50%, var(--color-gold) 68%, #FFF8DC 80%, var(--color-gold) 92%, transparent 100%)',
            }}
        />

        {/* ── Main navbar bar ──────────────────────────────────────────────── */}
        <nav
            className="border-b-4 border-gold"
            style={{ background: 'linear-gradient(180deg, var(--color-red) 0%, #9B2318 100%)' }}
        >

            {/* ── Pennants row ─────────────────────────────────────────────────── */}
            <Pennants />
            
            <div className="flex items-center gap-3.5 px-6 pt-2.5 pb-2 max-w-[1280px] mx-auto">

            {/* ── Logo ───────────────────────────────────────────────────────── */}
            <Link to="/menu" className="flex items-center gap-3 no-underline">
                <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] border-[3px] border-rust"
                style={{
                    background: 'linear-gradient(135deg, var(--color-gold), #F5C842)',
                    boxShadow: '0 4px 14px rgba(232,160,32,0.33)',
                }}
                >
                🍽️
                </div>
                <div>
                <div
                    className="font-pacifico text-[22px] text-cream leading-none"
                    style={{ textShadow: '2px 2px 0 rgba(26,15,0,0.33)' }}
                >
                    Charlene's
                </div>
                <div className="font-nunito text-[10px] text-gold font-extrabold tracking-[0.12em] uppercase mt-0.5">
                    Lutong Bahay · Kitchen
                </div>
                </div>
            </Link>

            <div className="flex-1" />

            {/* ── Nav links + auth + cart ───────────────────────────────────── */}
            <div className="flex items-center gap-2.5">

                <Link
                to="/menu"
                className="font-nunito text-[13px] font-bold text-cream no-underline px-3 py-1.5 rounded-lg transition-colors hover:bg-cream/15"
                >
                Menu
                </Link>

                {isAuthenticated ? (
                <div className="flex items-center gap-2">
                    <span className="font-nunito text-[12px] text-cream/70 font-semibold">
                    Hi, {user.name.split(' ')[0]}
                    </span>
                    <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 bg-cream/15 backdrop-blur-sm border border-gold/33 rounded-[10px] px-3.5 py-2 cursor-pointer font-nunito text-[12px] font-extrabold text-cream transition-colors hover:bg-cream/25"
                    >
                    👤 Logout
                    </button>
                </div>
                ) : (
                <Link
                    to="/login"
                    className="flex items-center gap-1.5 bg-cream/15 backdrop-blur-sm border border-gold/33 rounded-[10px] px-3.5 py-2 no-underline font-nunito text-[12px] font-extrabold text-cream transition-colors hover:bg-cream/25"
                >
                    👤 Sign In
                </Link>
                )}

                {/* ── Cart button ────────────────────────────────────────────── */}
                <button
                onClick={openDrawer}
                className="flex items-center gap-2.5 rounded-[10px] border-2 border-rust px-[18px] py-2.5 cursor-pointer font-pacifico text-[14px] text-dark flex-shrink-0"
                style={{
                    background: 'linear-gradient(135deg, var(--color-gold), #F5C842)',
                    boxShadow: '0 4px 16px rgba(232,160,32,0.33)',
                }}
                >
                🛒
                {cartCount > 0 && (
                    <span
                    className="bg-red text-cream rounded-full w-[22px] h-[22px] flex items-center justify-center font-nunito text-[11px] font-extrabold border-2 border-gold"
                    style={{ animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
                    >
                    {cartCount}
                    </span>
                )}
                <span>Basket</span>
                </button>

            </div>
            </div>
        </nav>

        {/* ── Marquee strip ───────────────────────────────────────────────── */}
        <div
            className="overflow-hidden border-t-[3px] border-b-[3px] border-gold"
            style={{ background: 'linear-gradient(90deg, var(--color-red), #8B1A1A, var(--color-red))' }}
        >
            <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marquee 18s linear infinite' }}
            >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, i) => (
                <span
                key={i}
                className="flex-shrink-0 px-[22px] py-[5px] font-pacifico text-[11px] text-gold flex items-center gap-2.5"
                >
                {text}
                <span className="opacity-60">✦</span>
                </span>
            ))}
            </div>
        </div>

        </header>
    )
}