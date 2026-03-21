import { useState }          from 'react'
import { Link }              from 'react-router-dom'
import { useAuth }           from '../context/useAuth'
import { useToast }          from '../context/useToast'
import Spinner               from '../components/ui/Spinner'
import AuthField from '../components/ui/AuthField'

export default function LoginPage() {
  const { login }       = useAuth()
  const { showToast }   = useToast()

  const [form, setForm]     = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState(null)

  const updateField = key => e => setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.email || !form.password) return
    setLoading(true)
    setError(null)
    try {
      // AuthProvider.login() navigates to /menu on success automatically
      await login(form.email, form.password)
      showToast('Maligayang pagdating!', '👋')
    } catch (err) {
      const msg =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        'Mali ang email o password. Subukan ulit.'
      setError(msg)
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
              Mag-sign in
            </div>
            <div className="font-nunito text-[11px] text-gold font-extrabold tracking-[0.12em] uppercase mt-1">
              Charlene's Kitchen
            </div>
          </div>
        </div>

        {/* Form body */}
        <div className="px-[30px] py-7">
          {error && (
            <div className="bg-red/10 border border-red/30 rounded-xl px-4 py-3 mb-4 font-nunito text-[13px] text-red font-semibold">
              {error}
            </div>
          )}

          <AuthField label="Email"    value={form.email}    onChange={updateField('email')}    placeholder="ikaw@email.com"     type="email"    />
          <AuthField label="Password" value={form.password} onChange={updateField('password')} placeholder="Ang iyong password" type="password" />

          <button
            onClick={handleSubmit}
            disabled={!form.email || !form.password || loading}
            className="w-full py-[14px] mt-2 rounded-[14px] font-nunito font-extrabold text-[14px] text-dark border-none cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{
              background: 'linear-gradient(135deg, var(--color-gold), #F5C842)',
              boxShadow: '0 4px 18px rgba(232,160,32,0.33)',
            }}
          >
            {loading ? <><Spinner size={18} colorClass="border-dark" /><span>Signing in…</span></> : '👤 Sign In'}
          </button>

          <div className="text-center mt-5 font-nunito text-[13px] text-bamboo font-medium">
            Wala pang account?{' '}
            <Link to="/register" className="text-red font-extrabold no-underline hover:underline">
              Mag-register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}