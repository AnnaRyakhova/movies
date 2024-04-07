import { Typography, Divider, Pagination } from 'antd'
import { useEffect, useState } from 'react'

import styles from './MainPage.module.css'
import { MovieCard } from '../../components/FilmCard/MovieCard'
import { Movie } from '../../types'
import { getMovies } from '../../api/requests'

const { Title } = Typography

export const MainPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handlePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies(page, pageSize)
      setMovies(movies)
    }

    fetchData()
  }, [page, pageSize])

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
              {!!movies.length && movies.map((movie, index) => <MovieCard movie={movie} key={index} />)}
            </div>
          </div>
          <Divider />
          <Pagination defaultCurrent={1} total={500} className={styles.pagination} onChange={handlePagination} />
        </div>
      </div>
    </div>
  )
}
