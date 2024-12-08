import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/task.model';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasksPerPage),
      mergeMap(({ page, pageSize }) =>
        this.taskService.getTaskByPage(page, pageSize).pipe(
          map((response) => TaskActions.loadTasksSuccess({
            tasks: response.tasks,
            totalTasks: response.totalTasks
          })),
          catchError((error) => of(TaskActions.loadTasksFailure({ error: error.message })))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      mergeMap((action) =>
        this.taskService.createTask(action.task).pipe(
          switchMap(() => [
            TaskActions.loadTasksPerPage({ page: 1, pageSize: 8 }), // Обновляем текущую страницу
            TaskActions.createTaskSuccess(action), // Флаг успешного завершения операции
          ]),
          catchError((error) => of(TaskActions.createTaskFailure({ error })))
        )
      )
      // mergeMap(({ task }) =>
      //   this.taskService.createTask(task).pipe(
      //     switchMap(() => [
      //       TaskActions.loadTasksPerPage({ page: 1, pageSize: 8 }), // Обновляем текущую страницу
      //       TaskActions.createTaskSuccess({ task: newTask })), // Флаг успешного завершения операции
      //     ]),
      //     // map((newTask) => ,
      //     catchError((error) => of(TaskActions.createTaskFailure({ error: error.message })))
      //   )
      // )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ task }) =>
        this.taskService.updateTask(task).pipe(
          map((updatedTask) => TaskActions.updateTaskSuccess({ task: updatedTask })),
          catchError((error) => of(TaskActions.updateTaskFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ taskId }) =>
        this.taskService.deleteTask(taskId).pipe(
          map(() => TaskActions.deleteTaskSuccess({ taskId })),
          catchError((error) => of(TaskActions.deleteTaskFailure({ error: error.message })))
        )
      )
    )
  );
}
