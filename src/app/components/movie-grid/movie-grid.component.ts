import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core'
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
  columnas: number = 4
  index: number = 0
  circle: boolean = true
  searchTerm: string = ''
  focus: string = ''

  @ViewChildren('movie') refMovies!: QueryList<ElementRef>
  @ViewChild('searchInput') refSearchInput!: ElementRef
  
  constructor(private moviesService: MoviesService, private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data.movies 
      this.filteredMovies = data.movies
      this.error = data.error || ''
    })
  }

  ngAfterViewInit(): void {
    this.refMovies.changes.subscribe(() => {
      if(this.index === 0 && !this.focus && this.filteredMovies.length > 0) {
        this.setFocus('grid', this.index)
      }
    })
  }
  
  onClick(movie: Movie) {
    if (movie) {
      this.router.navigate(['/movie', movie.title])
      .catch(() => {
        this.router.navigate(['/'])
      })
    }
  }

  onSearch(term: string) {
    this.searchTerm = term
    if(this.searchTerm !== '') {
      const filtered = this.movies.filter(item => item.title.toLowerCase().includes(term.toLowerCase()))

      this.error = filtered.length === 0 ? 'No se han encontrado peliculas con ese titulo.' : ''
      this.filteredMovies = filtered
    } else {
      this.filteredMovies = this.movies
    }

  }

  onHover(index: number) {
    this.setFocus('grid', index)
  }

  onKeyDown(event: KeyboardEvent, currentIndex: number): void {
    let newIndex = currentIndex || this.index
    switch(event.key) {
      case 'Enter':
        if(this.focus === 'grid') {
          const movie = this.filteredMovies[newIndex]
          if (movie) {
            this.router.navigate(['/movie', movie.title])
            .catch(() => {
              this.router.navigate(['/'])
            })
          }
        }
        break
      case 'ArrowRight':
        if(this.focus === 'grid') {
          if(newIndex + 1 <= this.filteredMovies.length - 1) newIndex += 1
          else if(newIndex === this.filteredMovies.length - 1 && this.circle) newIndex = 0
          this.setFocus('grid', newIndex)
        }
        break
      case 'ArrowLeft':
        if(this.focus === 'grid') {
          if(newIndex - 1 >= 0) newIndex -= 1
          else if(newIndex === 0 && this.circle) newIndex = this.filteredMovies.length - 1
          this.setFocus('grid', newIndex)
        }
        break
      case 'ArrowDown':
        const sumIndex = newIndex + this.columnas
        if(this.focus === 'search') {
          this.setFocus('grid', this.index > this.filteredMovies.length - 1 ? 0 : this.index)
        } else if(this.focus === 'grid') {
          if(sumIndex <= this.filteredMovies.length - 1) newIndex = sumIndex
          else if(this.circle) newIndex = Number(sumIndex % this.columnas)
          this.setFocus('grid', newIndex)
        }
        break
      case 'ArrowUp':
        if(this.focus === 'grid') {
          const subIndex = newIndex - this.columnas
          if(subIndex >= 0) {
            newIndex = subIndex
            this.setFocus('grid', newIndex)
          } else this.setFocus('search')
        }
        break
    }
    if(this.focus === 'grid') event.preventDefault()
  }

  setFocus(element: string, index?: number) {
    if(element === 'search') {
      this.focus = 'search'
      const focusElement = this.renderer.selectRootElement(this.refSearchInput.nativeElement, true)
      const cardFocused = document.getElementsByClassName('focused')
      if(cardFocused && cardFocused.length > 0) {
        cardFocused[0].classList.remove('focused')
      }
      focusElement.focus()
    } else if(element === 'grid') {
      this.focus = 'grid'
      this.focusByTabIndex(index || 0)
    }
  }

  focusByTabIndex(tabIndex: number): void {
    if(this.refMovies && tabIndex >= 0 && this.filteredMovies.length > 0) {
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

}
