import type { Consulta, Lembrete, NovaConsulta, RespostaConsulta, Reserva } from '../types/consulta'
import { requisitar } from './api'
import { ENDPOINTS } from './endpoints'
import { dataHoraParaApi, extrairLista } from './mapeamento'

export async function listarConsultas(): Promise<Consulta[]> {
  return extrairLista<Consulta>(await requisitar<unknown>(ENDPOINTS.consultas))
}

export function buscarConsultaPorId(id: number | string): Promise<Consulta> {
  return requisitar<Consulta>(ENDPOINTS.consulta(id))
}

export function criarConsulta(consulta: NovaConsulta): Promise<Consulta> {
  return requisitar<Consulta>(ENDPOINTS.consultas, {
    method: 'POST',
    corpo: { ...consulta, dataHora: dataHoraParaApi(consulta.dataHora) },
  })
}

/** Registra a resposta do paciente ("Confirmar" ou "Cancelar"). */
export function responderConsulta(id: number | string, resposta: RespostaConsulta): Promise<unknown> {
  return requisitar<unknown>(ENDPOINTS.respostas(id), { method: 'POST', corpo: { resposta } })
}

export async function listarLembretes(id: number | string): Promise<Lembrete[]> {
  return extrairLista<Lembrete>(await requisitar<unknown>(ENDPOINTS.lembretes(id)))
}

export async function listarReservas(id: number | string): Promise<Reserva[]> {
  return extrairLista<Reserva>(await requisitar<unknown>(ENDPOINTS.reservas(id)))
}
