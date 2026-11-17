import Button from '../components/Button'
import Card from '../components/Card'

const PASSOS = [
  { titulo: 'Lembrete no WhatsApp', texto: 'Um dia antes, o paciente recebe a mensagem e responde "vou" ou "não vou". Sem instalar nada.' },
  { titulo: 'Vaga reaproveitada', texto: 'Se o paciente não vai, a vaga vai na hora para o próximo da fila de espera.' },
  { titulo: 'Van mais cheia', texto: 'Quem vai garante o lugar na van da prefeitura, e a recepção acompanha os assentos livres.' },
]

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-brand-900 px-6 py-10 text-white md:px-12 md:py-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">CitizenTech · Saúde</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
          Menos faltas em consultas, mais vagas e vans aproveitadas.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-100">
          Painel para a Secretaria Municipal de Saúde acompanhar consultas com especialistas, confirmar presença e
          organizar o transporte dos pacientes.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button to="/consultas" className="bg-white !text-brand-900 hover:!bg-brand-50">
            Ver consultas
          </Button>
          <Button to="/consultas/nova" variante="secundario">
            Registrar consulta
          </Button>
        </div>
      </section>

      <section aria-labelledby="como-funciona">
        <h2 id="como-funciona" className="text-2xl font-bold text-slate-900">
          Como funciona
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {PASSOS.map((p, i) => (
            <Card key={p.titulo}>
              <p className="text-sm font-bold text-brand-600">Passo {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{p.titulo}</h3>
              <p className="mt-2 text-slate-700">{p.texto}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="impacto">
        <h2 id="impacto" className="text-2xl font-bold text-slate-900">
          O problema que queremos reduzir
        </h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Muita gente marca consulta com especialista e não comparece sem avisar. A vaga fica vazia e quem espera na fila
          continua esperando. Em cidades pequenas, a van da prefeitura leva os pacientes ao hospital da cidade maior e muitas
          vezes viaja com lugares sobrando.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {['ODS 3 · Saúde e bem-estar', 'ODS 10 · Redução das desigualdades', 'ODS 11 · Comunidades sustentáveis'].map((o) => (
            <span key={o} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
              {o}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
