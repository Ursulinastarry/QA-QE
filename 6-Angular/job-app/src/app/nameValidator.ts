import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NameValidator {
  constructor(private http: HttpClient) {}

  checkNameExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ nameTaken: boolean } | null> => {
      if (!control.value) {
        return of(null); // Return an observable that emits null if no value
      }

      return this.http.get<{ exists: boolean }>(`http://localhost:3000/check-name/${control.value}`).pipe(
        debounceTime(500), // Reduce API calls
        switchMap(response => response.exists ? of({ nameTaken: true }) : of(null)), // Properly return the expected structure
        catchError(() => of(null)) // Handle errors gracefully
      );
    };
  }
}
