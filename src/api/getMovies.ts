import axios, { AxiosResponse } from 'axios'
import { Filters, Movie, ResponseData } from 'src/types'

import { baseURL, headers } from './constants'

export const getMovies = async (filters: Filters): Promise<ResponseData<Movie>> => {
  const { page, pageSize, country, year, ageRating } = filters

  const response: AxiosResponse<ResponseData<Movie>> = await axios.get(`${baseURL}/v1.4/movie`, {
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
