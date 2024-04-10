import { FilterOption } from 'src/types'

const defaultValue = { label: 'Все годы', value: null }
const yearFrom = 2027
const yearTo = 2019
const currentDecade = 2020

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

  for (let i = currentDecade; i >= 1890; i = i - 10) {
    const decade = `${i}-${i + 9}`
    const option = {
      label: decade,
      value: decade,
    }
    filterOptions.push(option)
  }

  return filterOptions
}
