// Generic loading indicator — used across multiple pages.

export default function Spinner({ message = 'Loading...' }) {
    return (
        <div className="flex items-center justify-center py-16">
        <div className="text-gray-400 text-sm">{message}</div>
        </div>
    )
}