import { FC } from 'react'
import styles from './MovieInfo.module.css'
import { Movie } from 'src/types'
import { Typography } from 'antd'

const { Text, Title } = Typography

interface Props {
  movie?: Movie
}

export const MovieInfo: FC<Props> = ({ movie }) => {
  return (
    <div className={styles.movieInfo}>
      <div className={styles.about}>
        <Title level={2} className={styles.title}>
          {movie?.name}
        </Title>
        <Text type="secondary">{movie?.shortDescription}</Text>
      </div>
      <Title level={2} className={styles.rating}>
        {movie?.rating.kp.toFixed(1)}
      </Title>
    </div>
  )
}
