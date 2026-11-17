import type { ReactNode } from 'react'

interface EmptyStateProps {
  titulo?: string
  descricao?: string
  acao?: ReactNode
}

export default function EmptyState({
  titulo = 'Nenhum registro encontrado',
  descricao = 'Quando houver dados, eles aparecerão aqui.',
  acao,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-slate-800">{titulo}</p>
      <p className="mt-1 text-slate-600">{descricao}</p>
      {acao && <div className="mt-4 flex justify-center">{acao}</div>}
    </div>
  )
}
