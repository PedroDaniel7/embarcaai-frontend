/** GET /viagens/{id}/ocupacao. */
export interface OcupacaoViagem {
  viagemId: number
  capacidade: number
  ocupados: number
  livres: number
}
