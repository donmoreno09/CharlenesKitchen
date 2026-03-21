// Shown when navigated to with state: { order } from a legacy or external flow.
// The new CheckoutPage handles confirmation inline at step 2.
// This page acts as a fallback and is kept for the /order-confirmation route.

import { useLocation, Link, Navigate } from 'react-router-dom'

export default function OrderConfirmationPage() {
  const location = useLocation()
  const order    = location.state?.order

  if (!order) return <Navigate to="/menu" replace />

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div
        className="w-full max-w-[480px] rounded-[24px] overflow-hidden border-2 border-bamboo/33 text-center"
        style={{
          background: 'linear-gradient(180deg, var(--color-sand), var(--color-cream))',
          boxShadow: '0 24px 80px rgba(26,15,0,0.15)',
          animation: 'fadeUp 0.4s ease both',
        }}
      >
        {/* Red header */}
        <div
          className="px-[30px] pt-6 pb-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--color-red), #8B1A1A)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(232,160,32,0.07) 8px, rgba(232,160,32,0.07) 9px)' }}
          />
          <div className="relative z-10">
            <div
              className="font-pacifico text-[22px] text-cream"
              style={{ textShadow: '1px 2px 0 rgba(26,15,0,0.4)' }}
            >
              Naka-order na! 🎉
            </div>
          </div>
        </div>

        <div className="px-[30px] py-8">
          {/* checkBounce icon */}
          <div
            className="w-[78px] h-[78px] rounded-full mx-auto mb-5 flex items-center justify-center text-[34px]"
            style={{
              background: 'linear-gradient(135deg, var(--color-gold), #F5C842)',
              boxShadow: '0 8px 28px rgba(232,160,32,0.33)',
              animation: 'checkBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both',
            }}
          >✓</div>

          <div className="font-playfair italic text-[22px] text-dark mb-2">
            Salamat, {order.customer_name}!
          </div>
          <div className="font-nunito text-[13px] text-bamboo mb-6 font-medium">
            Order #{order.id} · Status: <span className="font-extrabold text-dark capitalize">{order.status}</span>
          </div>

          {/* Order summary */}
          <div className="bg-sand border-2 border-bamboo/27 rounded-[14px] p-4 mb-5 text-left">
            <div className="font-pacifico text-[14px] text-rust mb-3">Buod</div>
            <div className="flex justify-between font-nunito text-[13px] mb-1.5">
              <span className="text-bamboo">Total</span>
              <span className="font-extrabold text-dark">€{parseFloat(order.total_price).toFixed(2)}</span>
            </div>
          </div>

          {/* Guest token */}
          {order.guest_token && (
            <div className="bg-gold/10 border-2 border-gold/33 rounded-[14px] p-4 mb-5 text-left">
              <div className="font-nunito text-[10px] font-extrabold tracking-[0.1em] uppercase text-rust mb-1">
                Tracking Token
              </div>
              <code className="font-nunito text-[12px] text-dark break-all">{order.guest_token}</code>
              <div className="mt-2">
                <Link to={`/track/${order.guest_token}`} className="font-nunito text-[12px] text-red font-extrabold no-underline hover:underline">
                  Track ang order →
                </Link>
              </div>
            </div>
          )}

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red text-cream font-nunito font-extrabold text-[13px] no-underline"
            style={{ boxShadow: '0 4px 16px rgba(192,57,43,0.27)' }}
          >
            🏠 Bumalik sa Menu
          </Link>
        </div>
      </div>
    </div>
  )
}