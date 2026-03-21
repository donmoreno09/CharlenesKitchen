import { useState, useEffect } from 'react'
import { useParams, Link }     from 'react-router-dom'
import orderService            from '../services/orderService'
import Spinner                 from '../components/ui/Spinner'

// Status → brand colour map
const STATUS_STYLES = {
  pending:   { bg: 'bg-gold/20',      text: 'text-dark',      border: 'border-gold/50',     label: 'Naghihintay', dot: 'bg-gold'     },
  confirmed: { bg: 'bg-teal-500/15',  text: 'text-teal-700',  border: 'border-teal-400/50', label: 'Nakumpirma',  dot: 'bg-teal-500' },
  preparing: { bg: 'bg-red/15',       text: 'text-red',       border: 'border-red/30',      label: 'Inihahanda',  dot: 'bg-red'      },
  ready:     { bg: 'bg-green-500/15', text: 'text-green-700', border: 'border-green-400/50',label: 'Handa na',    dot: 'bg-green-500'},
  delivered: { bg: 'bg-bamboo/20',    text: 'text-bamboo',    border: 'border-bamboo/40',   label: 'Naibigay na', dot: 'bg-bamboo'   },
  cancelled: { bg: 'bg-rust/15',      text: 'text-rust',      border: 'border-rust/30',     label: 'Kansela',     dot: 'bg-rust'     },
}

const STATUS_STEPS = ['pending', 'confirmed', 'preparing', 'ready', 'delivered']

export default function OrderTrackingPage() {
  // ── token from :token param — matches App.jsx route ──────────────────────
  const { token } = useParams()

  const [order,   setOrder]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    let cancelled = false
    const fetchOrder = async () => {
      try {
        // ── orderService.trackByToken returns response.data directly ─────────
        const data = await orderService.trackByToken(token)
        if (!cancelled) setOrder(data)
      } catch (err) {
        if (!cancelled) setError(
          err.response?.status === 404
            ? 'Order not found. Check your tracking token.'
            : 'Hindi ma-load ang order. Subukan ulit.'
        )
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchOrder()
    return () => { cancelled = true }
  }, [token])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size={36} colorClass="border-gold" />
    </div>
  )

  if (error || !order) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-[48px]">🔍</div>
      <div className="font-pacifico text-[20px] text-rust text-center">{error ?? 'Order not found'}</div>
      <Link to="/menu" className="font-nunito text-[13px] text-bamboo font-semibold hover:text-dark">
        ← Bumalik sa Menu
      </Link>
    </div>
  )

  const currentStatus = order.status ?? 'pending'
  const style         = STATUS_STYLES[currentStatus] ?? STATUS_STYLES.pending
  const currentIndex  = STATUS_STEPS.indexOf(currentStatus)

  return (
    <div className="min-h-screen py-12 px-4">
      <div
        className="max-w-[520px] mx-auto rounded-[24px] overflow-hidden border-2 border-bamboo/33"
        style={{
          background: 'linear-gradient(180deg, var(--color-sand), var(--color-cream))',
          boxShadow: '0 20px 60px rgba(26,15,0,0.13)',
          animation: 'fadeUp 0.4s ease both',
        }}
      >
        {/* Header */}
        <div
          className="px-6 pt-5 pb-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--color-red), #8B1A1A)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(232,160,32,0.07) 8px, rgba(232,160,32,0.07) 9px)' }}
          />
          <div className="relative z-10">
            <div className="font-pacifico text-[22px] text-cream" style={{ textShadow: '1px 2px 0 rgba(26,15,0,0.33)' }}>
              Track ang Order
            </div>
            <div className="font-nunito text-[11px] text-gold font-extrabold tracking-[0.08em] uppercase mt-0.5">
              ORDER #{order.id}
            </div>
          </div>
        </div>

        <div className="px-6 py-6">

          {/* Status badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${style.bg} ${style.border} mb-5`}>
            <div
              className={`w-2 h-2 rounded-full ${style.dot}`}
              style={currentStatus !== 'delivered' && currentStatus !== 'cancelled'
                ? { animation: 'pulseDot 1.5s ease infinite' }
                : undefined}
            />
            <span className={`font-nunito text-[13px] font-extrabold ${style.text}`}>
              {style.label}
            </span>
          </div>

          {/* Progress tracker */}
          {currentStatus !== 'cancelled' && (
            <div className="flex items-center mb-6">
              {STATUS_STEPS.map((s, i) => {
                const isDone   = i <= currentIndex
                const isActive = i === currentIndex
                return (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-nunito font-extrabold flex-shrink-0 border-2 transition-all ${isDone ? 'bg-gold border-gold text-dark' : 'bg-cream border-bamboo/33 text-bamboo'}`}
                      style={isActive ? { animation: 'pulseDot 1.5s ease infinite' } : undefined}
                    >
                      {isDone ? '✓' : i + 1}
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`flex-1 h-[2px] ${i < currentIndex ? 'bg-gold' : 'bg-bamboo/27'}`} />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Order items — uses your actual API response shape */}
          {order.order_items?.length > 0 && (
            <div className="bg-sand border-2 border-bamboo/27 rounded-[14px] p-4 mb-4">
              <div className="font-pacifico text-[14px] text-rust mb-3">Mga Inorder</div>
              {order.order_items.map(item => (
                <div key={item.id} className="flex justify-between mb-1.5 font-nunito text-[13px]">
                  <span className="text-bamboo">{item.quantity}× {item.menu_item_name}</span>
                  <span className="font-extrabold text-dark">€{parseFloat(item.subtotal).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-dashed border-bamboo/33 pt-2.5 mt-1 flex justify-between items-center">
                <span className="font-nunito font-extrabold text-[13px] text-dark">Kabuuan</span>
                <span className="font-pacifico text-[20px] text-red">€{parseFloat(order.total_price).toFixed(2)}</span>
              </div>
            </div>
          )}

          {order.notes && (
            <div className="bg-sand border-2 border-bamboo/27 rounded-[14px] p-4 mb-4 font-nunito text-[13px] text-bamboo">
              <span className="font-extrabold text-dark">Notes: </span>{order.notes}
            </div>
          )}

          <Link
            to="/menu"
            className="font-nunito text-[13px] text-bamboo font-semibold no-underline hover:text-dark transition-colors"
          >
            ← Bumalik sa Menu
          </Link>

        </div>
      </div>
    </div>
  )
}