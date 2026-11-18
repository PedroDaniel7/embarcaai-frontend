/**
 * ÚNICO lugar com a configuração do contrato da API Java.
 * Se um caminho mudar, ajuste somente este arquivo.
 */

/** URL base da API. Vem de VITE_API_URL (veja .env.example); sem ela, usa a API local. */
export const API_URL: string = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/+$/, '')

/**
 * A API Java devolve e recebe JSON em camelCase (dataHora, pacienteId).
 * Se algum dia vier snake_case, troque para 'snake': a conversão fica em services/mapeamento.ts.
 */
export const ESTILO_CAMPOS_API: 'snake' | 'camel' = 'camel'

export const ENDPOINTS = {
  consultas: '/consultas',
  consulta: (id: number | string) => `/consultas/${id}`,
  respostas: (id: number | string) => `/consultas/${id}/respostas`,
  lembretes: (id: number | string) => `/consultas/${id}/lembretes`,
  reservas: (id: number | string) => `/consultas/${id}/reservas`,
  pacientes: '/pacientes',
  unidades: '/unidades',
} as const
