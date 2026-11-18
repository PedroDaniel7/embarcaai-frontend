import type { Paciente } from '../types/paciente'
import { requisitar } from './api'
import { ENDPOINTS } from './endpoints'
import { extrairLista } from './mapeamento'

export async function listarPacientes(): Promise<Paciente[]> {
  return extrairLista<Paciente>(await requisitar<unknown>(ENDPOINTS.pacientes))
}
