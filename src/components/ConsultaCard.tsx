import { Link } from 'react-router-dom'
import type { Consulta } from '../types/consulta'
import { formatarDataHora, rotuloTransporte } from '../utils/formatar'
import StatusBadge from './StatusBadge'

interface ConsultaCardProps {
  consulta: Consulta
  pacienteNome: string
  unidadeNome: string
}

/** Versão em card de uma consulta, usada no lugar da tabela em telas pequenas. */
export default function ConsultaCard({ consulta, pacienteNome, unidadeNome }: ConsultaCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 break-words text-base font-semibold text-slate-900">{consulta.especialidade}</h3>
        <StatusBadge status={consulta.status} />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <dt className="text-slate-600">Data e hora</dt>
        <dd className="font-medium">{formatarDataHora(consulta.dataHora)}</dd>
        <dt className="text-slate-600">Paciente</dt>
        <dd className="break-words font-medium">{pacienteNome}</dd>
        <dt className="text-slate-600">Unidade</dt>
        <dd className="break-words font-medium">{unidadeNome}</dd>
        <dt className="text-slate-600">Van</dt>
        <dd className="font-medium">{rotuloTransporte(consulta.precisaTransporte)}</dd>
      </dl>
      <Link
        to={`/consultas/${consulta.id}`}
        className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-700 underline"
      >
        Ver detalhes
      </Link>
    </article>
  )
}
