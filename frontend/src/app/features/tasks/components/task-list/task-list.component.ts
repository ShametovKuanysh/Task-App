import { Component, OnInit } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Task } from 'src/app/features/models/task.model';
import { Store } from '@ngrx/store';
import { selectError, selectFilteredAndSortedTasks, selectLoading, selectPaginatedTasks, selectPaginationInfo, selectTasks } from '../../state/task.selectors';
import * as TaskActions from '../../state/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  paginationInfo$!: Observable<{ currentPage: number; pageSize: number; totalTasks: number }>;

  constructor(private dialog: MatDialog, private store: Store) {
    this.tasks$ = this.store.select(selectPaginatedTasks)
    this.loading$ = this.store.select(selectLoading)
    this.error$ = this.store.select(selectError)
    this.paginationInfo$ = this.store.select(selectPaginationInfo);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasksPerPage({page: 1, pageSize: 8}))
  }

  onPageChange(event: any): void {
    this.store.dispatch(TaskActions.loadTasksPerPage({ page: event.pageIndex + 1, pageSize: event.pageSize }));
  }

  onFilterChange(filter: string): void {
    this.store.dispatch(TaskActions.setTaskFilter({ filter }));
  }

  onSortChange(sortBy: string): void {
    this.store.dispatch(TaskActions.setTaskSortBy({ sortBy }));
  }

  deleteTask(id: number){
    this.store.dispatch(TaskActions.deleteTask({ taskId: id }));
  }

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: null, // Передаем null, так как это добавление
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(TaskActions.createTask({ task: result }));
      }
    });
  }

  editTask(task: any): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: task, // Передаем данные задачи для редактирования
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(TaskActions.updateTask({ task: result }));
      }
    });
  }

  
}
