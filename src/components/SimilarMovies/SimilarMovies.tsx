import { FC } from 'react'
import { Carousel, Image } from 'antd'

import { SimilarMovie } from 'src/types'

import styles from './SimilarMovies.module.css'

interface Props {
  similarMovies?: SimilarMovie[]
}

export const SimilarMovies: FC<Props> = ({ similarMovies }) => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  const renderSimilarMovies = () => {
    if (!similarMovies) {
      return null
    }

    console.log(similarMovies)

    return (
      <Carousel className={styles.carousel}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    )
  }

  // return renderSimilarMovies()

  return <div className={styles.wrapper}>{renderSimilarMovies()}</div>
}
