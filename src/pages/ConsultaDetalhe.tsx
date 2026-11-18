import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import StatusBadge from '../components/StatusBadge'
import { useFetch } from '../hooks/useFetch'
import {
  buscarConsultaPorId,
  listarLembretes,
  listarReservas,
  responderConsulta,
} from '../services/consultas'
import { listarPacientes } from '../services/pacientes'
import { listarUnidades } from '../services/unidades'
import type { RespostaConsulta } from '../types/consulta'
import { formatarDataHora, rotuloTransporte } from '../utils/formatar'

const ROTULO_RESPOSTA: Record<RespostaConsulta, string> = {
  CONFIRMOU: 'Confirmou presença',
  CANCELOU: 'Cancelou',
}

export default function ConsultaDetalhe() {
  const { id = '' } = useParams()
  // Uma busca só: a consulta, os nomes (pacientes/unidades), os lembretes e as reservas.
  const { dados, carregando, erro, recarregar } = useFetch(
    () =>
      Promise.all([
        buscarConsultaPorId(id),
        listarPacientes(),
        listarUnidades(),
        listarLembretes(id),
        listarReservas(id),
      ]),
    [id],
  )
  const [executando, setExecutando] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [falha, setFalha] = useState<string | null>(null)
  const [confirmandoCancelamento, setConfirmandoCancelamento] = useState(false)

  async function responder(resposta: RespostaConsulta) {
    setExecutando(true)
    setMensagem(null)
    setFalha(null)
    setConfirmandoCancelamento(false)
    try {
      await responderConsulta(id, resposta)
      setMensagem(resposta === 'CONFIRMOU' ? 'Presença confirmada.' : 'Consulta cancelada. A vaga pode ser liberada para o próximo da fila.')
      recarregar() // atualiza status, lembretes e reservas
    } catch (e) {
      setFalha(e instanceof Error ? e.message : 'Erro inesperado.')
    } finally {
      setExecutando(false)
    }
  }

  const consulta = dados?.[0]
  const paciente = dados?.[1].find((p) => p.id === consulta?.pacienteId)
  const unidade = dados?.[2].find((u) => u.id === consulta?.unidadeId)
  const lembretes = dados?.[3] ?? []
  const reservas = dados?.[4] ?? []

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/consultas" className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline">
        ← Voltar para consultas
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Consulta #{id}</h1>

      <div className="mt-6" aria-live="polite">
        {carregando && !consulta && <Loading mensagem="Carregando consulta..." />}
        {!carregando && erro && <ErrorMessage mensagem={erro} onTentarNovamente={recarregar} />}

        {!erro && consulta && (
          <div className="grid gap-4">
            <Card>
              <div className="flex items-center justify-between gap-3">
                <h2 className="min-w-0 break-words text-xl font-semibold">{consulta.especialidade}</h2>
                <StatusBadge status={consulta.status} />
              </div>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                <dt className="text-slate-600">Data e hora</dt>
                <dd className="font-medium">{formatarDataHora(consulta.dataHora)}</dd>
                <dt className="text-slate-600">Paciente</dt>
                <dd className="break-words font-medium">{paciente?.nome ?? `Paciente ${consulta.pacienteId}`}</dd>
                <dt className="text-slate-600">Unidade</dt>
                <dd className="break-words font-medium">
                  {unidade ? `${unidade.nome} (${unidade.cidade})` : `Unidade ${consulta.unidadeId}`}
                </dd>
                <dt className="text-slate-600">Precisa de van</dt>
                <dd className="font-medium">{rotuloTransporte(consulta.precisaTransporte)}</dd>
              </dl>

              {mensagem && (
                <p role="status" className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-emerald-900">
                  {mensagem}
                </p>
              )}
              {falha && (
                <p role="alert" className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-red-900">
                  Falha na operação: {falha}
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button disabled={executando || carregando} onClick={() => responder('CONFIRMOU')}>
                  {executando ? 'Enviando...' : 'Confirmar'}
                </Button>
                <Button
                  variante="secundario"
                  disabled={executando || carregando || confirmandoCancelamento}
                  onClick={() => setConfirmandoCancelamento(true)}
                >
                  Cancelar
                </Button>
              </div>

              {confirmandoCancelamento && (
                <div
                  role="alertdialog"
                  aria-live="assertive"
                  aria-labelledby="titulo-cancelar"
                  className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950"
                >
                  <p id="titulo-cancelar" className="font-semibold">
                    Tem certeza que deseja cancelar esta consulta? A vaga pode ser liberada para o próximo da fila.
                  </p>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <Button variante="perigo" disabled={executando} onClick={() => responder('CANCELOU')}>
                      {executando ? 'Enviando...' : 'Sim, cancelar'}
                    </Button>
                    <Button variante="secundario" disabled={executando} onClick={() => setConfirmandoCancelamento(false)}>
                      Voltar
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <h2 className="text-lg font-semibold">Lembretes enviados</h2>
              {lembretes.length === 0 ? (
                <p className="mt-2 text-slate-600">Nenhum lembrete enviado para esta consulta.</p>
              ) : (
                <ul className="mt-2 divide-y divide-slate-200">
                  {lembretes.map((l) => (
                    <li key={l.id} className="flex flex-wrap justify-between gap-x-4 py-2">
                      <span>{formatarDataHora(l.dataEnvio)}</span>
                      <span className="font-medium">{l.resposta ? ROTULO_RESPOSTA[l.resposta] : 'Sem resposta'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card>
              <h2 className="text-lg font-semibold">Reservas na van</h2>
              {reservas.length === 0 ? (
                <p className="mt-2 text-slate-600">Nenhuma reserva de transporte para esta consulta.</p>
              ) : (
                <ul className="mt-2 divide-y divide-slate-200">
                  {reservas.map((r) => (
                    <li key={r.id} className="flex flex-wrap justify-between gap-x-4 py-2">
                      <span>Viagem #{r.viagemId}</span>
                      <span className="font-medium">{r.statusTransporte}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
