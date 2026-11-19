/** Cada validador devolve a mensagem de erro, ou '' quando o valor é válido. */

export function validarObrigatorio(valor: string, rotulo: string): string {
  return valor.trim() === '' ? `Informe ${rotulo}.` : ''
}

export function validarTamanhoMinimo(valor: string, minimo: number, rotulo: string): string {
  const vazio = validarObrigatorio(valor, rotulo)
  if (vazio) return vazio
  return valor.trim().length < minimo ? `${capitalizar(rotulo)} deve ter ao menos ${minimo} caracteres.` : ''
}

export function validarNome(valor: string): string {
  return validarTamanhoMinimo(valor, 3, 'o nome')
}

/** Telefone brasileiro com DDD: 10 ou 11 dígitos (aceita máscara). */
export function validarTelefone(valor: string): string {
  const vazio = validarObrigatorio(valor, 'o telefone')
  if (vazio) return vazio
  const digitos = valor.replace(/\D/g, '')
  return digitos.length === 10 || digitos.length === 11
    ? ''
    : 'Telefone inválido. Use DDD + número, por exemplo (11) 99999-9999.'
}

export function validarEmail(valor: string): string {
  const vazio = validarObrigatorio(valor, 'o e-mail')
  if (vazio) return vazio
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()) ? '' : 'E-mail inválido. Exemplo: nome@dominio.com.'
}

export function validarInteiroPositivo(valor: string, rotulo: string): string {
  const vazio = validarObrigatorio(valor, rotulo)
  if (vazio) return vazio
  const numero = Number(valor)
  return Number.isInteger(numero) && numero > 0 ? '' : `${capitalizar(rotulo)} deve ser um número inteiro positivo.`
}

/** Valida um valor de <input type="datetime-local"> e exige data futura. */
export function validarDataHoraFutura(valor: string): string {
  const vazio = validarObrigatorio(valor, 'a data e a hora')
  if (vazio) return vazio
  const data = new Date(valor)
  if (Number.isNaN(data.getTime())) return 'Data e hora inválidas.'
  return data.getTime() > Date.now() ? '' : 'Escolha uma data e hora no futuro.'
}

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}
