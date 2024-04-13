import { useMemo } from 'react'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { Filter, Filters } from 'src/types'

const defaultSerchParams = {
  page: '1',
  pageSize: '10',
}

const getSearchParams = (searchParams: URLSearchParams): Filters => {
  const params = {} as Filters
  return Array.from(searchParams).reduce((params, [key, value]) => ({ ...params, [key]: value }), params)
}

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filterParams = useMemo(() => {
    const prevParams = getSearchParams(searchParams)
    return { ...defaultSerchParams, ...prevParams }
  }, [searchParams])

  // console.log('filterParams', filterParams)

  const setFilterParams = (filter: Filter, value: string | null) => {
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

  const resetFilterParams = () => {
    setSearchParams({ ...defaultSerchParams, pageSize: filterParams.pageSize })
  }

  return { filterParams, setFilterParams, resetFilterParams }
}
