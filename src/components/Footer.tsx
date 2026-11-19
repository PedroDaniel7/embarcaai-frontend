import { Link } from 'react-router-dom'
import { TURMA } from '../data/integrantes'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo EmbarcaAí" width={130} height={43} className="h-9 w-auto" />
          <p>
            Global Solution 2026/2 FIAP · CitizenTech · Turma {TURMA}
          </p>
        </div>
        <p>ODS 3 · ODS 10 · ODS 11</p>
        <p className="flex gap-4">
          <Link to="/faq" className="inline-flex min-h-11 items-center underline hover:text-brand-700">
            FAQ
          </Link>
          <Link to="/contato" className="inline-flex min-h-11 items-center underline hover:text-brand-700">
            Contato
          </Link>
        </p>
      </div>
    </footer>
  )
}
