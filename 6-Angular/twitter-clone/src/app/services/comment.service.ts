import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

  getCommentsByPost(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?postId=${postId}`);
  }
}

