import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variante = 'primario' | 'secundario' | 'perigo'

const ESTILOS: Record<Variante, string> = {
  primario: 'bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-600/60',
  secundario: 'bg-white text-brand-700 ring-1 ring-inset ring-brand-600 hover:bg-brand-50 disabled:opacity-60',
  perigo: 'bg-red-700 text-white hover:bg-red-800 disabled:bg-red-700/60',
}

const BASE =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-base font-semibold transition-colors disabled:cursor-not-allowed'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
  /** Quando informado, renderiza um link de rota com a aparência de botão. */
  to?: string
  children: ReactNode
}

export default function Button({ variante = 'primario', to, className = '', children, ...resto }: ButtonProps) {
  const classes = `${BASE} ${ESTILOS[variante]} ${className}`
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button className={classes} {...resto}>
      {children}
    </button>
  )
}
