interface Rating {
  kp: number
}

interface Poster {
  previewUrl: string
  url: string
}

export interface Movie {
  alternativeName: string
  countries: { name: string }[]
  genres: { name: string }[]
  id: string
  movieLength: string
  name: string
  poster: Poster
  rating: Rating
  year: string
}

export enum Filter {
  Country = 'country',
  Year = 'year',
  AgeRating = 'ageRating',
}

export interface FilterOption {
  label: string
  value: string | null
}

export interface Filters {
  country: string
  year: string
  ageRating: string
}
