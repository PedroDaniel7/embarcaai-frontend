const PERGUNTAS = [
  {
    p: 'O que é o EmbarcaAí?',
    r: 'É um painel para a Secretaria Municipal de Saúde reduzir faltas em consultas com especialistas e aproveitar melhor os lugares nas vans da prefeitura.',
  },
  {
    p: 'Como o paciente confirma a consulta?',
    r: 'Um dia antes, ele recebe um lembrete no WhatsApp e responde "vou" ou "não vou". Não precisa instalar aplicativo.',
  },
  {
    p: 'O que acontece quando o paciente diz que não vai?',
    r: 'A vaga é liberada na hora e oferecida ao próximo paciente da fila de espera.',
  },
  {
    p: 'Como funciona a reserva na van?',
    r: 'Quem confirma presença e precisa de transporte garante um assento na viagem até o hospital da cidade maior.',
  },
  {
    p: 'Quem usa o painel?',
    r: 'A recepção da secretaria de saúde, que acompanha as consultas, os pacientes com maior chance de faltar e os lugares livres nas vans.',
  },
  {
    p: 'Como é calculada a chance de faltar?',
    r: 'Um modelo de classificação, desenvolvido na disciplina de Inteligência Artificial, estima o risco a partir de dados como idade, tempo de espera e lembretes enviados.',
  },
  {
    p: 'Os dados dos pacientes ficam seguros?',
    r: 'O projeto usa apenas os dados necessários para o atendimento e a comunicação com a API segue boas práticas de validação. Esta é uma versão acadêmica e não deve receber dados reais de pacientes.',
  },
  {
    p: 'Quais ODS o projeto atende?',
    r: 'ODS 3 (saúde e bem-estar), ODS 10 (redução das desigualdades) e ODS 11 (cidades e comunidades sustentáveis).',
  },
]

export default function Faq() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900">Perguntas frequentes</h1>
      <p className="mt-2 text-slate-700">Dúvidas comuns sobre o projeto EmbarcaAí.</p>
      <div className="mt-6 space-y-3">
        {PERGUNTAS.map((item) => (
          <details key={item.p} className="group rounded-xl border border-slate-200 bg-white p-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-slate-900">
              {item.p}
              <span aria-hidden="true" className="text-brand-600 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-slate-700">{item.r}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
