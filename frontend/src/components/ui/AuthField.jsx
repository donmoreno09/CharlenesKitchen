// Shared labelled input used by LoginPage and RegisterPage.
// Extracted here to keep both pages DRY.
//
// Props:
//   label       : string — uppercase label above the input
//   value       : string — controlled input value
//   onChange    : (e) => void — change handler
//   placeholder : string
//   type        : string — input type (default: 'text')
//   error       : string | null — field-level error message

export default function AuthField({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    error = null,
    }) {
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
            className={`
            w-full bg-cream border-2 rounded-xl text-dark
            font-nunito text-[14px] font-semibold px-4 py-3
            outline-none transition-all
            focus:border-gold focus:ring-2 focus:ring-gold/20
            placeholder:text-bamboo placeholder:font-normal
            ${error ? 'border-red/60' : 'border-bamboo/40'}
            `}
        />
        {error && (
            <p className="mt-1 font-nunito text-[11px] text-red font-semibold">
            {error}
            </p>
        )}
        </div>
    )
}