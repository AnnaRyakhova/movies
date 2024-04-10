import axios from 'axios'
import { baseURL, headers } from './constants'

export const getSeasons = async (id: string): Promise<any> => {
  const response = await axios.get(`${baseURL}/v1.4/season`, {
    params: {
      movieId: id,
    },
    headers,
  })

  return response.data.docs
}
