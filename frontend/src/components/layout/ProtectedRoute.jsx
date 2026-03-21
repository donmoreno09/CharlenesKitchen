import { Navigate }  from 'react-router-dom'
import { useAuth }   from '../../context/useAuth'
import Spinner       from '../ui/Spinner'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <Spinner size={36} colorClass="border-gold" />
        </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}