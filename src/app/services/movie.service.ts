import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Movie, MovieResponse } from '../models/movie.model'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = '../../assets/movies.json'
  private movies: Movie[] = []

  constructor(private http: HttpClient) {}

  getMovies(): Observable<MovieResponse> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => {
        this.movies = data.map(item => ({
          title: item.Title || 'Título no disponible',
          description: item.Plot || 'Descripción no disponible',
          year: item.Released || 'Año no disponible',
          duration: item.Runtime || 'Duración no disponible',
          genre: item.Genre || 'Género no disponible',
          image: item.Images[0]
        }))
        return {movies: this.movies}
      }),
      catchError(error => {
        console.error('No se pudieron cargar las películas. Intenta más tarde.").:', error)
        return of({ movies: [], error: 'No se pudieron cargar las películas. Intenta más tarde.' })
      })
    )
  }

  getMovieByTitle(title: string) {
    return this.movies.find(item => item.title === title)
  }
}
