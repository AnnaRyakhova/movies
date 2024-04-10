import { getPossibleValues } from 'src/api'
import { FilterOption } from 'src/types'

const startCountriesOptions: FilterOption[] = [
  { label: 'Все страны', value: null },
  { label: 'Россия', value: 'Россия' },
  { label: 'СССР', value: 'СССР' },
  { label: 'США', value: 'США' },
]

export const getCountryOptions = async (): Promise<FilterOption[]> => {
  const countryOptions = await getPossibleValues('countries.name')
  return [...startCountriesOptions, ...countryOptions]
}
