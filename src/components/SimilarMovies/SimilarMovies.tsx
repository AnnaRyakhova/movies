import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Image, Typography } from 'antd'
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { SimilarMovie } from 'src/types'

import styles from './SimilarMovies.module.css'

interface Props {
  similarMovies?: SimilarMovie[]
}

const { Title, Text } = Typography

const SimilarMovieCard = ({ movie }: { movie: SimilarMovie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className={styles.movieLink}>
      <div className={styles.movieCard}>
        <Image src={movie.poster.url} preview={false} />
        <Text type="secondary">{movie.name}</Text>
      </div>
    </Link>
  )
}

export const SimilarMovies: FC<Props> = ({ similarMovies }) => {
  const renderMovies = () => {
    if (!similarMovies?.length) {
      return null
    }

    return similarMovies.map((movie) => {
      return (
        <SwiperSlide className={styles.poster} key={movie.id}>
          <SimilarMovieCard movie={movie} />
        </SwiperSlide>
      )
    })
  }

  return (
    <>
      <Title level={3}>Похожие фильмы</Title>
      <div className={styles.root}>
        <SwiperContainer spaceBetween={8} slidesPerView={3.5}>
          {renderMovies()}
        </SwiperContainer>
      </div>
    </>
  )
}
