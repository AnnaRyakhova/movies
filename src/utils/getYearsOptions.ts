import { FilterOption } from 'src/types'

const defaultValue = { label: 'Все годы', value: '' }
const yearFrom = 2027
const yearTo = 2019
const currentDecade = 2020

const LAST_YEAR = 1890
const YEAR_DECADE = 10

export const getYearsOptions = (): FilterOption[] => {
  const filterOptions: FilterOption[] = [defaultValue]

  for (let i = yearFrom; i >= yearTo; i--) {
    const year = i.toString()
    const option = {
      label: year,
      value: year,
    }
    filterOptions.push(option)
  }

  for (let i = currentDecade; i >= LAST_YEAR; i = i - YEAR_DECADE) {
    const decade = `${i}-${i + YEAR_DECADE - 1}`
    const option = {
      label: decade,
      value: decade,
    }
    filterOptions.push(option)
  }

  return filterOptions
}
