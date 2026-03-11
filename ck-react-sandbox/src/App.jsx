// src/App.jsx
// This is the root component of the application.
// Everything you build in this sandbox will be imported and rendered here.

// We import MenuCard and use it like an HTML tag.
// React sees <MenuCard /> and calls our MenuCard function.

import MenuCard from './MenuCard.jsx'

export default function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Our Menu</h1>

      {/* Each <MenuCard /> is a separate call to the MenuCard function.
          Right now they all show the same hardcoded data — props will fix this. */}
      <MenuCard />
      <MenuCard />
      <MenuCard />
    </div>
  )
}