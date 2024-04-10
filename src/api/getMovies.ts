import axios from 'axios'
import { Filters, Movie } from 'src/types'
import { baseURL, headers } from './constants'

interface Payload {
  page: number
  pageSize: number
  filters: Filters
}

export const getMovies = async (payload: Payload): Promise<Movie[]> => {
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

  return response.data.docs
}