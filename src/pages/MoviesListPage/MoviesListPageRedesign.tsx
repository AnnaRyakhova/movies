import { Pagination, Spin, Typography } from 'antd'
import { useState } from 'react'

import { Movie } from 'src/types'
import { MovieCard } from 'src/components/MovieCardRedesign/MovieCard'
import { Filters } from 'src/components/Filters/FiltersRedesign'
import { Header } from 'src/components/Header/Header'
import { useSearchParams } from 'src/utils/useSearchParams'

import styles from './MoviesListPageRedesign.module.css'

export const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState<number>()

  const { searchFilters, setSearchFilters, page, search } = useSearchParams()

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

  const isFilters = searchFilters.ageRating || searchFilters.country || searchFilters.year || search
  const about = isFilters ? 'Результаты поиска' : '250 лучших фильмов'

  console.log(isFilters)

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {/* <Header setLoading={setLoading} setTotal={setTotal} setMovies={setMovies} /> */}

        <div className={styles.content}>
          <Filters setLoading={setLoading} setTotal={setTotal} setMovies={setMovies} />
          <div className={styles.films}>mdkghrlkghlek</div>
          {/* <div className={styles.movies}>{renderMovies()}</div> */}
          <div className={styles.about}>{about}</div>
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
