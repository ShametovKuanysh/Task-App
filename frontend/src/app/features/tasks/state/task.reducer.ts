import { createReducer, on } from '@ngrx/store';
import { loadTasks, loadTasksSuccess, loadTasksFailure, createTask, createTaskSuccess, createTaskFailure, updateTask, deleteTask, updateTaskSuccess, deleteTaskSuccess, updateTaskFailure, deleteTaskFailure, setTaskFilter, setTaskSortBy, loadTasksPerPage } from './task.actions';
import { Task } from '../../models/task.model';

export interface TaskState {
  tasks: Task[];
  filter: string;
  sortBy: string;
  currentPage: number;
  pageSize: number;
  totalTasks: number;
  loading: boolean,
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  filter: '',
  sortBy: '',
  currentPage: 1,
  pageSize: 8,
  totalTasks: 0,
  loading: false,
  error: null
};

export const taskReducer = createReducer(
  initialState,
  on(loadTasks, state => ({ ...state, loading: true, error: null })),
  // on(loadTasksSuccess, (state, { tasks }) => ({ ...state, loading: false, tasks })),
  on(loadTasksFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(loadTasksPerPage, (state, { page, pageSize }) => ({
    ...state,
    loading: true,
    currentPage: page,
    pageSize
  })),
  on(loadTasksSuccess, (state, { tasks, totalTasks }) => ({
    ...state,
    loading: false,
    tasks,
    totalTasks
  })),
  on(createTask, updateTask, deleteTask, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(createTaskSuccess, (state, { task }) => ({
    ...state,
    // tasks: [...state.tasks, task],
    loading: false,
  })),
  on(updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    loading: false,
  })),
  on(deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
    loading: false,
  })),
  on(createTaskFailure, updateTaskFailure, deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setTaskFilter, (state, { filter }) => ({
    ...state,
    filter
  })),
  on(setTaskSortBy, (state, { sortBy }) => ({
    ...state,
    sortBy
  })),
);
