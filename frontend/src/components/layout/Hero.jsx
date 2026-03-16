import SpinBadge   from '../decorative/SpinBadge'
import HeroJeepney from '../decorative/HeroJeepney'

const HEADLINE_LINES = [
    { text: 'Lutong-bahay,',  delay: '0.30s', size: 'clamp(52px, 6.5vw, 88px)', italic: false, colorClass: 'text-dark'  },
    { text: 'gawa sa puso.',  delay: '0.55s', size: 'clamp(52px, 6.5vw, 88px)', italic: false, colorClass: 'text-dark'  },
    { text: 'Kain Na!',       delay: '0.80s', size: 'clamp(38px, 4.8vw, 66px)', italic: true,  colorClass: 'text-rust'  },
]

const HERO_DISHES = [
    { emoji: '🍳', name: 'Tapsilog',          price: '₱185', dur: '5s',   del: '0s'    },
    { emoji: '🍲', name: 'Adobo sa Gata',     price: '₱220', dur: '7s',   del: '-1.8s' },
    { emoji: '🦐', name: 'Sinigang na Hipon', price: '₱290', dur: '6.2s', del: '-3.2s' },
]

const STATS = [
    { value: '4.9★',   label: 'Rating'        },
    { value: '2,400+', label: 'Reviews'       },
    { value: '30+',    label: 'Dishes'        },
    { value: '20 min', label: 'Avg delivery'  },
]

