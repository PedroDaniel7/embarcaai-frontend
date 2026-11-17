import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import ConsultaCard from '../components/ConsultaCard'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import StatusBadge from '../components/StatusBadge'
import { useFetch } from '../hooks/useFetch'
import { listarConsultas } from '../services/consultas'
import { STATUS_CONSULTA, type StatusConsulta } from '../types/consulta'
import { ROTULO_STATUS, formatarDataHora, rotuloTransporte } from '../utils/formatar'

export default function Consultas() {
  const { dados, carregando, erro, recarregar } = useFetch(listarConsultas)
  const [filtro, setFiltro] = useState<StatusConsulta | 'TODOS'>('TODOS')

  const consultas = (dados ?? []).filter((c) => filtro === 'TODOS' || c.status === filtro)
  const vans = consultas.filter((c) => c.precisaTransporte === 'S' && c.status !== 'CANCELADA').length

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Consultas</h1>
          <p className="mt-1 text-slate-600">Acompanhe os agendamentos e a necessidade de transporte na van.</p>
        </div>
        <Button to="/consultas/nova">Registrar consulta</Button>
      </div>

      <div className="mt-6 max-w-xs">
        <label htmlFor="filtro-status" className="block text-base font-medium text-slate-800">
          Filtrar por status
        </label>
        <select
          id="filtro-status"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as StatusConsulta | 'TODOS')}
          className="mt-1 block min-h-11 w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-base"
        >
          <option value="TODOS">Todos</option>
          {STATUS_CONSULTA.map((s) => (
            <option key={s} value={s}>
              {ROTULO_STATUS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6" aria-live="polite">
        {carregando && <Loading mensagem="Carregando consultas..." />}
        {!carregando && erro && <ErrorMessage mensagem={erro} onTentarNovamente={recarregar} />}
        {!carregando && !erro && consultas.length === 0 && (
          <EmptyState
            titulo="Nenhuma consulta encontrada"
            descricao={filtro === 'TODOS' ? 'Ainda não há consultas registradas.' : 'Nenhuma consulta com esse status.'}
            acao={<Button to="/consultas/nova">Registrar consulta</Button>}
          />
        )}
        {!carregando && !erro && consultas.length > 0 && (
          <>
            <p className="mb-3 text-sm text-slate-600">
              {consultas.length} consulta(s) · {vans} com necessidade de van
            </p>

            {/* Cards no mobile */}
            <div className="grid gap-3 md:hidden">
              {consultas.map((c) => (
                <ConsultaCard key={c.idConsulta} consulta={c} />
              ))}
            </div>

            {/* Tabela a partir de tablet */}
            <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
              <table className="w-full table-fixed text-left text-sm">
                <caption className="sr-only">Lista de consultas</caption>
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th scope="col" className="w-[22%] px-3 py-3">Data e hora</th>
                    <th scope="col" className="w-[22%] px-3 py-3">Especialidade</th>
                    <th scope="col" className="w-[11%] px-3 py-3">Paciente</th>
                    <th scope="col" className="w-[11%] px-3 py-3">Unidade</th>
                    <th scope="col" className="w-[8%] px-3 py-3">Van</th>
                    <th scope="col" className="w-[14%] px-3 py-3">Status</th>
                    <th scope="col" className="w-[12%] px-3 py-3">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {consultas.map((c) => (
                    <tr key={c.idConsulta}>
                      <td className="px-3 py-3">{formatarDataHora(c.dataHora)}</td>
                      <td className="break-words px-3 py-3 font-medium">{c.especialidade}</td>
                      <td className="px-3 py-3">#{c.idPaciente}</td>
                      <td className="px-3 py-3">#{c.idUnidade}</td>
                      <td className="px-3 py-3">{rotuloTransporte(c.precisaTransporte)}</td>
                      <td className="px-3 py-3">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-3 py-3">
                        <Link to={`/consultas/${c.idConsulta}`} className="font-semibold text-brand-700 underline">
                          Detalhes
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
