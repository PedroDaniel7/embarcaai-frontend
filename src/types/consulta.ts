export type StatusConsulta = 'AGENDADA' | 'CONFIRMADA' | 'CANCELADA' | 'REALIZADA' | 'FALTOU'

export const STATUS_CONSULTA: StatusConsulta[] = [
  'AGENDADA',
  'CONFIRMADA',
  'CANCELADA',
  'REALIZADA',
  'FALTOU',
]

export type PrecisaTransporte = 'S' | 'N'

/** Consulta como o front usa (camelCase). A API pode devolver snake_case: veja services/mapeamento.ts. */
export interface Consulta {
  idConsulta: number
  idPaciente: number
  idUnidade: number
  especialidade: string
  dataHora: string
  precisaTransporte: PrecisaTransporte
  status: StatusConsulta
}

/** Dados enviados ao cadastrar uma consulta (o id é gerado pela API). */
export type NovaConsulta = Omit<Consulta, 'idConsulta' | 'status'> & {
  status?: StatusConsulta
}