export default function Hero() {
    const handleBrowse = () => {
        document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        // flex-col justify-end: content sits at the bottom of the 100vh section
        <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">

        {/* ── Animated mesh background ────────────────────────────────────
            Gradient is inline — multi-stop radial gradients with token values.
            animation is inline — references custom keyframe meshDrift. */}
        <div
            className="absolute inset-0 z-0"
            style={{
            background: `
                radial-gradient(ellipse 70% 60% at 65% 35%, rgba(232,160,32,0.13) 0%, transparent 60%),
                radial-gradient(ellipse 55% 65% at 18% 65%, rgba(192,57,43,0.09)  0%, transparent 55%),
                radial-gradient(ellipse 90% 80% at 50% 50%, rgba(200,169,110,0.11) 0%, transparent 70%),
                var(--color-sand)
            `,
            animation: 'meshDrift 18s ease-in-out infinite',
            }}
        />

        {/* ── Bottom vignette fade ─────────────────────────────────────────
            Gradient inline — fades to --color-cream at the bottom. */}
        <div
            className="absolute bottom-0 left-0 right-0 h-[52%] z-[1] pointer-events-none"
            style={{
            background: 'linear-gradient(to top, var(--color-cream) 0%, rgba(253,246,232,0.53) 40%, transparent 100%)',
            }}
        />

        {/* ── Decorative "2025" watermark ──────────────────────────────────
            clamp() font size — inline. animation and color both inline:
            clamp can't be expressed in Tailwind, and text-bamboo/7 is not
            a valid opacity modifier (opacity must be 0–100 integer in Tailwind). */}
        <div
            className="absolute z-[1] font-playfair font-black leading-none pointer-events-none select-none"
            style={{
            fontSize: 'clamp(200px, 24vw, 340px)',
            color: 'rgba(200,169,110,0.07)',
            top: '50%', right: '-2%', transform: 'translateY(-52%)',
            letterSpacing: '-0.04em',
            animation: 'fadeUp 1s ease 0.8s both',
            }}
        >
            2025
        </div>

        {/* ── Jeepney lane ────────────────────────────────────────────────── */}
        <div className="absolute bottom-[72px] left-0 right-0 h-[90px] z-[2] pointer-events-none overflow-hidden">
            {/* Near jeepney */}
            <div
            className="absolute bottom-0"
            style={{ animation: 'jeepDrive 13s linear infinite', willChange: 'transform' }}
            >
            <HeroJeepney />
            </div>
            {/* Far jeepney — smaller + dimmer, offset by half the duration */}
            <div
            className="absolute bottom-[6px] opacity-45"
            style={{ animation: 'jeepDrive 13s linear -6.5s infinite', willChange: 'transform' }}
            >
            <div style={{ transform: 'scale(0.67)', transformOrigin: 'bottom left' }}>
                <HeroJeepney />
            </div>
            </div>
        </div>

        {/* ── Road strip ──────────────────────────────────────────────────── */}
        {/* Pseudo-elements need a <style> tag — React inline style cannot target ::before/::after */}
        <style>{`
            .hero-road::before {
            content: '';
            position: absolute; bottom: 20px; left: 0; right: 0; height: 3px;
            background: repeating-linear-gradient(
                90deg,
                rgba(200,169,110,0.53) 0, rgba(200,169,110,0.53) 48px,
                transparent 48px, transparent 96px
            );
            }
            .hero-road::after {
            content: '';
            position: absolute; bottom: 0; left: 0; right: 0; height: 20px;
            background: rgba(200,169,110,0.33);
            }
        `}</style>
        <div
            className="hero-road absolute bottom-0 left-0 right-0 h-[74px] z-[1] pointer-events-none"
            style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(200,169,110,0.11) 50%, rgba(200,169,110,0.27) 100%)',
            }}
        />

        {/* ── Main content grid ────────────────────────────────────────────── */}
        <div
            className="relative z-[3] px-[52px] pb-[70px] grid gap-10 items-end w-full max-w-[1280px] mx-auto"
            style={{ gridTemplateColumns: '1fr 360px' }}
        >

            {/* LEFT — headline + CTAs + stats */}
            <div>

            {/* Eyebrow */}
            <div
                className="flex items-center gap-2.5 mb-7"
                style={{ animation: 'fadeUp 0.5s ease 0.15s both' }}
            >
                <div className="w-[7px] h-[7px] rounded-full bg-red" style={{ boxShadow: '0 0 0 3px rgba(192,57,43,0.2)' }} />
                <span className="font-nunito text-[10px] text-bamboo tracking-[0.2em] uppercase font-extrabold">
                Bukas Ngayon · Charlene's Kitchen
                </span>
            </div>

            {/* Headline — overflow:hidden on wrapper clips the driftUp animation */}
            <div className="mb-[30px]">
                {HEADLINE_LINES.map(({ text, delay, size, italic, colorClass }) => (
                <div key={text} className="overflow-hidden leading-[1.05] mb-[3px]">
                    <div
                    className={`font-playfair ${colorClass} ${italic ? 'italic font-bold' : 'font-black'}`}
                    style={{
                        fontSize: size,           // clamp() — must be inline
                        letterSpacing: '-0.4px',
                        animation: `driftUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay} both`,
                    }}
                    >
                    {text}
                    </div>
                </div>
                ))}
            </div>

            {/* Tagline */}
            <p
                className="font-nunito text-[15px] text-rust leading-[1.75] max-w-[420px] mb-[34px] font-medium"
                style={{ animation: 'fadeUp 0.6s ease 1.05s both' }}
            >
                Daily-sourced ingredients. Honest cooking. Every plate designed to make you come back.
            </p>

            {/* CTAs */}
            <div
                className="flex gap-3"
                style={{ animation: 'fadeUp 0.5s ease 1.25s both' }}
            >
                <button
                onClick={handleBrowse}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-red text-cream font-nunito font-extrabold text-[13px] tracking-[0.05em] border-none cursor-pointer transition-all"
                style={{ boxShadow: '0 6px 24px rgba(192,57,43,0.27)' }}
                >
                Browse Menu →
                </button>
                <button
                className="inline-flex items-center gap-2.5 px-6 py-[13px] rounded-full bg-transparent text-rust font-nunito font-extrabold text-[13px] tracking-[0.05em] border-2 border-rust/40 cursor-pointer transition-all"
                >
                Our Story
                </button>
            </div>

            {/* Divider */}
            <div
                className="h-px mt-7"
                style={{ background: 'linear-gradient(to right, rgba(200,169,110,0.33), transparent)' }}
            />

            {/* Stats */}
            <div
                className="flex gap-10 mt-[22px] flex-wrap"
                style={{ animation: 'fadeUp 0.5s ease 1.45s both' }}
            >
                {STATS.map(({ value, label }) => (
                <div key={label}>
                    <div className="font-playfair font-bold text-[24px] text-red leading-none">{value}</div>
                    <div className="font-nunito text-[9px] text-bamboo tracking-[0.16em] uppercase mt-1 font-extrabold">{label}</div>
                </div>
                ))}
            </div>

            </div>

            {/* RIGHT — floating dish cards */}
            <div
            className="flex flex-col gap-3.5 items-end pb-1"
            style={{ animation: 'fadeUp 0.6s ease 1.2s both' }}
            >
            {HERO_DISHES.map(({ emoji, name, price, dur, del }) => (
                <div
                key={name}
                className="w-full flex items-center gap-3.5 rounded-[18px] px-[18px] py-[15px] cursor-pointer border border-bamboo/33"
                style={{
                    // CSS custom properties for per-card animation timing
                    '--dur': dur,
                    '--del': del,
                    background: 'rgba(253,246,232,0.94)',
                    boxShadow: '0 8px 32px rgba(200,169,110,0.27)',
                    backdropFilter: 'blur(8px)',
                    animation: 'floatCard var(--dur, 6s) ease-in-out infinite',
                    animationDelay: 'var(--del, 0s)',
                }}
                >
                <span className="text-[34px]" style={{ filter: 'drop-shadow(0 4px 10px rgba(200,169,110,0.4))' }}>
                    {emoji}
                </span>
                <div className="flex-1">
                    <div className="font-playfair font-bold text-[16px] text-dark">{name}</div>
                    <div className="font-nunito text-[11px] text-red font-extrabold mt-0.5">{price}</div>
                </div>
                <div
                    className="w-8 h-8 rounded-full bg-red flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: '0 4px 12px rgba(192,57,43,0.27)' }}
                >
                    <span className="text-cream text-[16px] leading-none">+</span>
                </div>
                </div>
            ))}

            <div
                className="self-end mt-1.5 mr-1.5"
                style={{ animation: 'scaleUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.7s both' }}
            >
                <SpinBadge />
            </div>
            </div>

        </div>

        {/* ── Scroll indicator ─────────────────────────────────────────────── */}
        <div className="absolute bottom-[82px] left-1/2 -translate-x-1/2 z-[4]">
            <div
            className="flex flex-col items-center gap-1.5 font-nunito text-[9px] tracking-[0.18em] uppercase text-bamboo font-bold"
            style={{ animation: 'scrollPulse 2s ease infinite' }}
            >
            <div
                className="w-px h-[34px]"
                style={{ background: 'linear-gradient(to bottom, var(--color-bamboo), transparent)' }}
            />
            Scroll
            </div>
        </div>

        </section>
    )
}