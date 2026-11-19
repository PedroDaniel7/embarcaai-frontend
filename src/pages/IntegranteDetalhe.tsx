import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import FotoIntegrante from '../components/FotoIntegrante'
import LinksIntegrante from '../components/LinksIntegrante'
import { INTEGRANTES, TURMA } from '../data/integrantes'

export default function IntegranteDetalhe() {
  const { id } = useParams()
  const integrante = INTEGRANTES.find((i) => i.id === id)

  if (!integrante) {
    return (
      <EmptyState
        titulo="Integrante não encontrado"
        descricao="Confira o endereço ou volte para a lista de integrantes."
        acao={<Button to="/integrantes">Ver integrantes</Button>}
      />
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/integrantes" className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline">
        ← Voltar para integrantes
      </Link>
      <Card className="mt-2">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <FotoIntegrante integrante={integrante} tamanho={128} />
          <div className="min-w-0">
            <h1 className="break-words text-2xl font-bold text-slate-900">{integrante.nome}</h1>
            <p className="text-slate-600">RM {integrante.rm} · Turma {TURMA}</p>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
          <dt className="text-slate-600">Papel</dt>
          <dd className="break-words font-medium">{integrante.papel}</dd>
          <dt className="text-slate-600">Contatos</dt>
          <dd>
            <LinksIntegrante integrante={integrante} />
          </dd>
        </dl>
        <p className="mt-4 text-slate-700">{integrante.descricao}</p>
      </Card>
    </div>
  )
}
