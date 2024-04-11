import axios, { AxiosResponse } from 'axios'
import { Filters, Movie, ResponseData } from 'src/types'
import { baseURL, headers } from './constants'

interface Payload {
  page: number
  pageSize: number
  filters: Filters
}

export const getMovies = async (payload: Payload) => {
  const { page, pageSize, filters } = payload
  const { country, year, ageRating } = filters

  const response = await axios.get(`${baseURL}/v1.4/movie`, {
    params: {
      page,
      limit: pageSize,
      'countries.name': country,
      year,
      ageRating,
    },
    headers,
  })

  return response.data
}
