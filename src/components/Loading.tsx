interface LoadingProps {
  mensagem?: string
}

export default function Loading({ mensagem = 'Carregando...' }: LoadingProps) {
  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center gap-3 py-12 text-slate-600">
      <span
        aria-hidden="true"
        className="size-6 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600"
      />
      <span>{mensagem}</span>
    </div>
  )
}
