export type StatusConsulta = 'AGENDADA' | 'CONFIRMADA' | 'CANCELADA' | 'REALIZADA' | 'FALTOU'

export const STATUS_CONSULTA: StatusConsulta[] = [
  'AGENDADA',
  'CONFIRMADA',
  'CANCELADA',
  'REALIZADA',
  'FALTOU',
]

export type PrecisaTransporte = 'S' | 'N'

/** Consulta como a API Java devolve (GET /consultas). */
export interface Consulta {
  id: number
  pacienteId: number
  unidadeId: number
  especialidade: string
  dataHora: string
  precisaTransporte: PrecisaTransporte
  status: StatusConsulta
}

/** Corpo do POST /consultas (o id é gerado pela API). */
export type NovaConsulta = Omit<Consulta, 'id'>

/** Resposta do paciente ao lembrete (POST /consultas/{id}/respostas). */
export type RespostaConsulta = 'CONFIRMOU' | 'CANCELOU'

/** GET /consultas/{id}/lembretes. A resposta fica vazia até o paciente responder. */
export interface Lembrete {
  id: number
  consultaId: number
  dataEnvio: string
  resposta: RespostaConsulta | null
}

/** GET /consultas/{id}/reservas: lugar do paciente em uma viagem da van. */
export interface Reserva {
  id: number
  consultaId: number
  viagemId: number
  statusTransporte: string
}
