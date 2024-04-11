import axios, { AxiosResponse } from 'axios'
import { ResponseData, Season } from 'src/types'
import { baseURL, headers } from './constants'

export const getSeasons = async (id: string): Promise<Season[]> => {
  const response: AxiosResponse<ResponseData<Season>> = await axios.get(`${baseURL}/v1.4/season`, {
    params: {
      movieId: id,
    },
    headers,
  })

  return response.data.docs
}
