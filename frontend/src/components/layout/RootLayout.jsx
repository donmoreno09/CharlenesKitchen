import { Outlet } from 'react-router-dom'
import Navbar     from './Navbar'
import Footer     from './Footer'
import BgScene    from '../decorative/BgScene'
import CartDrawer from '../ui/CartDrawer'

export default function RootLayout() {
  return (
    // relative is required on the root to establish a stacking context
    // so that z-index values on children work as expected.
    <div className="relative min-h-screen flex flex-col">

      {/* z-0: Fixed decorative background */}
      <BgScene />

      {/* z-[100]: Sticky navbar */}
      <Navbar />

      {/* z-auto → effectively z-1 within this stacking context */}
      <main className="relative flex-1 z-[1]">
        <Outlet />
      </main>

      <Footer />

      {/* z-[699]/z-[700]: Drawer always in DOM for exit animation */}
      <CartDrawer />

    </div>
  )
}