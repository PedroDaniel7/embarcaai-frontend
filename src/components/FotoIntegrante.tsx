import { useState } from 'react'
import type { Integrante } from '../types/integrante'

interface FotoIntegranteProps {
  integrante: Integrante
  /** Lado do quadrado em pixels. */
  tamanho?: number
}

const iniciais = (nome: string) =>
  nome
    .split(' ')
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')

/** Foto redonda do integrante; se a imagem não carregar, mostra as iniciais. */
export default function FotoIntegrante({ integrante, tamanho = 96 }: FotoIntegranteProps) {
  const [falhou, setFalhou] = useState(false)
  const estilo = { width: tamanho, height: tamanho }

  if (falhou) {
    return (
      <div
        role="img"
        aria-label={`Iniciais de ${integrante.nome}`}
        style={estilo}
        className="flex shrink-0 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700"
      >
        {iniciais(integrante.nome)}
      </div>
    )
  }

  return (
    <img
      src={integrante.foto}
      alt={`Foto de ${integrante.nome}, integrante da equipe EmbarcaAí`}
      width={tamanho}
      height={tamanho}
      loading="lazy"
      onError={() => setFalhou(true)}
      style={estilo}
      className="shrink-0 rounded-full object-cover object-top ring-2 ring-brand-100"
    />
  )
}
