import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Button } from 'antd'

import styles from './MoviePage.module.css'
import { getMovie } from 'src/api'
import { useEffect, useState } from 'react'
import { Posters } from 'src/components/Posters/Posters'
import { Person, Movie } from 'src/types'
import { Reviews } from 'src/components/Reviews/Reviews'
import { ActorsInfo } from 'src/components/ActorsInfo/ActorsInfo'
import { MainPoster } from 'src/components/MainPoster/MainPoster'
import { MovieInfo } from 'src/components/MovieInfo/MovieInfo'
import { SimilarMovies } from 'src/components/SimilarMovies/SimilarMovies'
import { SeriesInfo } from 'src/components/SeriesInfo/SeriesInfo'

const { Text } = Typography

export const MoviePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie>()

  console.log(movie)

  useEffect(() => {
    if (!id) {
      navigate('/')
    } else {
      const fetchMovie = async () => {
        try {
          const movies = await getMovie(id)
          setMovie(movies)
        } catch {
          console.log('no movie')
        }
      }
      fetchMovie()
    }
  }, [id, navigate])

  const handleReturn = () => navigate(-1)

  const actors = movie?.persons.filter((person) => (person.profession = 'актеры')) as Person[]

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Text style={{ color: '#C5C5C5' }}>Авито.Кино</Text>
          <Button onClick={handleReturn}>Назад</Button>
        </div>

        <div className={styles.info}>
          <MainPoster image={movie?.poster.previewUrl} />

          <div className={styles.mainInfo}>
            <MovieInfo movie={movie} />

            <Posters />

            <Reviews />

            <SimilarMovies similarMovies={movie?.similarMovies} />
          </div>

          <div className={styles.additionalInfo}>
            <ActorsInfo actors={actors} />
            {movie?.isSeries ? <SeriesInfo /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
