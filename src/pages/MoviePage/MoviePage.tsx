import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Button, Spin } from 'antd'
import { toast } from 'sonner'

import { getMovie } from 'src/api'
import { Posters } from 'src/components/Posters/Posters'
import { Movie } from 'src/types'
import { Reviews } from 'src/components/Reviews/Reviews'
import { MovieInfo } from 'src/components/MovieInfo/MovieInfo'
import { SimilarMovies } from 'src/components/SimilarMovies/SimilarMovies'

import styles from './MoviePage.module.css'

const { Text } = Typography

export const MoviePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) {
      navigate('/')
    } else {
      const fetchMovie = async () => {
        try {
          setLoading(true)
          const movies = await getMovie(id)
          setMovie(movies)
        } catch {
          toast.error('Не удалось загрузить фильм')
        } finally {
          setLoading(false)
        }
      }
      fetchMovie()
    }
  }, [id, navigate])

  const handleReturn = () => navigate(-1)

  const renderInfo = () => {
    if (loading) {
      return <Spin />
    }

    if (!movie) {
      return null
    }

    return (
      <div className={styles.movieInfo}>
        <MovieInfo movie={movie} />

        <Posters />

        <Reviews />

        <SimilarMovies similarMovies={movie?.similarMovies} />
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Text style={{ color: '#C5C5C5' }}>Авито.Кино</Text>
          <Button onClick={handleReturn}>Назад</Button>
        </div>

        {renderInfo()}
      </div>
    </div>
  )
}
