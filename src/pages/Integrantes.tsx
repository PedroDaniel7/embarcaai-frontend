import { Link } from 'react-router-dom'
import Card from '../components/Card'
import FotoIntegrante from '../components/FotoIntegrante'
import { INTEGRANTES, TURMA } from '../data/integrantes'

export default function Integrantes() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Integrantes</h1>
      <p className="mt-2 text-slate-700">Turma {TURMA} · Análise e Desenvolvimento de Sistemas · FIAP</p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRANTES.map((i) => (
          <li key={i.id}>
            <Card className="flex h-full flex-col items-start">
              <FotoIntegrante integrante={i} tamanho={96} />
              <h2 className="mt-3 break-words text-lg font-semibold text-slate-900">{i.nome}</h2>
              <p className="text-sm text-slate-600">RM {i.rm}</p>
              <p className="mt-2 break-words text-slate-700">{i.papel}</p>
              <Link to={`/integrantes/${i.id}`} className="mt-auto inline-flex min-h-11 items-center pt-3 font-semibold text-brand-700 underline">
                Ver perfil
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
