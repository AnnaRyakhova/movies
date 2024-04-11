import axios, { AxiosResponse } from 'axios'
import { baseURL, headers } from './constants'
import { Movie } from 'src/types'

export const getMovie = async (id: string): Promise<Movie> => {
  const response: AxiosResponse<Movie> = await axios.get(`${baseURL}/v1.4/movie/${id}`, { headers })
  return response.data
}
