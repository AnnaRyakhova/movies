import { FC } from 'react'
import { Carousel, Image, Typography } from 'antd'

import { SimilarMovie } from 'src/types'

import styles from './SimilarMovies.module.css'
import { Link } from 'react-router-dom'

interface Props {
  similarMovies?: SimilarMovie[]
}

const { Title, Text } = Typography

export const SimilarMovies: FC<Props> = ({ similarMovies }) => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  const SimilarMovieCard = ({ movie }: { movie: SimilarMovie }) => {
    return (
      <Link to={`/movie/${movie.id}`} className={styles.link}>
        <div className={styles.cardWrapper}>
          <div className={styles.poster} style={{ backgroundImage: `url(${movie.poster.url})`, width: '100px' }}></div>
          <Title level={5}>{movie.name}</Title>
        </div>
      </Link>
    )
  }

  const renderSimilarMovies = () => {
    if (!similarMovies) {
      return null
    }

    // console.log(similarMovies)

    return null
    // <Carousel className={styles.carousel}>
    //   <div>
    //     <h3 style={contentStyle}>1</h3>
    //   </div>
    //   <div>
    //     <h3 style={contentStyle}>2</h3>
    //   </div>
    //   <div>
    //     <h3 style={contentStyle}>3</h3>
    //   </div>
    //   <div>
    //     <h3 style={contentStyle}>4</h3>
    //   </div>
    // </Carousel>
  }

  // return renderSimilarMovies()

  return (
    <>
      <Title level={3}>Похожие фильмы</Title>
      <div className={styles.root}>{renderSimilarMovies()}</div>
    </>
  )
}
