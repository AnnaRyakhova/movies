import { useState, useEffect } from 'react'
import { FilterOption } from 'src/types'
import { getPossibleValues } from 'src/api'
import { toast } from 'sonner'

const startCountriesOptions: FilterOption[] = [
  { label: 'Все страны', value: '' },
  { label: 'Россия', value: 'Россия' },
  { label: 'СССР', value: 'СССР' },
  { label: 'США', value: 'США' },
]

export const useCountryOptions = () => {
  const [countryOptions, setCountryOptions] = useState<FilterOption[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryOptions = await getPossibleValues('countries.name')
        setCountryOptions([...startCountriesOptions, ...countryOptions])
      } catch {
        toast.error('Не удалось загрузить список стран')
      }
    }

    fetchData()
  }, [])

  return { countryOptions }
}
