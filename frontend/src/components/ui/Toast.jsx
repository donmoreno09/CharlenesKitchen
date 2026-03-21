// Globally-mounted toast notification.
// Reads from ToastContext — no props.
// Returns null when there is no active toast, so nothing renders.

import { useToast } from '../../context/useToast'

export default function Toast() {
    const { toast } = useToast()

    if (!toast) return null

    return (
        <div
        className="fixed bottom-6 right-6 z-[800] flex items-center gap-2.5 border-2 border-gold rounded-2xl px-5 py-3 font-nunito font-extrabold text-[13px] text-cream"
        style={{
            background: 'linear-gradient(135deg, #2D6A2D, #1E4A1E)',
            boxShadow: '0 10px 36px rgba(26,15,0,0.27)',
            animation: 'toastPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}
        >
        <span className="text-[20px]">{toast.emoji}</span>
        <span>{toast.message}</span>
        </div>
    )
}