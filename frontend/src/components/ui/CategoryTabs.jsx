export default function CategoryTabs({ categories, activeCategory, onSelect }) {
    return (
        <div
        className="flex gap-2.5 overflow-x-auto px-6 py-3.5 max-w-[1280px] mx-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
        {categories.map(({ id, label, emoji }) => {
            const isActive = id === activeCategory
            return (
            <button
                key={id}
                onClick={() => onSelect(id)}
                className={`
                flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full
                font-nunito text-[13px] font-bold cursor-pointer whitespace-nowrap
                transition-all duration-200
                ${isActive
                    ? 'border-2 border-gold text-dark -translate-y-px'
                    : 'border-2 border-bamboo/40 text-rust bg-transparent hover:border-gold hover:bg-gold/10 hover:text-dark'
                }
                `}
                style={isActive ? {
                // Gold gradient active state — multi-stop, inline justified
                background: 'linear-gradient(135deg, var(--color-gold), #F5C842)',
                boxShadow: '0 4px 14px rgba(232,160,32,0.33)',
                } : undefined}
            >
                <span>{emoji}</span>
                {label}
            </button>
            )
        })}
        </div>
    )
}