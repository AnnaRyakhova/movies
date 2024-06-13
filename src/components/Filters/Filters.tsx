import { Button, Input, Select, Typography } from 'antd'
import { ChangeEvent, FC, KeyboardEvent, useEffect } from 'react'
import cn from 'classnames'
import { toast } from 'sonner'

import { Movie } from 'src/types'
import { getYearsOptions } from 'src/utils/getYearsOptions'
import { getAgeRatingOptions } from 'src/utils/getAgeRatingOptions'
import { useCountryOptions } from 'src/utils/useCountryOptions'
import { useSearchParams } from 'src/utils/useSearchParams'

import { pageSizeOptions } from './constants'
import styles from './Filters.module.css'
import { getMovies, getMoviesByName } from 'src/api'
import { useDebounce } from 'src/utils/useDebounce'

const { Search } = Input
const { Text } = Typography

interface FiltersProps {
  mobile?: boolean
  setLoading: (arg: boolean) => void
  setTotal: (total: number | undefined) => void
  setMovies: (movies: Movie[]) => void
}

export const Filters: FC<FiltersProps> = ({ mobile = false, setLoading, setTotal, setMovies }) => {
  const { setSearchFilters, searchFilters, setSearch, search } = useSearchParams()

  const { countryOptions } = useCountryOptions()
  const yearsOptions = getYearsOptions()
  const ageRatingOptions = getAgeRatingOptions()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFilters({
      ...searchFilters,
      page: 1,
      country: undefined,
      ageRating: undefined,
      year: undefined,
    })
    if (!e.target.value) {
      setSearch(undefined)
    } else {
      setSearch(e.target.value)
    }
  }

  const setFilter = (filter: string, value: string | number) => {
    setSearchFilters({ ...searchFilters, page: 1, [filter]: undefined })
    if (!value) {
      setSearch(undefined)
    } else {
      setSearch(undefined)
      setSearchFilters({ ...searchFilters, page: 1, [filter]: value })
    }
  }

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Текст успешно скопирован в буфер обмена!')
  }

  const debouncedSearch = useDebounce(search, 1000)

  useEffect(() => {
    const handleGetMovies = async () => {
      let movies

      try {
        setLoading(true)
        if (debouncedSearch) {
          movies = await getMoviesByName(debouncedSearch, searchFilters.page, searchFilters.pageSize)
          setMovies(movies.docs)
        } else {
          movies = await getMovies(searchFilters)
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
  }, [searchFilters, setLoading, setMovies, setTotal, debouncedSearch])

  return (
    <div className={cn(styles.sider, { [styles.mobile]: mobile })}>
      <div className={styles.searchWrapper}>
        <Text type="secondary">Найти фильм</Text>
        <Search value={search} placeholder="" onChange={handleSearch} onPressEnter={handlePressEnter} />
      </div>
      <div className={styles.filtersWrapper}>
        <Text type="secondary">Фильтры</Text>
        <div className={styles.filters}>
          <Select
            placeholder="Все страны"
            onChange={(value) => setFilter('country', value)}
            options={countryOptions}
            value={searchFilters.country}
          />
          <Select
            placeholder="Все годы"
            onChange={(value) => setFilter('year', value)}
            options={yearsOptions}
            value={searchFilters.year}
          />
          <Select
            placeholder="Для любого возраста"
            onChange={(value) => setFilter('ageRating', value)}
            options={ageRatingOptions}
            value={searchFilters.ageRating}
          />
          <Select
            placeholder="Размер страницы"
            defaultActiveFirstOption
            onChange={(value) => setFilter('pageSize', value)}
            options={pageSizeOptions}
            value={searchFilters.pageSize}
          />
        </div>
      </div>

      <Button onClick={() => copyTextToClipboard()}>Поделиться</Button>
    </div>
  )
}
