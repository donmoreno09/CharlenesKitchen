// Slide-in cart panel — pure CartContext consumer, zero cart state of its own.
//
// Always in the DOM: visibility controlled by CSS transform/opacity so
// the slide-out animation plays correctly before the element disappears.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/useCart'

const DRAWER_MARQUEE = [
  'Masarap', 'Lutong Bahay', 'Sariwang Sangkap',
  'Mula sa Puso', 'Kain Na', 'Sulit',
]

export default function CartDrawer() {
  const {
    cartItems, cartCount, cartTotal,
    addToCart, updateQuantity, removeFromCart,
    isDrawerOpen, closeDrawer,
  } = useCart()

  const navigate = useNavigate()
  const [promo, setPromo]             = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  // Derived totals
  const delivery   = cartTotal > 50 ? 0 : 5
  const discount   = promoApplied ? Math.round(cartTotal * 0.1) : 0
  const orderTotal = cartTotal + delivery - discount

  const handlePromo    = () => { if (promo.toUpperCase() === 'KAIN10') setPromoApplied(true) }
  const handleCheckout = () => { closeDrawer(); navigate('/checkout') }

  return (
    <>
      {/* ── Backdrop ──────────────────────────────────────────────────────
          Tailwind handles opacity, pointer-events, and backdrop-blur.
          The transition duration is set via inline style because Tailwind's
          duration-* utilities apply to all transitions and we only want
          this one to be 350ms. */}
      <div
        onClick={closeDrawer}
        className={`
          fixed inset-0 z-[699]
          bg-dark/55 backdrop-blur-sm
          transition-opacity duration-[350ms]
          ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* ── Drawer panel ──────────────────────────────────────────────────
          transform and transition cannot be done cleanly in Tailwind when
          the open/close values are dynamic — inline style is correct here.
          The gradient background and gold border are also inline because
          they use design token values in multi-stop gradients. */}
      <div
        className="fixed right-0 top-0 bottom-0 z-[700] flex flex-col w-[385px]"
        style={{
          background: 'linear-gradient(180deg, var(--color-sand), var(--color-cream))',
          borderLeft: '3px solid var(--color-gold)',
          boxShadow: '-20px 0 60px rgba(26,15,0,0.27)',
          transform: isDrawerOpen ? 'translateX(0)' : 'translateX(105%)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div
          className="relative flex-shrink-0 overflow-hidden px-5 pt-[18px] pb-[14px]"
          style={{
            background: 'linear-gradient(135deg, #2D6A2D, #1A4A1A)',
            borderBottom: '3px solid var(--color-gold)',
          }}
        >
          {/* Diagonal texture — inline because it is a repeating-linear-gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(232,160,32,0.07) 6px, rgba(232,160,32,0.07) 7px)',
            }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="font-pacifico text-[22px] text-cream" style={{ textShadow: '1px 2px 0 rgba(26,15,0,0.33)' }}>
                Iyong Basket
              </div>
              <div className="font-nunito text-[11px] font-extrabold text-gold tracking-[0.05em] uppercase mt-0.5">
                {cartCount} ITEM{cartCount !== 1 ? 'S' : ''}
              </div>
            </div>

            <button
              onClick={closeDrawer}
              className="w-9 h-9 rounded-full flex items-center justify-center text-cream text-[17px] cursor-pointer border-2 border-gold/40 bg-cream/15"
            >
              ✕
            </button>
          </div>

          {/* Marquee strip inside header */}
          <div className="overflow-hidden mt-2.5">
            <div className="flex whitespace-nowrap" style={{ animation: 'marquee 12s linear infinite' }}>
              {[...DRAWER_MARQUEE, ...DRAWER_MARQUEE].map((t, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 px-3.5 font-nunito text-[10px] font-extrabold text-gold/80 tracking-[0.1em] uppercase flex items-center gap-2.5"
                >
                  {t} <span className="opacity-50">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Body — scrollable item list ────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-[18px] py-1.5" style={{ scrollbarWidth: 'none' }}>

          {cartItems.length === 0 ? (
            <div className="py-16 px-4 text-center">
              <div className="text-[58px] mb-3.5">🛒</div>
              <div className="font-pacifico text-[20px] text-rust mb-2">Walang laman</div>
              <div className="font-nunito text-[13px] text-bamboo font-medium">
                Magdagdag ng masarap na pagkain!
              </div>
            </div>
          ) : (
            cartItems.map(({ menuItem, quantity }) => (
              <div
                key={menuItem.id}
                className="flex items-center gap-2.5 py-2.5 border-b border-dashed border-bamboo/44"
                style={{ animation: 'fadeUp 0.3s ease both' }}
              >
                {/* Emoji / image */}
                <div
                  className="w-[42px] h-[42px] rounded-[10px] flex-shrink-0 flex items-center justify-center overflow-hidden border border-bamboo/33"
                  style={{ background: 'linear-gradient(135deg, var(--color-sand), rgba(200,169,110,0.2))' }}
                >
                  {menuItem.image_url
                    ? <img src={menuItem.image_url} alt={menuItem.name} className="w-full h-full object-cover" />
                    : <span className="text-[22px]">🍽️</span>
                  }
                </div>

                {/* Name + controls */}
                <div className="flex-1 min-w-0">
                  <div className="font-playfair text-[13px] font-bold text-dark leading-tight">
                    {menuItem.name}
                  </div>
                  <div className="font-nunito text-[11px] text-bamboo mt-0.5">
                    €{parseFloat(menuItem.price).toFixed(2)} each
                  </div>

                  <div className="flex items-center gap-1.5 mt-1.5">
                    <button
                      onClick={() => updateQuantity(menuItem.id, quantity - 1)}
                      className="w-6 h-6 rounded-full border-2 border-bamboo/55 bg-cream flex items-center justify-center font-nunito font-extrabold text-dark text-[12px] cursor-pointer"
                    >−</button>
                    <span className="font-pacifico text-[13px] text-red w-5 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => addToCart(menuItem)}
                      className="w-6 h-6 rounded-full border-2 border-gold bg-gold flex items-center justify-center font-nunito font-extrabold text-dark text-[12px] cursor-pointer"
                    >+</button>
                  </div>
                </div>

                {/* Subtotal + remove */}
                <div className="flex flex-col items-end gap-2">
                  <div className="font-pacifico text-[15px] text-red">
                    €{(parseFloat(menuItem.price) * quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(menuItem.id)}
                    className="text-bamboo text-[12px] bg-transparent border-none cursor-pointer"
                  >✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Footer — totals + order button ─────────────────────────────── */}
        {cartItems.length > 0 && (
          <div
            className="flex-shrink-0 px-[18px] pt-3.5 pb-[22px] border-t-2 border-bamboo/27"
            style={{ background: 'var(--color-sand)' }}
          >
            {/* Promo code */}
            <div className="flex gap-2 mb-2.5">
              <input
                value={promo}
                onChange={e => setPromo(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePromo()}
                placeholder="Promo code (KAIN10)"
                className="flex-1 bg-cream border-2 border-bamboo/44 rounded-[10px] px-3 py-2 font-nunito text-[12px] font-semibold text-dark outline-none focus:border-gold transition-colors placeholder:text-bamboo placeholder:font-normal"
              />
              <button
                onClick={handlePromo}
                className="px-3.5 py-2 rounded-[10px] border-2 border-gold/40 bg-gold/13 text-dark font-nunito text-[12px] font-extrabold cursor-pointer"
              >
                Apply
              </button>
            </div>

            {promoApplied && (
              <div className="font-nunito text-[12px] font-extrabold text-teal-600 mb-2.5">
                🎉 KAIN10 — 10% discount applied!
              </div>
            )}

            {/* Summary */}
            <div className="flex justify-between text-[13px] mb-1.5">
              <span className="text-rust">Subtotal</span>
              <span className="font-bold">€{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[13px] mb-1.5">
              <span className="text-rust">Delivery</span>
              <span className={`font-bold ${delivery === 0 ? 'text-green-600' : ''}`}>
                {delivery === 0 ? 'Free' : `€${delivery.toFixed(2)}`}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="text-teal-600">Discount</span>
                <span className="font-bold text-teal-600">−€{discount.toFixed(2)}</span>
              </div>
            )}

            {cartTotal < 50 && (
              <div className="font-nunito text-[11px] font-bold text-sky-500 mb-1.5">
                💡 Add €{(50 - cartTotal).toFixed(2)} more for free delivery!
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center border-t-2 border-bamboo/27 pt-2.5 mb-3.5">
              <span className="font-nunito text-[15px] font-extrabold">Total</span>
              <span className="font-pacifico text-[26px] text-red">
                €{orderTotal.toFixed(2)}
              </span>
            </div>

            {/* Order CTA — gold gradient + pulseGlow. Gradient is inline because it
                references design tokens in a multi-stop pattern Tailwind can't express. */}
            <button
              onClick={handleCheckout}
              className="w-full py-[15px] rounded-[14px] font-pacifico text-[16px] text-dark border-none cursor-pointer flex items-center justify-center gap-2.5"
              style={{
                background: 'linear-gradient(135deg, var(--color-gold), #F5C842, var(--color-gold))',
                backgroundSize: '200% auto',
                boxShadow: '0 6px 22px rgba(232,160,32,0.4)',
                animation: 'pulseGlow 3s ease infinite',
              }}
            >
              🛵 Mag-order Na!
            </button>

            <div className="font-nunito text-[11px] text-bamboo text-center mt-2.5 font-semibold">
              No account needed · Guest checkout available
            </div>
          </div>
        )}
      </div>
    </>
  )
}