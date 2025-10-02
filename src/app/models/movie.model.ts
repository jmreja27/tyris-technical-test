export interface Movie {
    title: string,
    description: string,
    year: string,
    duration: string,
    genre: string,
    image: string
}

export interface MovieResponse {
  movies: Movie[]
  error?: string
}