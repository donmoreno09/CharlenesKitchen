// Two-step branded checkout:
//   Step 0 — delivery details (name, phone, address, notes)
//   Step 1 — payment method + order summary
//   Step 2 — confirmation (checkBounce icon + status tracker)

import { useState }        from 'react'
import { useNavigate }     from 'react-router-dom'
import { useAuth }         from '../context/useAuth'
import { useCart }         from '../context/useCart'
import { useToast }        from '../context/useToast'
import Spinner             from '../components/ui/Spinner'
import orderService        from '../services/orderService'

const DELIVERY_OPTIONS = [
  { id: 'delivery', icon: '🛵', heading: 'Ipadala sa Bahay',  sub: '20–35 minuto · €5 delivery fee' },
  { id: 'pickup',   icon: '🏪', heading: 'Kunin sa Tindahan', sub: 'Handa sa loob ng 15 minuto'      },
]

const PAYMENT_METHODS = [
  { id: 'gcash', icon: '💙', heading: 'GCash',            sub: 'I-scan ang QR code'       },
  { id: 'maya',  icon: '💚', heading: 'Maya',             sub: 'Digital wallet payment'   },
  { id: 'cod',   icon: '💵', heading: 'Cash on Delivery', sub: 'Bayad pagdating ng rider' },
]

const STEP_TITLES = ['Detalye ng Order', 'Paraan ng Bayad', 'Naka-order na! 🎉']

const ORDER_STATUSES = [
  { icon: '✅', label: 'Natanggap ang order', sub: 'Nakumpirma na',        state: 'done'   },
  { icon: '👨‍🍳', label: 'Inihahanda',          sub: 'Nagluluto ang kusina', state: 'active' },
  { icon: '🛵', label: 'Papunta na',           sub: '~25 minuto',          state: ''       },
  { icon: '🎉', label: 'Naibigay na!',          sub: 'Kain at mag-enjoy!',  state: ''       },
]

