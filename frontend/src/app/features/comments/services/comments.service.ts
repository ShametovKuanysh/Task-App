import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = `${environment.apiUrl}/api/v1/comments`;

  constructor(private http: HttpClient) { }

  getComments(taskId: number){
    return this.http.get<any[]>(`${this.apiUrl}/${taskId}/comments`);
  }

  addComment(comment: string, taskId: number){
    return this.http.post(`${this.apiUrl}/${taskId}/comments`, {content: comment});
  }
}
