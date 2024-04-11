import axios, { AxiosResponse } from 'axios'

import { baseURL, headers } from './constants'
import { Movie, ResponseData } from 'src/types'

export const getMoviesByName = async (search: string, page = 1, limit = 10) => {
  const response = await axios.get(`${baseURL}/v1.4/movie/search`, {
    params: {
      query: search,
      page,
      limit,
    },
    headers,
  })
  return response.data
}
