import Button from './Button'

interface ErrorMessageProps {
  mensagem: string
  /** Quando informado, mostra o botão "Tentar de novo". */
  onTentarNovamente?: () => void
}

export default function ErrorMessage({ mensagem, onTentarNovamente }: ErrorMessageProps) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-900">
      <p className="font-semibold">Não foi possível concluir a operação</p>
      <p className="mt-1 break-words">{mensagem}</p>
      {onTentarNovamente && (
        <Button variante="secundario" className="mt-4" onClick={onTentarNovamente}>
          Tentar de novo
        </Button>
      )}
    </div>
  )
}
