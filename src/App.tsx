import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ConsultaDetalhe from './pages/ConsultaDetalhe'
import ConsultaNova from './pages/ConsultaNova'
import Consultas from './pages/Consultas'
import Contato from './pages/Contato'
import Faq from './pages/Faq'
import Home from './pages/Home'
import IntegranteDetalhe from './pages/IntegranteDetalhe'
import Integrantes from './pages/Integrantes'
import NotFound from './pages/NotFound'
import Sobre from './pages/Sobre'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/integrantes/:id" element={<IntegranteDetalhe />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/consultas/nova" element={<ConsultaNova />} />
        <Route path="/consultas/:id" element={<ConsultaDetalhe />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
