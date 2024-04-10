import axios from 'axios'
import { baseURL, headers } from './constants'

export const getMoviesByName = async (search: string): Promise<any> => {
  const response = await axios.get(`${baseURL}/v1.4/movie/search`, {
    params: {
      query: search,
    },
    headers,
  })

  return response.data.docs
}
