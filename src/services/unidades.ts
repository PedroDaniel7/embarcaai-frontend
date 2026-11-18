import type { UnidadeSaude } from '../types/unidade'
import { requisitar } from './api'
import { ENDPOINTS } from './endpoints'
import { extrairLista } from './mapeamento'

export async function listarUnidades(): Promise<UnidadeSaude[]> {
  return extrairLista<UnidadeSaude>(await requisitar<unknown>(ENDPOINTS.unidades))
}
