import { Component, ElementRef, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { Movie } from "src/app/models/movie.model"
import { MoviesService } from "src/app/services/movie.service"

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
  movie: Movie | null = null

  @ViewChild('backButton') backButtonRef!: ElementRef

  constructor(
    private router: Router, 
    private moviesService: MoviesService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const titleMovie = this.route.snapshot.paramMap.get('title')
    if (titleMovie) {
      this.movie = this.moviesService.getMovieByTitle(titleMovie) || null
    }
  }

  ngAfterViewInit() {
    if (this.backButtonRef) this.backButtonRef.nativeElement.focus()
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.goBack()
      event.preventDefault()
    }
  }

  goBack() {
    this.router.navigate(['/'])
  }
}
