import axios from 'axios'

export const getMovies = async (page: number, pageSize: number) => {
  const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie`, {
    params: {
      page: page,
      limit: pageSize,
    },
    headers: {
      'X-API-KEY': process.env.REACT_APP_API_KEY,
    },
  })

  return response.data.docs
}
