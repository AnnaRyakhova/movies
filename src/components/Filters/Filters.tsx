import { Button, Input, Select, Typography } from 'antd'
import { ChangeEvent, FC, KeyboardEventHandler } from 'react'
import cn from 'classnames'

import styles from './Filters.module.css'
import { Filter, Movie } from 'src/types'
import { getYearsOptions } from 'src/utils/getYearsOptions'
import { useFilterParams } from 'src/utils/useFilterParams'
import { getAgeRatingOptions } from 'src/utils/getAgeRatingOptions'
import { useCountryOptions } from 'src/utils/useCountryOptions'
import { getMoviesByName } from 'src/api/getMoviesByName'
import { pageSizeOptions } from './constants'

const { Search } = Input
const { Text } = Typography

interface FiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  mobile?: boolean
}

export const Filters: FC<FiltersProps> = ({ searchQuery, setSearchQuery, mobile = false }) => {
  const { filterParams, setFilterParams, resetFilterParams } = useFilterParams()

  const { countryOptions } = useCountryOptions()
  const yearsOptions = getYearsOptions()
  const ageRatingOptions = getAgeRatingOptions()

  const handleFilter = (filter: Filter, value: string) => {
    if (filter !== Filter.PageSize) {
      setSearchQuery('')
    }
    setFilterParams(filter, value)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    resetFilterParams()
    setSearchQuery(e.target.value)
  }

  const copyTextToClipboard = () => {
    try {
      navigator.clipboard.writeText(window.location.href)
      console.log('Текст успешно скопирован в буфер обмена!')
    } catch (err) {
      console.error('Ошибка:')
    }
  }

  // const debounce = (func, delay) => {
  //   let timeoutId

  //   return (...args) => {
  //     clearTimeout(timeoutId)
  //     timeoutId = setTimeout(() => func.apply(this, args), delay)
  //   }
  // }

  // const debouncedSearch = debounce(handleSearch, 100)

  return (
    <div className={cn(styles.sider, { [styles.mobile]: mobile })}>
      <div className={styles.searchWrapper}>
        <Text type="secondary">Найти фильм</Text>
        <Search
          value={searchQuery}
          placeholder=""
          onChange={handleSearch}
          // onPressEnter={handleSearch}
        />
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
            onChange={(value) => handleFilter(Filter.Year, value)}
            options={yearsOptions}
            value={filterParams.year}
          />
          <Select
            placeholder="Для любого возраста"
            onChange={(value) => handleFilter(Filter.AgeRating, value)}
            options={ageRatingOptions}
            value={filterParams.ageRating}
          />
          <Select
            placeholder="Размер страницы"
            onChange={(value) => handleFilter(Filter.PageSize, String(value))}
            options={pageSizeOptions}
            value={filterParams.pageSize}
          />
        </div>
      </div>

      <Button onClick={() => copyTextToClipboard()}>Поделиться</Button>
    </div>
  )
}
