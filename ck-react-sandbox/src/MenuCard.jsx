// src/MenuCard.jsx
// This component is responsible for one thing: displaying a single menu item card.
// It does not know where the data comes from — it only knows how to display it.

export default function MenuCard() {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      maxWidth: '300px'
    }}>
      <h3>Margherita Pizza</h3>
      <p>Classic tomato and mozzarella.</p>
      <strong>€12.50</strong>
    </div>
  )
}