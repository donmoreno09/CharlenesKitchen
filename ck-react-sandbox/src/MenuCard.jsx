// src/MenuCard.jsx

// Props are destructured directly in the function signature.
// Each prop is now a named variable usable in the JSX below.
export default function MenuCard({ name, price, description, isAvailable }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      maxWidth: '300px',
      // Dim the card visually if the item is unavailable
      opacity: isAvailable ? 1 : 0.5
    }}>
      <h3>{name}</h3>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>{description}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>€{price.toFixed(2)}</strong>

        {/* Conditional rendering — only show the badge when NOT available.
            The && operator means: if the left side is true, render the right side.
            If false, render nothing at all. */}
        {!isAvailable && (
          <span style={{ color: 'red', fontSize: '0.8rem' }}>Sold Out</span>
        )}
      </div>
    </div>
  )
}