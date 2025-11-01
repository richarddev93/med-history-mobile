import { useState } from 'react'
import { peoplesApi } from '../data/peoples.api'
import { CreatePersonData } from '@/schemas/peoples.schema'

export function usePeopleVM() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addPerson = async (data: CreatePersonData) => {
    try {
      setLoading(true)
      setError(null)
      const result = await peoplesApi.create(data)
      return result
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message)
      else setError('Erro desconhecido ao adicionar pessoa')
    } finally {
      setLoading(false)
    }
  }

  return { addPerson, loading, error }
}