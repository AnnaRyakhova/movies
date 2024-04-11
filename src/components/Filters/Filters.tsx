import { Input, Select, Typography } from 'antd'
import { FC, useState } from 'react'
import cn from 'classnames'

import styles from './Filters.module.css'
import { Filter, Movie } from 'src/types'
import { getYearsOptions } from 'src/utils/getYearsOptions'
import { useFilterParams } from 'src/utils/useFilterParams'
import { getAgeRatingOptions } from 'src/utils/getAgeRatingOptions'
import { useCountryOptions } from 'src/utils/useCountryOptions'
import { getMoviesByName } from 'src/api/getMoviesByName'
import { AxiosError } from 'axios'

const { Search } = Input
const { Text } = Typography

interface FiltersProps {
  searchQuery: string
  setMovies: (movies: Movie[]) => void
  setPage: (prevState: number) => void
  setSearchQuery: (prevState: string) => void
  mobile?: boolean
}

export const Filters: FC<FiltersProps> = ({ setMovies, searchQuery, setSearchQuery, setPage, mobile }) => {
  const { filterParams, setFilterParams, resetFilterParams } = useFilterParams()

  const { countryOptions } = useCountryOptions()
  const yearsOptions = getYearsOptions()
  const ageRatingOptions = getAgeRatingOptions()

  const handleFilter = (filer: Filter, value: string) => {
    setSearchQuery('')
    setFilterParams(filer, value)
  }

  const handleSearch = (e: any) => {
    resetFilterParams()
    setPage(1)
    setSearchQuery(e.target.value)

    const fetchMovies = async () => {
      try {
        const response = await getMoviesByName(searchQuery)
        setMovies(response.docs)
      } catch (error) {
        // console.log(error.message)
      }
    }
    fetchMovies()
  }

  return (
    <div className={cn(styles.sider, { [styles.mobile]: mobile })}>
      <div className={styles.searchWrapper}>
        <Text type="secondary">Найти фильм</Text>
        <Search value={searchQuery} placeholder="" onChange={handleSearch} onPressEnter={handleSearch} />
      </div>
      <div className={styles.filtersWrapper}>
        <Text type="secondary">Фильтры</Text>
        <div className={styles.filters}>
          <Select
            placeholder="Все страны"
            onChange={(value) => handleFilter(Filter.Country, value)}
            options={countryOptions}
            value={filterParams.country}
          />
          <Select
            placeholder="Все годы"
            onChange={(value) => setFilterParams(Filter.Year, value)}
            options={yearsOptions}
            value={filterParams.year}
          />
          <Select
            placeholder="Для любого возраста"
            onChange={(value) => setFilterParams(Filter.AgeRating, value)}
            options={ageRatingOptions}
            value={filterParams.ageRating}
          />
        </div>
      </div>
    </div>
  )
}
