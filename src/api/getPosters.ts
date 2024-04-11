import axios, { AxiosResponse } from 'axios'
import { baseURL, headers } from './constants'
import { ResponseData } from 'src/types'

export const getPosters = async (id: string): Promise<any> => {
  const response: AxiosResponse<ResponseData<any>> = await axios.get(`${baseURL}/v1.4/image`, {
    params: {
      movieId: id,
    },
    headers,
  })

  return response.data.docs
}
