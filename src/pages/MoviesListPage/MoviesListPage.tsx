import { Typography, Pagination, Spin, Drawer } from 'antd'
import { useEffect, useState } from 'react'

import { Movie } from 'src/types'
import { getMovies } from 'src/api'
import { MovieCard } from 'src/components/MovieCard/MovieCard'
import { Filters } from 'src/components/Filters/Filters'

import styles from './MoviesListPage.module.css'
import { useFilterParams } from 'src/utils/useFilterParams'
import { Header } from 'src/components/Header/Header'

const { Text } = Typography

export const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  const handlePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const { filterParams, setFilterParams } = useFilterParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const movies = await getMovies({ page, pageSize, filters: filterParams })
        setMovies(movies)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filterParams, page, pageSize])

  const renderMovies = () => {
    if (!movies.length) {
      return null
    }

    if (loading) {
      return <Spin />
    }

    return movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
  }

  return (
    <div className={styles.background}>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <Header />

          <div className={styles.content}>
            <Filters setFilterParams={setFilterParams} />

            <div className={styles.movies}>{renderMovies()}</div>
          </div>

          <Pagination defaultCurrent={1} total={500} className={styles.pagination} onChange={handlePagination} />
        </div>
      </div>
    </div>
  )
}
