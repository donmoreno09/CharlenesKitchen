import { Link } from 'react-router-dom'

const CONTACT = [
    { icon: '📍', text: 'Barangay Mabini, Manila' },
    { icon: '📞', text: '+63 917 123 4567' },
    { icon: '✉️', text: 'hello@charleneskitchen.ph' },
    { icon: '⏰', text: 'Mon–Sun · 7:00–21:00' },
]

const LINKS = [
    { to: '/menu',     label: 'Browse Menu'    },
    { to: '/login',    label: 'Sign In'        },
    { to: '/register', label: 'Create Account' },
    { to: '/track',    label: 'Track an Order' },
]

export default function Footer() {
    return (
        <footer className="bg-dark text-cream">

        {/* Chrome trim — multi-stop gradient, inline justified */}
        <div
            className="h-[3px]"
            style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--color-gold) 8%, #FFF8DC 20%, var(--color-gold) 32%, #E8A020 50%, var(--color-gold) 68%, #FFF8DC 80%, var(--color-gold) 92%, transparent 100%)',
            }}
        />

        {/* Three-column grid */}
        <div className="max-w-[1280px] mx-auto px-6 pt-10 pb-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">

            {/* Brand column */}
            <div>
            <div className="font-pacifico text-[28px] text-gold mb-2">
                Charlene's Kitchen
            </div>
            <div className="font-nunito text-[10px] text-bamboo font-extrabold tracking-[0.16em] uppercase mb-3.5">
                Lutong Bahay · Since 2025
            </div>
            <p className="font-nunito text-[13px] text-cream/55 leading-[1.7] max-w-[220px]">
                Lutong-bahay na pagkain, gawa sa puso. Daily-sourced ingredients, honest cooking.
            </p>
            </div>

            {/* Contact column */}
            <div>
            <div className="font-playfair text-[16px] font-bold text-cream mb-4">
                Contact
            </div>
            {CONTACT.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 mb-2.5 font-nunito text-[13px] text-cream/65 font-medium">
                <span>{icon}</span>
                <span>{text}</span>
                </div>
            ))}
            </div>

            {/* Quick links column */}
            <div>
            <div className="font-playfair text-[16px] font-bold text-cream mb-4">
                Quick Links
            </div>
            {LINKS.map(({ to, label }) => (
                <div key={label} className="mb-2.5">
                <Link
                    to={to}
                    className="font-nunito text-[13px] font-semibold text-cream/55 no-underline transition-colors hover:text-cream/90"
                >
                    {label}
                </Link>
                </div>
            ))}
            </div>

        </div>

        {/* Copyright bar */}
        <div className="border-t border-bamboo/22 px-6 py-3.5 text-center font-nunito text-[12px] text-cream/35 font-medium">
            © {new Date().getFullYear()} Charlene's Kitchen · Made with ❤️ in Manila
        </div>

        </footer>
    )
}