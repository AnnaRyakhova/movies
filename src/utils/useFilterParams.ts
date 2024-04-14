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

  const setFilterParams = (filter: Filter, value: string) => {
    const prevParams = getSearchParams(searchParams)

    let valueObj = {}

    // Set filter value or remove it from previus filters
    if (value) {
      valueObj = { [filter]: value }
    } else {
      delete prevParams[filter]
    }

    // Clean search query
    const { search, ...restParams } = prevParams

    const params = createSearchParams({ ...restParams, ...valueObj, page: '1' })
    setSearchParams(params)
  }

  const setSearchFilter = (searchValue: string) => {
    let prevParams = {}
    let searchFilter = {}

    // Set search query and reset other filters
    if (searchValue) {
      searchFilter = { search: searchValue }
      prevParams = { pageSize: filterParams.pageSize }
    } else {
      // Or remove search query
      const oldParams = getSearchParams(searchParams)
      const { search, ...restParams } = oldParams
      prevParams = restParams
    }

    const params = createSearchParams({ ...prevParams, ...searchFilter, page: '1' })
    setSearchParams(params)
  }

  const setPageSize = (pageSize: string) => {
    const prevParams = getSearchParams(searchParams)
    const params = createSearchParams({ ...prevParams, pageSize, page: '1' })
    setSearchParams(params)
  }

  const setPage = (page: string) => {
    const prevParams = getSearchParams(searchParams)
    const params = createSearchParams({ ...prevParams, page })
    setSearchParams(params)
  }

  return { filterParams, setFilterParams, setSearchFilter, setPageSize, setPage }
}
