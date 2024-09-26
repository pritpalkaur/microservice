import { Injectable } from "@angular/core";

const getKey: (key: string) => string = (key: string) => `innovio-ui-${key}`;

@Injectable({ providedIn: "root" })
export class StorageService {

	getLocalStorage<T>(key: string): T | undefined {
		if (key) {
			const actualKey = getKey(key);
			const strData = localStorage.getItem(actualKey);

			if (strData) {
				try {
					return JSON.parse(strData) as T;
				} catch (err) {
					console.error("Unable get storage data.");
				}
			}
		} else {
			console.error("The provided key is empty");
		}
		return undefined;
	}

	setLocalStorage<T>(key: string, data: T): boolean {
		if (key) {
			const actualKey = getKey(key);

			try {
				const strData = JSON.stringify(data);
				localStorage.setItem(actualKey, strData);
				return true;
			} catch (err) {
				console.error("Unable set data to storage.");
			}
		} else {
			console.error("The provided key is empty");
		}
		return false;
	}

}