export default function CheckoutPage() {
  const navigate          = useNavigate()
  const { user }          = useAuth()
  const { cartItems, cartTotal, clearCart } = useCart()
  const { showToast }     = useToast()

  const [step,     setStep]     = useState(0)
  const [delivery, setDelivery] = useState('delivery')
  const [payment,  setPayment]  = useState('cod')
  const [loading,  setLoading]  = useState(false)
  const [orderId,  setOrderId]  = useState(null)

  // Pre-fill from auth context if logged in
  const [form, setForm] = useState({
    name:    user?.name  ?? '',
    phone:   '',
    email:   user?.email ?? '',
    address: '',
    notes:   '',
  })

  const updateField = key => e => setForm(prev => ({ ...prev, [key]: e.target.value }))

  // Gate: step 0 requires name + phone, and address if delivery
  const canProceed = step === 0
    ? form.name && form.phone && (delivery === 'pickup' || form.address)
    : true

  const deliveryFee = cartTotal > 50 ? 0 : 5
  const orderTotal  = cartTotal + deliveryFee

  // Redirect away if cart is empty on initial load
  if (cartItems.length === 0 && step < 2) {
    navigate('/menu')
    return null
  }

  const handleNext = async () => {
    if (step === 0) { setStep(1); return }

    if (step === 1) {
      setLoading(true)
      try {
        // ── API call — using the existing orderService.place() ──────────────
        // Payload shape matches StoreOrderRequest validation in Laravel.
        const response = await orderService.place({
          customer_name:    form.name,
          customer_email:   form.email || undefined,
          customer_phone:   form.phone || undefined,
          notes:            form.notes || undefined,
          cart_items:       cartItems.map(({ menuItem, quantity }) => ({
            menu_item_id: menuItem.id,
            quantity,
          })),
        })

        // response is response.data from orderService (already unwrapped)
        const placedOrder = response?.data ?? response
        setOrderId(placedOrder?.id ?? placedOrder?.guest_token ?? 'CK' + Math.floor(Math.random() * 9000 + 1000))
        clearCart()
        setStep(2)
        showToast('Order placed! Salamat! 🎉', '🎉')
      } catch (err) {
        console.error('Order failed:', err.response ?? err)
        showToast('May problema. Subukan ulit.', '❌')
      } finally {
        setLoading(false)
      }
      return
    }

    // Step 2 — return to menu
    navigate('/menu')
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div
        className="w-full max-w-[540px] rounded-[24px] overflow-hidden border-2 border-bamboo/33"
        style={{
          background: 'linear-gradient(180deg, var(--color-sand), var(--color-cream))',
          boxShadow: '0 24px 80px rgba(26,15,0,0.18)',
          animation: 'fadeUp 0.4s ease both',
        }}
      >

        {/* ── Header ────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden px-[26px] pt-5 pb-4"
          style={{ background: 'linear-gradient(135deg, var(--color-red), #8B1A1A)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(232,160,32,0.08) 8px, rgba(232,160,32,0.08) 9px)' }}
          />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="font-pacifico text-[22px] text-cream" style={{ textShadow: '1px 2px 0 rgba(26,15,0,0.4)' }}>
                {STEP_TITLES[step]}
              </div>
              {step < 2 && (
                <div className="font-nunito text-[11px] text-gold font-extrabold tracking-[0.08em] uppercase mt-0.5">
                  HAKBANG {step + 1} NG 2
                </div>
              )}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-cream text-[16px] cursor-pointer border-2 border-gold/40 bg-cream/15"
            >✕</button>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className="px-[26px] py-[22px]">

          {/* Step 0 — delivery details */}
          {step === 0 && (
            <div style={{ animation: 'fadeUp 0.3s ease both' }}>

              {DELIVERY_OPTIONS.map(({ id, icon, heading, sub }) => {
                const isSelected = delivery === id
                return (
                  <div
                    key={id}
                    onClick={() => setDelivery(id)}
                    className={`flex items-center gap-3 px-[15px] py-[13px] rounded-[14px] cursor-pointer mb-2.5 border-[2.5px] transition-all duration-200 ${isSelected ? 'border-gold bg-gold/10' : 'border-bamboo/33 bg-sand hover:border-gold'}`}
                    style={isSelected ? { boxShadow: '0 2px 12px rgba(232,160,32,0.2)' } : undefined}
                  >
                    <div className={`w-[18px] h-[18px] rounded-full flex-shrink-0 border-[2.5px] transition-all ${isSelected ? 'bg-gold border-gold' : 'border-bamboo/47'}`}
                      style={isSelected ? { boxShadow: '0 0 0 3px rgba(232,160,32,0.2)' } : undefined}
                    />
                    <span className="text-[20px]">{icon}</span>
                    <div>
                      <div className="font-nunito text-[13px] font-extrabold text-dark">{heading}</div>
                      <div className="font-nunito text-[12px] text-bamboo mt-0.5">{sub}</div>
                    </div>
                  </div>
                )
              })}

              <div className="grid grid-cols-2 gap-3.5 mt-1">
                <CheckoutField label="Pangalan *"  value={form.name}  onChange={updateField('name')}  placeholder="Buong pangalan" />
                <CheckoutField label="Numero *"    value={form.phone} onChange={updateField('phone')} placeholder="09XX-XXX-XXXX" type="tel" />
              </div>

              <CheckoutField label="Email" value={form.email} onChange={updateField('email')} placeholder="para sa resibo" type="email" />

              {delivery === 'delivery' && (
                <CheckoutField label="Address *" value={form.address} onChange={updateField('address')} placeholder="Kalsada, bahay, barangay" />
              )}

              <CheckoutField label="Mensahe sa Kusina" value={form.notes} onChange={updateField('notes')} placeholder="Allergy, kahilingan…" />
            </div>
          )}

          {/* Step 1 — payment + summary */}
          {step === 1 && (
            <div style={{ animation: 'fadeUp 0.3s ease both' }}>

              {PAYMENT_METHODS.map(({ id, icon, heading, sub }) => (
                <div
                  key={id}
                  onClick={() => setPayment(id)}
                  className={`flex items-center gap-3 px-[15px] py-[13px] rounded-[14px] cursor-pointer mb-2 border-[2.5px] transition-all duration-200 ${payment === id ? 'border-gold bg-gold/10' : 'border-bamboo/33 bg-sand hover:border-gold'}`}
                >
                  <div className={`w-[18px] h-[18px] rounded-full flex-shrink-0 border-[2.5px] transition-all ${payment === id ? 'bg-gold border-gold' : 'border-bamboo/47'}`} />
                  <span className="text-[20px]">{icon}</span>
                  <div>
                    <div className="font-nunito text-[13px] font-extrabold text-dark">{heading}</div>
                    <div className="font-nunito text-[12px] text-bamboo">{sub}</div>
                  </div>
                </div>
              ))}

              <div className="bg-sand border-2 border-bamboo/27 rounded-[14px] p-4 mt-2">
                <div className="font-pacifico text-[14px] text-rust mb-3">Buod ng Order</div>
                {cartItems.map(({ menuItem, quantity }) => (
                  <div key={menuItem.id} className="flex justify-between mb-1.5 font-nunito text-[13px]">
                    <span className="text-bamboo">{quantity}× {menuItem.name}</span>
                    <span className="font-extrabold text-dark">€{(parseFloat(menuItem.price) * quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-dashed border-bamboo/33 pt-2.5 mt-1 flex justify-between items-center">
                  <span className="font-nunito font-extrabold text-[13px] text-dark">Kabuuan</span>
                  <span className="font-pacifico text-[22px] text-red">€{orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — confirmation */}
          {step === 2 && (
            <div className="text-center py-2.5 pb-[18px]" style={{ animation: 'fadeUp 0.3s ease both' }}>

              <div
                className="w-[78px] h-[78px] rounded-full mx-auto mb-4 flex items-center justify-center text-[34px]"
                style={{
                  background: 'linear-gradient(135deg, var(--color-gold), #F5C842)',
                  boxShadow: '0 8px 28px rgba(232,160,32,0.33)',
                  animation: 'checkBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both',
                }}
              >✓</div>

              <div className="font-playfair italic text-[24px] text-dark mb-2">
                Salamat sa iyong order!
              </div>
              <div className="font-nunito text-[13px] text-bamboo mb-5 font-medium">
                {delivery === 'delivery' ? 'Maihahatid sa loob ng 20–35 minuto' : 'Maaaring kunin sa loob ng 15 minuto'}
              </div>

              <div className="bg-sand border-2 border-bamboo/27 rounded-[14px] p-3.5 mx-auto mb-4 text-left">
                <div className="font-pacifico text-[13px] text-rust mb-3">Status ng Order</div>
                {ORDER_STATUSES.map(({ icon, label, sub, state }) => (
                  <div key={label} className="flex items-center gap-3 py-2 border-b border-dashed border-bamboo/20 last:border-b-0">
                    <div
                      className={`w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center text-[14px] border-2 ${
                        state === 'done'   ? 'bg-green-700 border-green-700 text-cream'  :
                        state === 'active' ? 'border-gold bg-gold/10'                    :
                                            'border-bamboo/27 bg-cream text-bamboo'
                      }`}
                      style={state === 'active' ? { animation: 'pulseDot 1.5s ease infinite' } : undefined}
                    >
                      {state === 'done' ? '✓' : icon}
                    </div>
                    <div>
                      <div className={`font-nunito text-[13px] ${state ? 'font-extrabold text-dark' : 'font-medium text-bamboo'}`}>
                        {label}
                      </div>
                      <div className="font-nunito text-[11px] text-bamboo">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {orderId && (
                <div className="font-nunito text-[11px] text-bamboo tracking-[0.1em] mb-2">
                  ORDER #{orderId}
                </div>
              )}
            </div>
          )}

          {/* CTA button */}
          <button
            onClick={handleNext}
            disabled={(!canProceed && step === 0) || loading}
            className="w-full py-[15px] mt-5 rounded-[14px] font-pacifico text-[16px] text-dark border-none cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{
              background: 'linear-gradient(135deg, var(--color-gold), #F5C842, var(--color-gold))',
              backgroundSize: '200% auto',
              boxShadow: '0 6px 22px rgba(232,160,32,0.4)',
              animation: 'pulseGlow 3s ease infinite',
            }}
          >
            {loading ? (
              <><Spinner size={20} colorClass="border-dark" /><span>Ino-order…</span></>
            ) : step === 0 ? '💳 Pumunta sa Pagbabayad →'
              : step === 1 ? `🛵 I-place ang Order · €${orderTotal.toFixed(2)}`
              : '🏠 Bumalik sa Menu'}
          </button>

        </div>
      </div>
    </div>
  )
}

// ── Internal sub-component — not exported ──────────────────────────────────────
function CheckoutField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="mb-3.5 col-span-full">
      <label className="block font-nunito text-[10px] font-extrabold tracking-[0.12em] uppercase text-rust mb-[7px]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-sand border-2 border-bamboo/40 rounded-xl text-dark font-nunito text-[14px] font-semibold px-[15px] py-3 outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-bamboo placeholder:font-normal"
      />
    </div>
  )
}