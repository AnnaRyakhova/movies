import axios, { AxiosResponse } from 'axios'

import { Poster, ResponseData } from 'src/types'

import { baseURL, headers } from './constants'

export const getPosters = async (id: string): Promise<Poster[]> => {
  const response: AxiosResponse<ResponseData<Poster>> = await axios.get(`${baseURL}/v1.4/image`, {
    params: {
      movieId: id,
    },
    headers,
  })

  return response.data.docs
}
