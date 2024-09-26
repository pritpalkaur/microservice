import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MatSelectChange } from "@angular/material/select";
import { Store } from "@ngrx/store";
import { Subject, Subscription, debounceTime } from "rxjs";
import { cloneDeep } from "lodash";

//import { movies } from "../../states/movie/movie.state";

import { Movie } from "../../models/movie.model";
const INPUT_DELAY = 500;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent  implements OnInit, OnDestroy{

    searchTerm: string | undefined = undefined;
	selectedGenres: string[] = [];
	genreOptions: string[] = [];
	displayedMovies: Movie[] = [];

	private allMovies: Movie[] = [];
	private searchTermChanged$ = new Subject<string>();
	private allSubscriptions = new Subscription();

	constructor(
		//private readonly store: Store,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		 //this.subscribeQueryparams();
		 //this.subscribeMovies();
		// this.subscribeSearchTermChanged();
	}

	ngOnDestroy(): void {
		//this.allSubscriptions.unsubscribe();
	}

	// onInputChanged(event: any): void { // eslint-disable-line @typescript-eslint/no-explicit-any
	// 	this.searchTermChanged$.next(event.target.value || "");
	// }

	// onInputResetClicked(): void {
	// 	this.searchTermChanged$.next("");
	// }

	// onGenreSelectionChanged(event: MatSelectChange): void {
	// 	const selections = event.value.includes(null) ? [] : event.value;
	// 	this.navigateToMoviesPage(this.searchTerm || "", selections);
	// }

	onMovieSelection(id: string): void {
		const selectedMovie = this.allMovies.find((movie: Movie) => movie.id === id);

		if (selectedMovie) {
			this.router.navigate([`/movie/${selectedMovie.slug}`]);
		}
	}

	// private subscribeQueryparams(): void {
	// 	this.allSubscriptions.add(
	// 		this.route.queryParams.subscribe((params: Params) => {
	// 			this.searchTerm = params["searchTerm"] || undefined;
	// 			this.selectedGenres = params["genre"]
	// 				? Array.isArray(params["genre"])
	// 					? params["genre"]
	// 					: [params["genre"]]
	// 				: [];
	// 			this.genreOptions = this.getGenreOptions(this.searchTerm);
	// 			this.extractDisplayedMovies();
	// 		})
	// 	);
	// }

	// private subscribeMovies(): void {
	// 	this.allSubscriptions.add(
	// 		this.store.select(movies).subscribe((allMovies: Movie[]) => {
	// 			this.allMovies = cloneDeep(allMovies);
	// 			this.genreOptions = this.getGenreOptions(this.searchTerm);
	// 			this.extractDisplayedMovies();
	// 		})
	// 	);
	// }

	// private subscribeSearchTermChanged(): void {
	// 	this.allSubscriptions.add(
	// 		this.searchTermChanged$
	// 			.pipe(debounceTime(INPUT_DELAY))
	// 			.subscribe((input: string) => {
	// 				this.navigateToMoviesPage(input, this.selectedGenres);
	// 			})
	// 	);
	// }

	// private getGenreOptions(searchTerm: string | undefined): string[] {
	// 	const searchedMovies = this.allMovies.filter((movie: Movie) =>
	// 		movie.title.toLowerCase().includes(searchTerm?.toLowerCase() || "")
	// 	);
	// 	const allGenres = searchedMovies.flatMap((movie: Movie) => movie.genres);
	// 	return [...new Set(allGenres)].sort();
	// }

	// private extractDisplayedMovies(): void {
	// 	this.displayedMovies = this.allMovies.filter((movie: Movie) =>
	// 		movie.title.toLowerCase().includes(this.searchTerm?.toLowerCase() || "")
	// 	);

	// 	if (this.selectedGenres.length) {
	// 		this.displayedMovies = this.displayedMovies.filter((movie: Movie) =>
	// 			this.selectedGenres.some((genre: string) => movie.genres.includes(genre))
	// 		);
	// 	}
	// }

	// private navigateToMoviesPage(searchTerm: string, genres: string[]): void {
	// 	this.router.navigate(["/movies"], {
	// 		queryParams: {
	// 			searchTerm: searchTerm || undefined,
	// 			genre: genres
	// 		}
	// 	});
	// }

}
