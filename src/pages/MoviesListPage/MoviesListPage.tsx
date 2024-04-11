import { Pagination, Spin } from 'antd'
import { useEffect, useState } from 'react'

import { Movie } from 'src/types'
import { getMovies, getMoviesByName } from 'src/api'
import { MovieCard } from 'src/components/MovieCard/MovieCard'
import { Filters } from 'src/components/Filters/Filters'

import styles from './MoviesListPage.module.css'
import { useFilterParams } from 'src/utils/useFilterParams'
import { Header } from 'src/components/Header/Header'

export const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { filterParams } = useFilterParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (!searchQuery) {
          const response = await getMovies({ page, pageSize, filters: filterParams })
          setMovies(response.docs)
          setTotal(response?.total)
        } else {
          const movies = await getMoviesByName(searchQuery, page, pageSize)
          setMovies(movies.docs)
          setTotal(movies.total)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filterParams, page, pageSize, searchQuery])

  const handlePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

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
          <Header searchQuery={searchQuery} setMovies={setMovies} setSearchQuery={setSearchQuery} setPage={setPage} />

          <div className={styles.content}>
            <Filters
              searchQuery={searchQuery}
              setMovies={setMovies}
              setSearchQuery={setSearchQuery}
              setPage={setPage}
            />

            <div className={styles.movies}>{renderMovies()}</div>
          </div>

          <Pagination
            current={page}
            defaultCurrent={1}
            total={total}
            className={styles.pagination}
            onChange={handlePagination}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  )
}
