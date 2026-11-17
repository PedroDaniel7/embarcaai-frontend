import { ESTILO_CAMPOS_API } from './endpoints'

/** Conversão de nomes de campos entre a API (snake_case ou camelCase) e o front (camelCase). */

const paraCamelCase = (chave: string): string =>
  chave.replace(/_([a-z0-9])/g, (_, letra: string) => letra.toUpperCase())

const paraSnakeCase = (chave: string): string =>
  chave.replace(/([A-Z])/g, (letra) => `_${letra.toLowerCase()}`)

function converterChaves(valor: unknown, converter: (chave: string) => string): unknown {
  if (Array.isArray(valor)) return valor.map((item) => converterChaves(item, converter))
  if (valor !== null && typeof valor === 'object') {
    return Object.fromEntries(
      Object.entries(valor as Record<string, unknown>).map(([chave, v]) => [
        converter(chave),
        converterChaves(v, converter),
      ]),
    )
  }
  return valor
}

/** Resposta da API -> formato do front (camelCase). Não altera quem já vem em camelCase. */
export function normalizarResposta<T>(dados: unknown): T {
  return converterChaves(dados, paraCamelCase) as T
}

/** Corpo do front (camelCase) -> formato esperado pela API. */
export function prepararEnvio(dados: unknown): unknown {
  return ESTILO_CAMPOS_API === 'snake' ? converterChaves(dados, paraSnakeCase) : dados
}

/** Aceita lista pura ou paginada ({ content: [...] }) e devolve sempre um array. */
export function extrairLista<T>(dados: unknown): T[] {
  if (Array.isArray(dados)) return dados as T[]
  if (dados && typeof dados === 'object') {
    const { content } = dados as { content?: unknown }
    if (Array.isArray(content)) return content as T[]
  }
  return []
}

/** "2026-11-20T14:30" (input datetime-local) -> "2026-11-20T14:30:00" (LocalDateTime do Java). */
export function dataHoraParaApi(valor: string): string {
  return valor.length === 16 ? `${valor}:00` : valor
}
