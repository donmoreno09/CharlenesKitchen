// src/App.jsx
// This is the root component of the application.
// Everything you build in this sandbox will be imported and rendered here.

export default function App() {
  // These are regular JavaScript variables — not special React syntax
  const restaurantName = "Charlene's Kitchen"
  const tagline = "Fresh food, fast delivery"
  const isOpen = false

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{restaurantName}</h1>
      <p>{tagline}</p>

      {/* Note the double braces on style={{ }}.
          The outer braces mean "I am embedding JavaScript".
          The inner braces are the JavaScript object literal for the style. */}
      <p style={{ color: isOpen ? 'green' : 'red' }}>
        {isOpen ? '🟢 We are open' : '🔴 We are closed'}
      </p>
    </div>
  )
}