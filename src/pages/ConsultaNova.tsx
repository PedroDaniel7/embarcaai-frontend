import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import ErrorMessage from '../components/ErrorMessage'
import FormField from '../components/FormField'
import Loading from '../components/Loading'
import { useFetch } from '../hooks/useFetch'
import { criarConsulta } from '../services/consultas'
import { listarPacientes } from '../services/pacientes'
import { listarUnidades } from '../services/unidades'
import type { PrecisaTransporte } from '../types/consulta'
import { validarDataHoraFutura, validarObrigatorio, validarTamanhoMinimo } from '../utils/validacao'

interface Campos {
  pacienteId: string
  unidadeId: string
  especialidade: string
  dataHora: string
  precisaTransporte: PrecisaTransporte
}

type Erros = Partial<Record<keyof Campos, string>>

const INICIAL: Campos = { pacienteId: '', unidadeId: '', especialidade: '', dataHora: '', precisaTransporte: 'N' }

function validar(c: Campos): Erros {
  const erros: Erros = {
    pacienteId: validarObrigatorio(c.pacienteId, 'o paciente'),
    unidadeId: validarObrigatorio(c.unidadeId, 'a unidade'),
    especialidade: validarTamanhoMinimo(c.especialidade, 3, 'a especialidade'),
    dataHora: validarDataHoraFutura(c.dataHora),
  }
  return Object.fromEntries(Object.entries(erros).filter(([, msg]) => msg)) as Erros
}

export default function ConsultaNova() {
  // Pacientes e unidades vêm da API para preencher os selects.
  const opcoesApi = useFetch(() => Promise.all([listarPacientes(), listarUnidades()]))
  const [campos, setCampos] = useState<Campos>(INICIAL)
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [sucesso, setSucesso] = useState<string | null>(null)
  const [falha, setFalha] = useState<string | null>(null)

  const [pacientes, unidades] = opcoesApi.dados ?? [[], []]

  const alterar = <K extends keyof Campos>(campo: K, valor: Campos[K]) => {
    setCampos((atual) => ({ ...atual, [campo]: valor }))
    if (erros[campo]) setErros((atual) => ({ ...atual, [campo]: '' }))
  }

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setSucesso(null)
    setFalha(null)

    const novosErros = validar(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    setEnviando(true)
    try {
      const criada = await criarConsulta({
        pacienteId: Number(campos.pacienteId),
        unidadeId: Number(campos.unidadeId),
        especialidade: campos.especialidade.trim(),
        dataHora: campos.dataHora,
        precisaTransporte: campos.precisaTransporte,
        status: 'AGENDADA',
      })
      setSucesso(criada?.id ? `Consulta nº ${criada.id} registrada com sucesso.` : 'Consulta registrada com sucesso.')
      setCampos(INICIAL)
    } catch (err) {
      setFalha(err instanceof Error ? err.message : 'Erro inesperado ao registrar a consulta.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold text-slate-900">Registrar consulta</h1>
      <p className="mt-1 text-slate-600">Cadastre a consulta e informe se o paciente precisa de lugar na van. Campos com * são obrigatórios.</p>

      {opcoesApi.carregando && <Loading mensagem="Carregando pacientes e unidades..." />}
      {!opcoesApi.carregando && opcoesApi.erro && (
        <div className="mt-6">
          <ErrorMessage mensagem={opcoesApi.erro} onTentarNovamente={opcoesApi.recarregar} />
        </div>
      )}

      {!opcoesApi.carregando && !opcoesApi.erro && (
        <form onSubmit={enviar} noValidate className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div aria-live="polite">
            {sucesso && (
              <div role="status" className="mb-4 rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-emerald-900">
                {sucesso}{' '}
                <Link to="/consultas" className="font-semibold underline">
                  Ver consultas
                </Link>
              </div>
            )}
            {falha && (
              <div role="alert" className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-red-900">
                Falha ao registrar: {falha}
              </div>
            )}
          </div>

          <FormField
            id="pacienteId"
            rotulo="Paciente"
            as="select"
            obrigatorio
            opcoes={[
              { valor: '', rotulo: 'Selecione o paciente' },
              ...pacientes.map((p) => ({ valor: String(p.id), rotulo: p.nome })),
            ]}
            valor={campos.pacienteId}
            onChange={(v) => alterar('pacienteId', v)}
            erro={erros.pacienteId}
            desabilitado={enviando}
          />
          <FormField
            id="unidadeId"
            rotulo="Unidade de saúde"
            as="select"
            obrigatorio
            opcoes={[
              { valor: '', rotulo: 'Selecione a unidade' },
              ...unidades.map((u) => ({ valor: String(u.id), rotulo: `${u.nome} (${u.cidade})` })),
            ]}
            valor={campos.unidadeId}
            onChange={(v) => alterar('unidadeId', v)}
            erro={erros.unidadeId}
            desabilitado={enviando}
          />
          <FormField
            id="especialidade"
            rotulo="Especialidade"
            obrigatorio
            placeholder="Ex.: Cardiologia"
            valor={campos.especialidade}
            onChange={(v) => alterar('especialidade', v)}
            erro={erros.especialidade}
            desabilitado={enviando}
          />
          <FormField
            id="dataHora"
            rotulo="Data e hora da consulta"
            tipo="datetime-local"
            obrigatorio
            valor={campos.dataHora}
            onChange={(v) => alterar('dataHora', v)}
            erro={erros.dataHora}
            desabilitado={enviando}
          />
          <FormField
            id="precisaTransporte"
            rotulo="Precisa de lugar na van?"
            as="select"
            opcoes={[
              { valor: 'N', rotulo: 'Não' },
              { valor: 'S', rotulo: 'Sim' },
            ]}
            valor={campos.precisaTransporte}
            onChange={(v) => alterar('precisaTransporte', v as PrecisaTransporte)}
            desabilitado={enviando}
          />

          <Button type="submit" disabled={enviando} className="mt-2 w-full sm:w-auto">
            {enviando ? 'Enviando...' : 'Registrar consulta'}
          </Button>
        </form>
      )}
    </div>
  )
}
