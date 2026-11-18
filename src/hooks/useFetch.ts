import { useCallback, useEffect, useState } from 'react'

interface EstadoFetch<T> {
  dados: T | null
  carregando: boolean
  erro: string | null
  recarregar: () => void
}

/**
 * Executa uma função assíncrona (ex.: serviço da API) e expõe loading, erro e dados.
 * `deps` são valores que, ao mudar, refazem a busca (ex.: o id da rota).
 */
export function useFetch<T>(buscar: () => Promise<T>, deps: unknown[] = []): EstadoFetch<T> {
  const [dados, setDados] = useState<T | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let cancelado = false
    setCarregando(true)
    setErro(null)

    buscar()
      .then((resultado) => {
        if (!cancelado) setDados(resultado)
      })
      .catch((e: unknown) => {
        if (!cancelado) setErro(e instanceof Error ? e.message : 'Erro inesperado.')
      })
      .finally(() => {
        if (!cancelado) setCarregando(false)
      })

    return () => {
      cancelado = true
    }
    // `buscar` é recriado a cada render; o gatilho é a tentativa ("tentar de novo") e as deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tentativa, ...deps])

  const recarregar = useCallback(() => setTentativa((n) => n + 1), [])

  return { dados, carregando, erro, recarregar }
}
