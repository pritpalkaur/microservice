import { createAction, props } from "@ngrx/store";

import { Movie } from "../../models/movie.model";

export enum MovieActionTypes {
	loadMovies = "[Movie] Load movies",
	updateMovies = "[Movie] Update movies",
	updateSelectedMovie = "[Movie] Update selected movie"
}

export const loadMoviesAction = createAction(MovieActionTypes.loadMovies);

export const updateMoviesAction = createAction(
	MovieActionTypes.updateMovies,
	props<{ movies: Movie[] }>()
);

export const updateSelectedMovieAction = createAction(
	MovieActionTypes.updateSelectedMovie,
	props<{ movie: Movie }>()
);
