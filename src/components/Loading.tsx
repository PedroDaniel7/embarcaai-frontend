import { useEffect, useState } from 'react'

interface LoadingProps {
  mensagem?: string
}

/** Depois deste tempo avisamos que a API gratuita pode estar "acordando". */
const ATRASO_AVISO_MS = 5000

export default function Loading({ mensagem = 'Carregando...' }: LoadingProps) {
  const [demorando, setDemorando] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDemorando(true), ATRASO_AVISO_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div role="status" aria-live="polite" className="py-12 text-center text-slate-600">
      <div className="flex items-center justify-center gap-3">
        <span
          aria-hidden="true"
          className="size-6 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600"
        />
        <span>{mensagem}</span>
      </div>
      {demorando && <p className="mt-3 px-4 text-sm">A API pode levar até 1 minuto para acordar. Aguarde um pouco.</p>}
    </div>
  )
}
