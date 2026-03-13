import MenuCard from './MenuCard'

export default function MenuGrid({ items, getQty, onAdd, onRemove }) {
    return (
        <div className="grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {items.map((menuItem, index) => (
            <MenuCard
            key={menuItem.id}
            menuItem={menuItem}
            qty={getQty(menuItem.id)}
            onAdd={() => onAdd(menuItem)}
            onRemove={() => onRemove(menuItem.id)}
            delay={Math.min(index * 80, 320)}
            />
        ))}
        </div>
    )
}