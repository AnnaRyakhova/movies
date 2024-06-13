import axios, { AxiosResponse } from 'axios'

import { Movie, ResponseData } from 'src/types'

import { baseURL, headers } from './constants'

export const getMoviesByName = async (
  search: string | null | undefined,
  page: number | null | undefined = 1,
  limit: number | null | undefined = 10,
): Promise<ResponseData<Movie>> => {
  const response: AxiosResponse<ResponseData<Movie>> = await axios.get(`${baseURL}/v1.4/movie/search`, {
    params: {
      query: search,
      page,
      limit,
    },
    headers,
  })
  return response.data
}
