/** TODO: conferir os campos com a tabela de viagens do Oracle. */
export interface Viagem {
  idViagem: number
  idVan: number
  destino: string
  dataHoraSaida: string
}

/** Tabela associativa N:N entre paciente e viagem. */
export interface ReservaAssento {
  idPaciente: number
  idViagem: number
}
