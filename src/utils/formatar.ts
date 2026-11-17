import type { PrecisaTransporte, StatusConsulta } from '../types/consulta'

export function formatarDataHora(valor: string): string {
  const data = new Date(valor)
  if (Number.isNaN(data.getTime())) return valor
  return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

export const ROTULO_STATUS: Record<StatusConsulta, string> = {
  AGENDADA: 'Agendada',
  CONFIRMADA: 'Confirmada',
  CANCELADA: 'Cancelada',
  REALIZADA: 'Realizada',
  FALTOU: 'Faltou',
}

export function rotuloTransporte(valor: PrecisaTransporte): string {
  return valor === 'S' ? 'Sim' : 'Não'
}
