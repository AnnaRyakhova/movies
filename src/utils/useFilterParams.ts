import { useMemo } from 'react'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { Filter, Filters } from 'src/types'

const getSearchParams = (searchParams: URLSearchParams): Filters => {
  const params = {} as Filters
  return Array.from(searchParams).reduce((params, [key, value]) => ({ ...params, [key]: value }), params)
}

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filterParams = useMemo(() => getSearchParams(searchParams), [searchParams])

  const setFilterParams = (filter: Filter, value: string) => {
    const prevParams = getSearchParams(searchParams)
    if (!value) {
      delete prevParams[filter]
      const params = createSearchParams({ ...prevParams })
      setSearchParams(params)
    } else {
      const params = createSearchParams({ ...prevParams, [filter]: value })
      setSearchParams(params)
    }
  }

  return { searchParams, filterParams, setFilterParams }
}
