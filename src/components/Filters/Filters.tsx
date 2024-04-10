import { Input, Select, Typography } from 'antd'

import styles from './Filters.module.css'
import { Filter, FilterOption } from 'src/types'
import { FC, useEffect, useState } from 'react'
import { getYearsOptions } from 'src/utils/getYearsOptions'
import { ageRatings } from './constants'
import { useFilterParams } from 'src/utils/useFilterParams'
import { getCountryOptions } from 'src/utils/getCountryOptions'
import { getAgeRatingOptions } from 'src/utils/getAgeRatingOptions'
import { useCountryOptions } from 'src/utils/useCountryOptions'

const { Search } = Input
const { Text } = Typography

interface FiltersProps {
  setFilterParams: (filter: Filter, value: string | null) => void
}

export const Filters: FC<FiltersProps> = ({ setFilterParams }) => {
  const { filterParams } = useFilterParams()

  const { countryOptions } = useCountryOptions()

  const yearsOptions = getYearsOptions()
  const ageRatingOptions = getAgeRatingOptions()

  const handleCountries = (value: string) => {
    setFilterParams(Filter.Country, value)
  }

  return (
    <div className={styles.sider}>
      <div className={styles.searchWrapper}>
        <Text type="secondary">Найти фильм</Text>
        <Search placeholder="" style={{ width: 200 }} />
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
