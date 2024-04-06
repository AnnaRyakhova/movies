import { Link } from 'react-router-dom'
import { Typography } from 'antd'

import styles from './MovieCard.module.css'

const { Title, Text } = Typography

export const MovieCard = () => {
  return (
    <>
      <Link to="/movie/1" className={styles.link}>
        <div className={styles.wrapper}>
          <div className={styles.img} style={{ backgroundImage: `url('/image 1.jpg')` }}></div>

          <div className={styles.description}>
            <div className={styles.text}>
              <Title level={3} className={styles.title}>
                1 + 1
              </Title>
              <Text type="secondary">Intouchables, 2011, 112 мин, драма, Франция</Text>
              <Text type="secondary">Режиссёр: Оливье Накаш</Text>
            </div>

            <Title level={2} className={styles.rating}>
              9.0
            </Title>
          </div>
        </div>
      </Link>
    </>
  )
}
