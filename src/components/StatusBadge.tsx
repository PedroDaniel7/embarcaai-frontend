import type { StatusConsulta } from '../types/consulta'
import { ROTULO_STATUS } from '../utils/formatar'

const CORES: Record<StatusConsulta, string> = {
  AGENDADA: 'bg-blue-100 text-blue-900',
  CONFIRMADA: 'bg-emerald-100 text-emerald-900',
  CANCELADA: 'bg-slate-200 text-slate-800',
  REALIZADA: 'bg-teal-100 text-teal-900',
  FALTOU: 'bg-red-100 text-red-900',
}

export default function StatusBadge({ status }: { status: StatusConsulta }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${CORES[status] ?? 'bg-slate-100 text-slate-800'}`}>
      {ROTULO_STATUS[status] ?? status}
    </span>
  )
}
