import { Link } from 'react-router-dom'
import { Skeleton, Typography } from 'antd'

import styles from './MovieCard.module.css'
import { Movie } from '../../types'
import { FC } from 'react'

const { Title, Text } = Typography

interface MovieCardProps {
  movie: Movie
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { name, alternativeName, year, movieLength, genres, countries, poster, rating, id } = movie || {}

  const [genreObj] = genres
  const genre = genreObj?.name ? `${genreObj.name}, ` : ''

  const [country] = countries
  const countryName = country?.name ? `${country.name}` : ''

  const anotherName = alternativeName ? `${alternativeName}, ` : ''

  const length = movieLength ? `${movieLength} мин, ` : ''

  const info = `${anotherName}${year}, ${length} ${genre} ${countryName}`

  const movieRating = rating.kp.toFixed(1)

  const renderPoster = () => {
    if (!poster?.previewUrl) {
      return <Skeleton.Image className={styles.posterSkeleton} />
    }

    return <div className={styles.poster} style={{ backgroundImage: `url(${poster?.previewUrl})` }} />
  }

  return (
    <>
      <Link to={`/movie/${id}`} className={styles.link}>
        <div className={styles.wrapper}>
          {renderPoster()}
          <div className={styles.description}>
            <div className={styles.text}>
              <Title level={4} className={styles.title} style={{ marginBottom: '0' }}>
                {name}
              </Title>
              <Text type="secondary" className={styles.info}>
                {info}
              </Text>
            </div>

            <Title level={2} className={styles.rating}>
              {movieRating}
            </Title>
          </div>
        </div>
      </Link>
    </>
  )
}
