import Card from '../components/Card'

export default function Sobre() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Sobre o EmbarcaAí</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Projeto da Global Solution 2026/2 da FIAP, no tema CitizenTech: tecnologia com o cidadão no centro da inovação.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card titulo="O problema">
          <p className="text-slate-700">
            Muitas pessoas marcam consulta com especialista e faltam sem avisar. A vaga fica vazia e quem espera na fila
            continua esperando. Prefeituras como Passo Fundo (mais de 20% de faltas) e Bagé (que criou um "faltômetro") já
            divulgam esse problema. Em cidades pequenas, a van da prefeitura leva os pacientes ao hospital da cidade maior e
            muitas vezes viaja com lugares vagos.
          </p>
        </Card>
        <Card titulo="A solução">
          <p className="text-slate-700">
            O paciente recebe um lembrete no WhatsApp um dia antes e responde "vou" ou "não vou". Quem vai garante o lugar na
            van. Quem não vai libera a vaga na hora para o próximo da fila. A recepção da secretaria vê no painel quem tem
            mais chance de faltar e liga primeiro para essas pessoas.
          </p>
        </Card>
        <Card titulo="Quem usa">
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            <li>
              <strong>Recepção da Secretaria de Saúde:</strong> usa este painel.
            </li>
            <li>
              <strong>Paciente:</strong> usa apenas o WhatsApp, sem instalar nada, o que ajuda quem tem pouca conexão.
            </li>
          </ul>
          <p className="mt-3 text-slate-700">Quem paga é a secretaria municipal de saúde, que mede o ganho em menos faltas, mais vagas aproveitadas e vans mais cheias.</p>
        </Card>
        <Card titulo="ODS relacionados">
          <ul className="space-y-2 text-slate-700">
            <li>
              <strong>ODS 3 · Saúde e bem-estar:</strong> mais pessoas atendidas com consultas aproveitadas.
            </li>
            <li>
              <strong>ODS 10 · Redução das desigualdades:</strong> transporte para quem mora longe do atendimento.
            </li>
            <li>
              <strong>ODS 11 · Cidades e comunidades sustentáveis:</strong> melhor uso dos recursos públicos.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
