import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const loadTasks = createAction('[Task List] Load Tasks');
export const loadTasksSuccess = createAction('[Task List] Load Tasks Success', props<{ tasks: Task[]; totalTasks: number }>());
export const loadTasksFailure = createAction('[Task List] Load Tasks Failure', props<{ error: string }>());

export const loadTasksPerPage = createAction('[Task List] Load Tasks Per Page', props<{ page: number; pageSize: number }>())

export const createTask = createAction('[Task] Create Task', props<{ task: Task }>());
export const createTaskSuccess = createAction('[Task] Create Task Success', props<{ task: Task }>());
export const createTaskFailure = createAction('[Task] Create Task Failure', props<{ error: string }>());

export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const updateTaskSuccess = createAction('[Task] Update Task Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Task] Update Task Failure', props<{ error: string }>());

export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: number }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ taskId: number }>());
export const deleteTaskFailure = createAction('[Task] Delete Task Failure', props<{ error: string }>());

export const setTaskFilter = createAction('[Task Filter] Set Filter', props<{ filter: string }>());
export const setTaskSortBy = createAction('[Task Sort By] Set Sort By', props<{ sortBy: string }>());
export const setTaskSortDirection = createAction('[Task Sort Direction] Set Sort Direction', props<{ sortDirection: string }>());

export const getTaskById = createAction('[Task] GetById Get Task', props<{ taskId: number}>())
export const getTaskByIdSuccess = createAction('[Task] GetById Get Task Success', props<{ task: Task }>())
export const getTaskByIdFailure = createAction('[Task] GetById Get Task Failure', props<{ error: string }>())

