import { useState, useCallback } from 'react'
import ToastContext from './ToastContext'

export default function ToastProvider({ children }) {
    const [toast, setToast] = useState(null)
    // toast shape: { message: string, emoji: string } | null

    const showToast = useCallback((message, emoji = '✅') => {
        setToast({ message, emoji })
        setTimeout(() => setToast(null), 2500)
    }, [])

    return (
        <ToastContext.Provider value={{ toast, showToast }}>
        {children}
        </ToastContext.Provider>
    )
}