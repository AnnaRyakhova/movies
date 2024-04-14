import { Pagination, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Filter, Movie } from 'src/types'
import { getMovies, getMoviesByName } from 'src/api'
import { MovieCard } from 'src/components/MovieCard/MovieCard'
import { Filters } from 'src/components/Filters/Filters'
import { useFilterParams } from 'src/utils/useFilterParams'
import { Header } from 'src/components/Header/Header'

import styles from './MoviesListPage.module.css'

export const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>()

  const { filterParams, setPage } = useFilterParams()

  useEffect(() => {
    const handleGetMovies = async () => {
      let movies

      try {
        setLoading(true)
        const searchQuery = filterParams.search
        if (searchQuery) {
          const page = Number(filterParams.page)
          const pageSize = Number(filterParams.pageSize)
          movies = await getMoviesByName(searchQuery, page, pageSize)
          setMovies(movies.docs)
        } else {
          movies = await getMovies(filterParams)
          setMovies(movies.docs)
        }
      } catch {
        toast.error('Не удалось загрузить фильмы')
      } finally {
        setTotal(movies?.total)
        setLoading(false)
      }
    }

    handleGetMovies()
  }, [filterParams])

  const handlePagination = (page: number) => setPage(String(page))

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
        <Header />

        <div className={styles.content}>
          <Filters />
          <div className={styles.movies}>{renderMovies()}</div>
        </div>

        <Pagination
          current={Number(filterParams.page)}
          defaultCurrent={1}
          total={total}
          className={styles.pagination}
          onChange={handlePagination}
          pageSize={Number(filterParams.pageSize)}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}
