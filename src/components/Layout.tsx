import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  const { pathname } = useLocation()

  // Volta ao topo a cada troca de rota.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-30 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Ir para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
