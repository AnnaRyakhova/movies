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

const { Search } = Input
const { Text } = Typography

interface FiltersProps {
  setFilterParams: (filter: Filter, value: string | null) => void
  setMovies: (movies: Movie[]) => void
  className?: string
}

export const Filters: FC<FiltersProps> = ({ setFilterParams, setMovies, className = '' }) => {
  const [search, setSearch] = useState('')

  const { filterParams } = useFilterParams()

  const { countryOptions } = useCountryOptions()
  const yearsOptions = getYearsOptions()
  const ageRatingOptions = getAgeRatingOptions()

  const handleCountries = (value: string) => {
    setFilterParams(Filter.Country, value)
  }

  const handleSearch = (e: any) => {
    setSearch(e.target.value)
    const fetchMovies = async () => {
      try {
        const response = await getMoviesByName(search)
        setMovies(response)
        console.log(search, response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMovies()
  }

  return (
    <div className={cn(styles.sider, styles[className])}>
      <div className={styles.searchWrapper}>
        <Text type="secondary">Найти фильм</Text>
        <Search placeholder="" style={{ width: 200 }} onChange={handleSearch} onPressEnter={handleSearch} />
      </div>
      <div className={styles.filtersWrapper}>
        <Text type="secondary">Фильтры</Text>
        <div className={styles.filters}>
          <Select
            placeholder="Все страны"
            onChange={handleCountries}
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
