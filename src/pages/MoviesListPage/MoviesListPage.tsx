import { Pagination, Spin, Typography } from 'antd'
import { useState } from 'react'

import { Movie } from 'src/types'
import { MovieCard } from 'src/components/MovieCard/MovieCard'
import { Filters } from 'src/components/Filters/Filters'
import { Header } from 'src/components/Header/Header'
import { useSearchParams } from 'src/utils/useSearchParams'

import styles from './MoviesListPage.module.css'

export const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>()

  const { searchFilters, setSearchFilters, page } = useSearchParams()

  const handlePagination = (page: number) => setSearchFilters({ ...searchFilters, page: page })

  const renderMovies = () => {
    if (loading) {
      return <Spin />
    }

    if (!movies.length) {
      return <Typography.Text>Фильмы не найдены</Typography.Text>
    }

    return movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header setLoading={setLoading} setTotal={setTotal} setMovies={setMovies} />

        <div className={styles.content}>
          <Filters setLoading={setLoading} setTotal={setTotal} setMovies={setMovies} />
          <div className={styles.movies}>{renderMovies()}</div>
        </div>

        <Pagination
          current={page}
          defaultCurrent={1}
          total={total}
          className={styles.pagination}
          onChange={handlePagination}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}
