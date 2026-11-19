export interface Integrante {
  id: string
  nome: string
  rm: string
  papel: string
  /** Usuário do GitHub (sem a URL). */
  github: string
  /** URL completa do perfil no LinkedIn. */
  linkedin: string
  email: string
  /** Caminho da foto em public/membros. */
  foto: string
  descricao: string
}
