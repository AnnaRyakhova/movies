interface Rating {
  kp: number
}

interface Poster {
  previewUrl: string
  url: string
}

export interface Movie {
  name: string
  alternativeName: string
  year: string
  movieLength: string
  genres: { name: string }[]
  countries: { name: string }[]
  poster: Poster
  rating: Rating
}
