import axios, { AxiosResponse } from 'axios'

import { FilterOption } from 'src/types'

import { baseURL, headers } from './constants'

interface PossibleValue {
  name: string
  slug: string
}

export const getPossibleValues = async (field: string): Promise<FilterOption[]> => {
  const response: AxiosResponse<PossibleValue[]> = await axios.get(`${baseURL}/v1/movie/possible-values-by-field`, {
    params: { field },
    headers,
  })

  return response.data.map((option) => ({ label: option.name, value: option.name }))
}
