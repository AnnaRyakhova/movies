import { NumberParam, StringParam, useQueryParam, useQueryParams } from 'use-query-params'

export const useSearchParams = () => {
  const [searchFilters, setSearchFilters] = useQueryParams({
    page: NumberParam,
    pageSize: NumberParam,
    country: StringParam,
    year: StringParam,
    ageRating: StringParam,
  })

  const [search, setSearch] = useQueryParam<string | undefined>('search')

  return { setSearchFilters, searchFilters, setSearch, search, page: searchFilters.page }
}
