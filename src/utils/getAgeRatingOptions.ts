import { FilterOption } from 'src/types'

export const ageRatings = ['0', '6', '12', '16', '18']

const defaultValue = { label: 'Для любого возраста', value: '' }

export const getAgeRatingOptions = (): FilterOption[] => {
  const ratings = ageRatings.map((rating) => ({ value: rating, label: `${rating}+` }))

  return [defaultValue, ...ratings]
}
