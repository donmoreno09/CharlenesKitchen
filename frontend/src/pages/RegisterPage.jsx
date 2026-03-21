import { useState }          from 'react'
import { Link }              from 'react-router-dom'
import { useAuth }           from '../context/useAuth'
import { useToast }          from '../context/useToast'
import Spinner               from '../components/ui/Spinner'

export default function RegisterPage() {
  const { register }    = useAuth()
  const { showToast }   = useToast()

  const [form, setForm] = useState({
    name: '', email: '', password: '', password_confirmation: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const updateField = key => e => setForm(prev => ({ ...prev, [key]: e.target.value }))

  // Helper to get the first error for a field
  const fieldError = field => errors[field]?.[0] ?? null

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) return
    if (form.password !== form.password_confirmation) {
      setErrors({ password_confirmation: ['Hindi magkapareho ang password.'] })
      return
    }
    setLoading(true)
    setErrors({})
    try {
      // ── AuthProvider.register takes (name, email, password) separately ──
      // Do NOT pass the form object — that was the bug in the earlier draft.
      await register(form.name, form.email, form.password)
      // AuthProvider.register() navigates to /menu on success
      showToast('Account nagawa na! Maligayang pagdating!', '🎉')
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        setErrors({ general: [err.response?.data?.message ?? 'May problema. Subukan ulit.'] })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div
        className="w-full max-w-[420px] rounded-[24px] overflow-hidden border-2 border-bamboo/33"
        style={{
          background: 'linear-gradient(180deg, var(--color-sand), var(--color-cream))',
          boxShadow: '0 24px 80px rgba(26,15,0,0.15)',
          animation: 'fadeUp 0.4s ease both',
        }}
      >
        {/* Red header */}
        <div
          className="px-[30px] pt-6 pb-5 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--color-red), #8B1A1A)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(232,160,32,0.07) 8px, rgba(232,160,32,0.07) 9px)' }}
          />
          <div className="relative z-10">
            <div className="text-[40px] mb-2">🍽️</div>
            <div className="font-pacifico text-[26px] text-cream" style={{ textShadow: '2px 2px 0 rgba(26,15,0,0.33)' }}>
              Gumawa ng Account
            </div>
            <div className="font-nunito text-[11px] text-gold font-extrabold tracking-[0.12em] uppercase mt-1">
              Charlene's Kitchen
            </div>
          </div>
        </div>

        {/* Form body */}
        <div className="px-[30px] py-7">
          {fieldError('general') && (
            <div className="bg-red/10 border border-red/30 rounded-xl px-4 py-3 mb-4 font-nunito text-[13px] text-red font-semibold">
              {fieldError('general')}
            </div>
          )}

          <AuthField label="Pangalan"             value={form.name}                  onChange={updateField('name')}                  placeholder="Buong pangalan"     error={fieldError('name')}                  />
          <AuthField label="Email"                value={form.email}                 onChange={updateField('email')}                 placeholder="ikaw@email.com"     type="email"    error={fieldError('email')}    />
          <AuthField label="Password"             value={form.password}              onChange={updateField('password')}              placeholder="Min. 8 characters"  type="password" error={fieldError('password')} />
          <AuthField label="Kumpirmahin Password" value={form.password_confirmation} onChange={updateField('password_confirmation')} placeholder="Ulitin ang password" type="password" error={fieldError('password_confirmation')} />

          <button
            onClick={handleSubmit}
            disabled={!form.name || !form.email || !form.password || loading}
            className="w-full py-[14px] mt-2 rounded-[14px] font-nunito font-extrabold text-[14px] text-dark border-none cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{
              background: 'linear-gradient(135deg, var(--color-gold), #F5C842)',
              boxShadow: '0 4px 18px rgba(232,160,32,0.33)',
            }}
          >
            {loading ? <><Spinner size={18} colorClass="border-dark" /><span>Ginagawa…</span></> : '🎉 Gumawa ng Account'}
          </button>

          <div className="text-center mt-5 font-nunito text-[13px] text-bamboo font-medium">
            Mayroon nang account?{' '}
            <Link to="/login" className="text-red font-extrabold no-underline hover:underline">
              Mag-sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthField({ label, value, onChange, placeholder, type = 'text', error }) {
  return (
    <div className="mb-4">
      <label className="block font-nunito text-[10px] font-extrabold tracking-[0.12em] uppercase text-rust mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-cream border-2 rounded-xl text-dark font-nunito text-[14px] font-semibold px-4 py-3 outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-bamboo placeholder:font-normal ${error ? 'border-red/60' : 'border-bamboo/40'}`}
      />
      {error && (
        <p className="mt-1 font-nunito text-[11px] text-red font-semibold">{error}</p>
      )}
    </div>
  )
}