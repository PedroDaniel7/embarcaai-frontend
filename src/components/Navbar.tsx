import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/', rotulo: 'Início', fim: true },
  { to: '/consultas', rotulo: 'Consultas', fim: true },
  { to: '/consultas/nova', rotulo: 'Nova consulta', fim: true },
  { to: '/sobre', rotulo: 'Sobre', fim: false },
  { to: '/integrantes', rotulo: 'Integrantes', fim: false },
  { to: '/faq', rotulo: 'FAQ', fim: false },
  { to: '/contato', rotulo: 'Contato', fim: false },
]

export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const { pathname } = useLocation()

  // Fecha o menu mobile ao navegar para outra rota.
  useEffect(() => {
    setAberto(false)
  }, [pathname])

  const classeLink = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-3 text-base font-medium lg:py-2 ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
    }`

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <nav aria-label="Principal" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="inline-flex items-center" aria-label="EmbarcaAí, página inicial">
          <img src="/logo.png" alt="Logo EmbarcaAí" width={173} height={58} className="h-10 w-auto sm:h-12" />
        </Link>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-slate-800 ring-1 ring-slate-300 lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-principal"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <ul
          id="menu-principal"
          className={`${
            aberto ? 'block' : 'hidden'
          } absolute inset-x-0 top-full border-b border-slate-200 bg-white px-4 pb-3 shadow-md lg:static lg:flex lg:items-center lg:gap-1 lg:border-0 lg:p-0 lg:shadow-none`}
        >
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.fim} className={classeLink}>
                {l.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
