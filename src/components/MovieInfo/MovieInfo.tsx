import { FC } from 'react'
import styles from './MovieInfo.module.css'
import { Movie, Person } from 'src/types'
import { Typography, Image, Skeleton } from 'antd'
import { ActorsInfo } from '../ActorsInfo/ActorsInfo'
import { SeriesInfo } from '../SeriesInfo/SeriesInfo'

const { Text, Title } = Typography

interface Props {
  movie?: Movie
}

export const MovieInfo: FC<Props> = ({ movie }) => {
  const image = movie?.poster?.previewUrl

  const renderPoster = () => {
    if (!image) {
      return <Skeleton.Image className={styles.posterSkeleton} />
    }

    return <Image className={styles.poster} src={image} />
  }

  const actors = movie?.persons.filter((person) => (person.profession = 'актеры')) as Person[]

  return (
    <div className={styles.root}>
      <div className={styles.posterWrapper}>{renderPoster()}</div>
      <div className={styles.info}>
        <div className={styles.movieInfo}>
          <div className={styles.about}>
            <Title level={1} className={styles.title}>
              {movie?.name}
            </Title>
            <Text type="secondary">{movie?.description}</Text>
          </div>
          <Title level={2} className={styles.rating}>
            {movie?.rating.kp.toFixed(1)}
          </Title>
        </div>
        <div className={styles.additionalInfo}>
          <ActorsInfo actors={actors} />
          {movie?.isSeries ? <SeriesInfo /> : null}
        </div>
      </div>
    </div>
  )
}
