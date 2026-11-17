import { API_URL } from './endpoints'
import { normalizarResposta, prepararEnvio } from './mapeamento'

/** Erro de requisição com o status HTTP (0 = sem conexão/configuração). */
export class ApiError extends Error {
  status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
  }
}

const MENSAGENS_POR_STATUS: Record<number, string> = {
  400: 'Os dados enviados são inválidos. Confira os campos e tente novamente.',
  404: 'Registro não encontrado.',
  405: 'Operação não permitida pela API.',
  409: 'A operação conflita com uma regra do sistema (ex.: horário ocupado ou registro com vínculos).',
  500: 'Erro interno no servidor. Tente novamente em instantes.',
}

async function mensagemDeErro(res: Response): Promise<string> {
  try {
    const corpo: unknown = await res.json()
    if (corpo && typeof corpo === 'object') {
      const { mensagem, message, erro } = corpo as Record<string, unknown>
      const texto = mensagem ?? message ?? erro
      if (typeof texto === 'string' && texto.trim() !== '') return texto
    }
  } catch {
    // corpo vazio ou que não é JSON: usa a mensagem padrão do status
  }
  return MENSAGENS_POR_STATUS[res.status] ?? `Falha na requisição (HTTP ${res.status}).`
}

interface OpcoesRequisicao {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  corpo?: unknown
}

/** Função genérica de Fetch API: trata res.ok, JSON, 204 e erros de rede. */
export async function requisitar<T>(
  caminho: string,
  { method = 'GET', corpo }: OpcoesRequisicao = {},
): Promise<T> {
  if (!API_URL) {
    throw new ApiError('A URL da API não está configurada (defina VITE_API_URL).', 0)
  }

  let res: Response
  try {
    res = await fetch(`${API_URL}${caminho}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(corpo !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: corpo !== undefined ? JSON.stringify(prepararEnvio(corpo)) : undefined,
    })
  } catch {
    throw new ApiError('Não foi possível conectar à API. Verifique sua conexão e tente novamente.', 0)
  }

  if (!res.ok) throw new ApiError(await mensagemDeErro(res), res.status)
  if (res.status === 204) return undefined as T

  const texto = await res.text()
  if (texto === '') return undefined as T

  try {
    return normalizarResposta<T>(JSON.parse(texto))
  } catch {
    throw new ApiError('A API devolveu uma resposta que não é JSON válido.', res.status)
  }
}
