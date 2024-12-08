import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/task.model';
import { environment } from 'src/environments/environment.production';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/api/v1/tasks`;

  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get<Task[]>(this.apiUrl)
  }

  getTaskByPage(page: number, pageSize: number): Observable<{ tasks: Task[]; totalTasks: number }> {
    return this.http.get<{ tasks: Task[]; totalTasks: number }>(
      `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
    );
  }

  getTaskById(id: number){
    return this.http.get<Task>(`${this.apiUrl}/${id}`)
  }

  createTask(task: Task){
    return this.http.post<Task>(this.apiUrl, task)
  }

  updateTask(task: Task){
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task)
  }

  deleteTask(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  
}
