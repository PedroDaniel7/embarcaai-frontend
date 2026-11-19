import { useState, type FormEvent } from 'react'
import Button from '../components/Button'
import FormField from '../components/FormField'
import LinksIntegrante from '../components/LinksIntegrante'
import { INTEGRANTES } from '../data/integrantes'
import type { MensagemContato } from '../types/contato'
import { validarEmail, validarNome, validarTamanhoMinimo, validarTelefone } from '../utils/validacao'

type Erros = Partial<Record<keyof MensagemContato, string>>

const INICIAL: MensagemContato = { nome: '', telefone: '', email: '', mensagem: '' }

function validar(c: MensagemContato): Erros {
  const erros: Erros = {
    nome: validarNome(c.nome),
    telefone: validarTelefone(c.telefone),
    email: validarEmail(c.email),
    mensagem: validarTamanhoMinimo(c.mensagem, 10, 'a mensagem'),
  }
  return Object.fromEntries(Object.entries(erros).filter(([, msg]) => msg)) as Erros
}

export default function Contato() {
  const [campos, setCampos] = useState<MensagemContato>(INICIAL)
  const [erros, setErros] = useState<Erros>({})
  const [sucesso, setSucesso] = useState(false)

  const alterar = (campo: keyof MensagemContato, valor: string) => {
    setCampos((atual) => ({ ...atual, [campo]: valor }))
    if (erros[campo]) setErros((atual) => ({ ...atual, [campo]: '' }))
  }

  function enviar(e: FormEvent) {
    e.preventDefault()
    setSucesso(false)

    const novosErros = validar(campos)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    // Formulário demonstrativo: a API não tem endpoint de contato, então nada é enviado.
    setSucesso(true)
    setCampos(INICIAL)
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Contato</h1>
        <p className="mt-1 text-slate-600">Envie uma dúvida ou sugestão para a equipe do EmbarcaAí. Campos com * são obrigatórios.</p>

        <form onSubmit={enviar} noValidate className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div aria-live="polite">
            {sucesso && (
              <p role="status" className="mb-4 rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-emerald-900">
                Mensagem validada. Este formulário é demonstrativo e não envia dados a um servidor. Para falar com a
                equipe, use os contatos ao lado.
              </p>
            )}
          </div>

          <FormField id="nome" rotulo="Nome completo" obrigatorio autoComplete="name" valor={campos.nome} onChange={(v) => alterar('nome', v)} erro={erros.nome} />
          <FormField
            id="telefone"
            rotulo="Telefone"
            tipo="tel"
            inputMode="tel"
            obrigatorio
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            valor={campos.telefone}
            onChange={(v) => alterar('telefone', v)}
            erro={erros.telefone}
          />
          <FormField id="email" rotulo="E-mail" tipo="email" inputMode="email" obrigatorio autoComplete="email" valor={campos.email} onChange={(v) => alterar('email', v)} erro={erros.email} />
          <FormField
            id="mensagem"
            rotulo="Mensagem"
            as="textarea"
            obrigatorio
            dica="Mínimo de 10 caracteres."
            valor={campos.mensagem}
            onChange={(v) => alterar('mensagem', v)}
            erro={erros.mensagem}
          />

          <Button type="submit" className="mt-2 w-full sm:w-auto">
            Enviar mensagem
          </Button>
        </form>
      </div>

      <aside aria-labelledby="titulo-equipe" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:self-start">
        <h2 id="titulo-equipe" className="text-xl font-bold text-slate-900">
          Fale com a equipe
        </h2>
        <ul className="mt-3 divide-y divide-slate-200">
          {INTEGRANTES.map((i) => (
            <li key={i.id} className="py-3">
              <p className="break-words font-semibold text-slate-900">{i.nome}</p>
              <LinksIntegrante integrante={i} />
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
