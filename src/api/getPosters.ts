import axios from 'axios'
import { baseURL, headers } from './constants'

export const getPosters = async (id: string): Promise<any> => {
  const response = await axios.get(`${baseURL}/v1.4/image`, {
    params: {
      movieId: id,
    },
    headers,
  })

  return response.data.docs
}
