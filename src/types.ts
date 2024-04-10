interface Rating {
  kp: number
}

interface Poster {
  previewUrl: string
  url: string
}

export interface SimilarMovie {
  name: string
  poster: {
    url: string
    previewUrl: string
  }
  type: string
  year: number
}

export interface Person {
  name: string
  profession: string
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
  description: string
  shortDescription: string
  similarMovie: SimilarMovie
  persons: Person[]
  isSeries: boolean
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

export interface Episode {
  number: number
  name: string
  seasonNumber: number
  description?: string
}
export interface Season {
  number: number
  episodes: Episode[]
  episodesCount: number
  name: string
}

export interface Review {
  author: string
  title: string
  review: string
  type: string
}
