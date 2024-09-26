import { Action } from "@ngrx/store";

import { MovieState, initialMovieState } from "./movie.state";
import { MovieActionTypes } from "./movie.actions";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style*/

interface MovieReducer {
	[key: string]: (state: MovieState, payload: any) => MovieState;
}

const actionReducers: MovieReducer = {};
const updateMovies = (state: MovieState, { movies }: any): MovieState => {
	return { ...state, movies };
};
const updateSelectedMovie = (state: MovieState, { movie }: any): MovieState => {
	return { ...state, selectedMovie: movie };
};

actionReducers[MovieActionTypes.updateMovies] = updateMovies;
actionReducers[MovieActionTypes.updateSelectedMovie] = updateSelectedMovie;

export function movieReducer(state = initialMovieState, action?: Action): MovieState {
	if (!action) {
		return state;
	}
	const reducerFunction = actionReducers[action.type];
	return reducerFunction ? reducerFunction(state, action) : state;
}
