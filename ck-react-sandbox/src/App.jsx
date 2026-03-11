// src/App.jsx
// This is the root component of the application.
// Everything you build in this sandbox will be imported and rendered here.

import MenuList from './MenuList.jsx'

export default function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>State Demo — Cart Items</h1>

      <MenuList />
    </div>
  )
}