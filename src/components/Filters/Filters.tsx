import { Button, Input, Select, Typography } from 'antd'
import { ChangeEvent, FC, KeyboardEvent } from 'react'
import cn from 'classnames'
import { toast } from 'sonner'

import { Filter } from 'src/types'
import { getYearsOptions } from 'src/utils/getYearsOptions'
import { useFilterParams } from 'src/utils/useFilterParams'
import { getAgeRatingOptions } from 'src/utils/getAgeRatingOptions'
import { useCountryOptions } from 'src/utils/useCountryOptions'

import { pageSizeOptions } from './constants'
import styles from './Filters.module.css'

const { Search } = Input
const { Text } = Typography

interface FiltersProps {
  mobile?: boolean
}

export const Filters: FC<FiltersProps> = ({ mobile = false }) => {
  const { filterParams, setFilterParams, setSearchFilter, setPageSize } = useFilterParams()

  const { countryOptions } = useCountryOptions()
  const yearsOptions = getYearsOptions()
  const ageRatingOptions = getAgeRatingOptions()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value)
  }

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    setSearchFilter(e.currentTarget.value)
  }

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Текст успешно скопирован в буфер обмена!')
  }

  return (
    <div className={cn(styles.sider, { [styles.mobile]: mobile })}>
      <div className={styles.searchWrapper}>
        <Text type="secondary">Найти фильм</Text>
        <Search value={filterParams.search} placeholder="" onChange={handleSearch} onPressEnter={handlePressEnter} />
      </div>
      <div className={styles.filtersWrapper}>
        <Text type="secondary">Фильтры</Text>
        <div className={styles.filters}>
          <Select
            placeholder="Все страны"
            onChange={(value) => setFilterParams(Filter.Country, value)}
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
          <Select
            placeholder="Размер страницы"
            onChange={(value) => setPageSize(String(value))}
            options={pageSizeOptions}
            value={filterParams.pageSize}
          />
        </div>
      </div>

      <Button onClick={() => copyTextToClipboard()}>Поделиться</Button>
    </div>
  )
}
