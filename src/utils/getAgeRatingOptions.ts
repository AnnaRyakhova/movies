import { FilterOption } from 'src/types'
import { ageRatings } from '../components/Filters/constants'

const defaultValue = { label: 'Для любого возраста', value: null }

export const getAgeRatingOptions = (): FilterOption[] => {
  const filterOptions: FilterOption[] = [defaultValue]

  ageRatings.forEach((rating: string) => {
    const option = { value: rating, label: `${rating}+` }
    filterOptions.push(option)
  })

  return filterOptions
}
