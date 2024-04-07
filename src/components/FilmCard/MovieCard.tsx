import { Link } from 'react-router-dom'
import { Typography } from 'antd'

import styles from './MovieCard.module.css'
import { Movie } from '../../types'
import { FC } from 'react'

const { Title, Text } = Typography

interface MovieCardProps {
  movie: Movie
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { name, alternativeName, year, movieLength, genres, countries, poster, rating } = movie || {}

  return (
    <>
      <Link to="/movie/1" className={styles.link}>
        <div className={styles.wrapper}>
          <div className={styles.img} style={{ backgroundImage: `url(${poster.previewUrl})` }}></div>

          <div className={styles.description}>
            <div className={styles.text}>
              <Title level={3} className={styles.title}>
                {name}
              </Title>
              <Text type="secondary">
                {`${alternativeName || ''}, ${year}, ${movieLength} мин, ${genres[0].name}, ${countries[0].name}`}
              </Text>
            </div>

            <Title level={2} className={styles.rating}>
              {rating.kp.toFixed(1)}
            </Title>
          </div>
        </div>
      </Link>
    </>
  )
}
