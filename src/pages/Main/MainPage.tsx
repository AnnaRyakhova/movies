import { Typography, Divider, Pagination } from 'antd'

import styles from './MainPage.module.css'
import { MovieCard } from '../../components/FilmCard/MovieCard'

const { Title } = Typography

export const MainPage = () => {
  return (
    <div className={styles.background}>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <Title style={{ color: '#C5C5C5' }}>Авито.Кино</Title>
            <Title level={3}>Все фильмы и сериалы</Title>
          </div>
          <Divider />
          <div className={styles.content}>
            <div className={styles.sider}>fff</div>
            <div className={styles.movies}>
              <MovieCard />
              <MovieCard />
              <MovieCard />
            </div>
          </div>
          <Divider />
          <Pagination defaultCurrent={1} total={500} className={styles.pagination} />
        </div>
      </div>
    </div>
  )
}
