/** GET /pacientes. zonaRural: "S" ou "N". */
export interface Paciente {
  id: number
  nome: string
  telefone: string
  dataNascimento: string
  zonaRural: 'S' | 'N'
}
