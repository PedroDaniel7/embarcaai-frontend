interface Opcao {
  valor: string
  rotulo: string
}

interface FormFieldProps {
  id: string
  rotulo: string
  valor: string
  onChange: (valor: string) => void
  onBlur?: () => void
  tipo?: string
  as?: 'input' | 'textarea' | 'select'
  opcoes?: Opcao[]
  erro?: string
  dica?: string
  obrigatorio?: boolean
  desabilitado?: boolean
  placeholder?: string
  autoComplete?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
  linhas?: number
}

const BASE =
  'mt-1 block min-h-11 w-full rounded-lg border bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-500 disabled:bg-slate-100'

/** Campo de formulário acessível: label ligado ao controle e erro anunciado por aria-live. */
export default function FormField({
  id,
  rotulo,
  valor,
  onChange,
  onBlur,
  tipo = 'text',
  as = 'input',
  opcoes = [],
  erro = '',
  dica,
  obrigatorio = false,
  desabilitado = false,
  placeholder,
  autoComplete,
  inputMode,
  linhas = 4,
}: FormFieldProps) {
  const idErro = `${id}-erro`
  const idDica = `${id}-dica`
  const descricao = [dica ? idDica : '', erro ? idErro : ''].filter(Boolean).join(' ') || undefined
  const classes = `${BASE} ${erro ? 'border-red-600' : 'border-slate-400'}`

  const comuns = {
    id,
    value: valor,
    onBlur,
    disabled: desabilitado,
    required: obrigatorio,
    'aria-invalid': erro ? true : undefined,
    'aria-describedby': descricao,
    className: classes,
  }

  return (
    <div>
      <label htmlFor={id} className="block text-base font-medium text-slate-800">
        {rotulo}
        {obrigatorio && (
          <span aria-hidden="true" className="text-red-700">
            {' '}
            *
          </span>
        )}
      </label>

      {as === 'textarea' ? (
        <textarea {...comuns} rows={linhas} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : as === 'select' ? (
        <select {...comuns} onChange={(e) => onChange(e.target.value)}>
          {opcoes.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.rotulo}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...comuns}
          type={tipo}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {dica && (
        <p id={idDica} className="mt-1 text-sm text-slate-600">
          {dica}
        </p>
      )}
      <p id={idErro} aria-live="polite" className="mt-1 min-h-5 text-sm font-medium text-red-700">
        {erro}
      </p>
    </div>
  )
}
