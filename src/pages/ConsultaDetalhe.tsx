import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import StatusBadge from '../components/StatusBadge'
import { useFetch } from '../hooks/useFetch'
import { atualizarConsulta, buscarConsultaPorId, removerConsulta } from '../services/consultas'
import type { Consulta, StatusConsulta } from '../types/consulta'
import { formatarDataHora, rotuloTransporte } from '../utils/formatar'

export default function ConsultaDetalhe() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { dados, carregando, erro, recarregar } = useFetch(() => buscarConsultaPorId(id))
  const [atual, setAtual] = useState<Consulta | null>(null)
  const [executando, setExecutando] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [falha, setFalha] = useState<string | null>(null)

  const consulta = atual ?? dados

  async function mudarStatus(status: StatusConsulta) {
    if (!consulta) return
    setExecutando(true)
    setMensagem(null)
    setFalha(null)
    try {
      const resposta = await atualizarConsulta({ ...consulta, status })
      setAtual(resposta?.idConsulta ? resposta : { ...consulta, status })
      setMensagem(status === 'CONFIRMADA' ? 'Presença confirmada.' : 'Consulta cancelada. A vaga pode ser liberada para o próximo da fila.')
    } catch (e) {
      setFalha(e instanceof Error ? e.message : 'Erro inesperado.')
    } finally {
      setExecutando(false)
    }
  }

  async function remover() {
    if (!consulta || !window.confirm('Remover esta consulta? Essa ação não pode ser desfeita.')) return
    setExecutando(true)
    setFalha(null)
    try {
      await removerConsulta(consulta.idConsulta)
      navigate('/consultas')
    } catch (e) {
      setFalha(e instanceof Error ? e.message : 'Erro inesperado.')
      setExecutando(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/consultas" className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline">
        ← Voltar para consultas
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Consulta #{id}</h1>

      <div className="mt-6" aria-live="polite">
        {carregando && <Loading mensagem="Carregando consulta..." />}
        {!carregando && erro && <ErrorMessage mensagem={erro} onTentarNovamente={recarregar} />}

        {!carregando && !erro && consulta && (
          <Card>
            <div className="flex items-center justify-between gap-3">
              <h2 className="min-w-0 break-words text-xl font-semibold">{consulta.especialidade}</h2>
              <StatusBadge status={consulta.status} />
            </div>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <dt className="text-slate-600">Data e hora</dt>
              <dd className="font-medium">{formatarDataHora(consulta.dataHora)}</dd>
              <dt className="text-slate-600">Paciente</dt>
              <dd className="font-medium">#{consulta.idPaciente}</dd>
              <dt className="text-slate-600">Unidade</dt>
              <dd className="font-medium">#{consulta.idUnidade}</dd>
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
              <Button
                disabled={executando || consulta.status === 'CONFIRMADA'}
                onClick={() => mudarStatus('CONFIRMADA')}
              >
                {executando ? 'Enviando...' : 'Confirmar presença'}
              </Button>
              <Button
                variante="secundario"
                disabled={executando || consulta.status === 'CANCELADA'}
                onClick={() => mudarStatus('CANCELADA')}
              >
                Cancelar consulta
              </Button>
              <Button variante="perigo" disabled={executando} onClick={remover}>
                Remover
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
