import { useState, useEffect } from 'react'
import { getCountryOptions } from './getCountryOptions'
import { FilterOption } from 'src/types'

export const useCountryOptions = () => {
  const [countryOptions, setCountryOptions] = useState<FilterOption[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryOptions = await getCountryOptions()
        setCountryOptions(countryOptions)
      } catch {
        console.log('error')
      }
    }

    fetchData()
  }, [])

  return { countryOptions }
}
