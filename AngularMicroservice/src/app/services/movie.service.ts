import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import { StorageService } from "./storage.service";

import { Movie, VisitMovie } from "../models/movie.model";

const RECENT_VISITED_KEY = "recent-movies";
const STORAGE_BUFFER = 5;

@Injectable({ providedIn: "root" })
export class MovieService {

	recentVisitedMovies$: BehaviorSubject<VisitMovie[]> = new BehaviorSubject<VisitMovie[]>([]);

	private readonly dataURL = "assets/movie.mock-data.json";

	constructor(
		private http: HttpClient,
		private storageService: StorageService
	) {
		this.refreshRecentVisitedMovies();
	}

	getAllMovies(): Observable<Movie[]> {
		return this.http.get<Movie[]>(this.dataURL);
	}

	addRecentVisitedMovie(visitedMovie: Movie): void {
		const allRecentMovies = [...this.recentVisitedMovies$.getValue()];
		const foundIndex = allRecentMovies.findIndex((movie: VisitMovie) => movie.id === visitedMovie.id);

		if (foundIndex !== -1) {
			allRecentMovies.splice(foundIndex, 1);
		}

		if (allRecentMovies.length >= STORAGE_BUFFER) {
			allRecentMovies.pop();
		}
		allRecentMovies.unshift({
			id: visitedMovie.id,
			title: visitedMovie.title,
			slug: visitedMovie.slug
		});

		if (this.storageService.setLocalStorage(RECENT_VISITED_KEY, allRecentMovies)) {
			this.refreshRecentVisitedMovies();
		}
	}

	private refreshRecentVisitedMovies(): void {
		const savedRecentMovies: VisitMovie[] | undefined = this.storageService.getLocalStorage(RECENT_VISITED_KEY);

		if (savedRecentMovies) {
			this.recentVisitedMovies$.next(savedRecentMovies);
		}
	}

}
