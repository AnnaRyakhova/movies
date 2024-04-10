import axios from 'axios'
import { baseURL, headers } from './constants'

export const getReviews = async (id: string): Promise<any> => {
  const response = await axios.get(`${baseURL}/v1.4/review`, {
    params: {
      movieId: id,
    },
    headers,
  })

  return response.data.docs
}
