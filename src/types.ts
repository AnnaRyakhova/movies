interface Rating {
  kp: number
}

export interface Poster {
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
  id: number
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
  similarMovies: SimilarMovie[]
  persons: Person[]
  isSeries: boolean
}

export enum Filter {
  Country = 'country',
  Year = 'year',
  AgeRating = 'ageRating',
  Page = 'page',
  PageSize = 'pageSize',
  Search = 'search',
}

export interface FilterOption {
  label: string
  value: string | null
}

export interface Filters {
  country: string
  year: string
  ageRating: string
  page: string
  pageSize: string
  search: string
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
  id: string
}

export interface ResponseData<T> {
  docs: T[]
  total: number
}
