import { Button, Input, Select, Typography } from 'antd'

import styles from './Filters.module.css'
import { Filter, FilterOption } from 'src/types'
import { FC, useEffect, useState } from 'react'
import { getPossibleValues } from 'src/api'
import { getYears } from 'src/utils/utils'
import { ageRatings } from './constants'

const { Search } = Input
const { Text } = Typography

interface FiltersProps {
  setFilterParams: (filter: Filter, value: string) => void
}

export const Filters: FC<FiltersProps> = ({ setFilterParams }) => {
  const [countryOptions, setCountryOptions] = useState<FilterOption[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const values = await getPossibleValues('countries.name')
      const startCountriesOptions = [
        { label: 'Все страны', value: null },
        { label: 'Россия', value: 'Россия' },
        { label: 'СССР', value: 'СССР' },
        { label: 'США', value: 'США' },
      ]
      setCountryOptions([...startCountriesOptions, ...values])
    }

    fetchData()
  }, [])

  const years = getYears(2027, 2019, 2020)
  const yearsOptions = years.map((item) => ({
    value: item,
    label: item,
  }))
  const ageRatingOptions = ageRatings.map((rating: string) => ({
    value: rating,
    label: `${rating}+`,
  }))

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
            onChange={(value) => setFilterParams(Filter.Country, value)}
            options={countryOptions}
          />
          <Select
            placeholder="Все годы"
            onChange={(value) => setFilterParams(Filter.Year, value)}
            options={yearsOptions}
          />
          <Select
            placeholder="Для любого возраста"
            onChange={(value) => setFilterParams(Filter.AgeRating, value)}
            options={ageRatingOptions}
          />
        </div>
      </div>
    </div>
  )
}
