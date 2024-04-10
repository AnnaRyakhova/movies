import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Pagination, Spin, Button, Carousel } from 'antd'

import styles from './MoviePage.module.css'
import { getMovie } from 'src/api'
import { useEffect, useState } from 'react'
import { Posters } from 'src/components/Posters/Posters'
import { Person, Movie, Season, Review } from 'src/types'
import { Reviews } from 'src/components/Reviews/Reviews'
import { AdditionalInfo } from 'src/components/AdditionalInfo/AdditionalInfo'
import { getSeasons } from 'src/api/getSeasons'
import { getReviews } from 'src/api/getReviews'
import { getPosters } from 'src/api/getPosters'
import { MainPoster } from 'src/components/MainPoster/MainPoster'
import { MovieInfo } from 'src/components/MovieInfo/MovieInfo'

const { Text, Title } = Typography

export const MoviePage = () => {
  const params = useParams()
  const id = params?.id
  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie>()
  const [seasons, setSeasons] = useState([])
  const [reviews, setReviews] = useState(Array<Review>)

  useEffect(() => {
    if (!id) {
      navigate('/')
    } else {
      const fetchMovie = async () => {
        try {
          const movies = await getMovie(id)
          // const reviews = await getReviews(id)
          // const posters = await getPosters(id)
          // console.log(posters)
          // setReviews(reviews)
          setMovie(movies)
        } catch {
          console.log(movie)
        }
      }
      fetchMovie()
    }
  }, [id, navigate])

  useEffect(() => {
    if (id) {
      try {
        // const fetchSeasons = async () => {
        //   const response = await getSeasons(id)
        //   const seasons = response.filter((season: Season) => season.number !== 0)
        //   setSeasons(seasons)
        // }
        // fetchSeasons()
      } catch {
        console.log('error')
      }
    }
  }, [id])

  const handleReturn = () => navigate('/')

  const actors = movie?.persons.filter((person) => (person.profession = 'актеры')) as Person[]

  return (
    <div className={styles.background}>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Text style={{ color: '#C5C5C5' }}>Авито.Кино</Text>
            <Button onClick={handleReturn}>Назад</Button>
          </div>

          <div className={styles.content}>
            <MainPoster image={movie?.poster.previewUrl} />

            <div className={styles.container}>
              <MovieInfo movie={movie} />

              <Posters />

              <Reviews reviews={reviews} />
            </div>

            <AdditionalInfo actors={actors} seasons={seasons} />
          </div>
        </div>
      </div>
    </div>
  )
}
