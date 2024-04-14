import axios, { AxiosResponse } from 'axios'

import { ResponseData, Review } from 'src/types'

import { baseURL, headers } from './constants'

export const getReviews = async (id: string): Promise<Review[]> => {
  const response: AxiosResponse<ResponseData<Review>> = await axios.get(`${baseURL}/v1.4/review`, {
    params: {
      movieId: id,
    },
    headers,
  })

  return response.data.docs
}
