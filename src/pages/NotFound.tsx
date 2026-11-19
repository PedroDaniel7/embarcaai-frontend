import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Página não encontrada</h1>
      <p className="mt-2 text-slate-600">O endereço acessado não existe ou foi movido.</p>
      <div className="mt-6 flex justify-center">
        <Button to="/">Voltar para o início</Button>
      </div>
    </div>
  )
}
