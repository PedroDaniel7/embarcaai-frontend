import type { ReactNode } from 'react'

interface CardProps {
  titulo?: string
  children: ReactNode
  className?: string
}

export default function Card({ titulo, children, className = '' }: CardProps) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {titulo && <h2 className="mb-3 text-lg font-semibold text-slate-900">{titulo}</h2>}
      {children}
    </section>
  )
}
