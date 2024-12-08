import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/features/models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  taskId!: number;
  task$!: Observable<Task>;

  constructor(private route: ActivatedRoute, private tasksService: TaskService) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];
    this.loadTask();
  }

  loadTask() {
    this.task$ = this.tasksService.getTaskById(this.taskId);
  }

  refreshComments() {
    // Логика для обновления комментариев, если необходимо
    // Например, можно вызвать метод в компоненте списка комментариев
  }
}
