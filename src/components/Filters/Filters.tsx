import { Input, Select, Typography } from 'antd'
import type { SearchProps } from 'antd/es/input/Search'
import { FC, useEffect, useState } from 'react'

import styles from './Filters.module.css'
import { Filter } from 'src/types'
import { getYearsOptions } from 'src/utils/getYearsOptions'
import { useFilterParams } from 'src/utils/useFilterParams'
import { getAgeRatingOptions } from 'src/utils/getAgeRatingOptions'
import { useCountryOptions } from 'src/utils/useCountryOptions'
import { getMoviesByName } from 'src/api/getMoviesByName'

const { Search } = Input
const { Text } = Typography

interface FiltersProps {
  setFilterParams: (filter: Filter, value: string | null) => void
}

export const Filters: FC<FiltersProps> = ({ setFilterParams }) => {
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
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMoviesByName(search)
        console.log(search, response)
      } catch (error) {
        console.log(error?.message)
      }
    }
    fetchMovies()
  }, [search])
  return (
    <div className={styles.sider}>
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
