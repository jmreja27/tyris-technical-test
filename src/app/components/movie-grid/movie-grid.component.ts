import { Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core'
import { Router } from '@angular/router'
import { Movie } from 'src/app/models/movie.model'
import { MoviesService } from 'src/app/services/movie.service'

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {
  movies: Movie[] = []
  filteredMovies: Movie[] = []
  error: string = ''
  columnas = 4
  index = 0
  circle = true
  searchTerm: string = ''

  @ViewChildren('movie') refMovies!: QueryList<ElementRef>
  
  constructor(private moviesService: MoviesService, private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data.movies
      this.filteredMovies = data.movies
      this.error = data.error
    })
  }

  ngAfterViewInit(): void {
    this.refMovies.changes.subscribe(() => {
      if(this.index === 0 && !this.searchTerm) this.focusByTabIndex(this.index)
    })
  }
  
  onClick(movie: Movie) {
    if (movie) {
      this.router.navigate(['/movie', movie.title])
      .catch(() => {
        this.error = 'No se se pudo acceder a los detalles de la Movie.'
        this.router.navigate(['/'])
      })
    }
  }

  onSearch(term: string) {
    this.searchTerm = term
    if(this.searchTerm !== '') {
      const filtered = this.movies.filter(item => item.title.toLowerCase().includes(term.toLowerCase()))

      if (filtered.length === 0) {
        this.error = 'No se han encontrado peliculas con ese titulo.'
      } else {
        this.error = ''
      }
      this.filteredMovies = filtered
    } else {
      this.filteredMovies = this.movies
    }

  }

  onHover(index: number) {
    this.focusByTabIndex(index)
  }

  onKeyDown(event: KeyboardEvent, currentIndex: number): void {
    let newIndex = currentIndex || this.index
    switch(event.key) {
      case 'Enter':
        const movie = this.filteredMovies[newIndex]
        if (movie) {
          this.router.navigate(['/movie', movie.title])
        }
        break
      case 'ArrowRight':
        if(newIndex + 1 <= this.movies.length - 1) newIndex += 1
        else if(newIndex === this.movies.length - 1 && this.circle) newIndex = 0
        break
      case 'ArrowLeft':
        if(newIndex - 1 >= 0) newIndex -= 1
        else if(newIndex === 0 && this.circle) newIndex = this.movies.length - 1
        break
      case 'ArrowDown':
        const sumIndex = newIndex + this.columnas
        if(sumIndex <= this.movies.length - 1) newIndex = sumIndex
        else if(this.circle) newIndex = Number(sumIndex % this.columnas)
        break
      case 'ArrowUp':
        const subIndex = newIndex - this.columnas
        if(subIndex >= 0) newIndex = subIndex
        else if(this.circle) newIndex = this.movies.length + subIndex
        break
    }
    event.preventDefault()
    this.focusByTabIndex(newIndex)
  }

  focusByTabIndex(tabIndex: number): void {
    this.refMovies.forEach((ref, i) => {
      if (i === tabIndex) {
        this.index = tabIndex
        this.renderer.addClass(ref.nativeElement, 'focused')
        ref.nativeElement.focus()
      } else {
        this.renderer.removeClass(ref.nativeElement, 'focused')
      }
    })
  }

}
