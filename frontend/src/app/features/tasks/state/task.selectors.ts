import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(selectTaskState, (state) => state.tasks);
export const selectLoading = createSelector(selectTaskState, (state) => state.loading);
export const selectError = createSelector(selectTaskState, (state) => state.error);
export const selectFilteredAndSortedTasks = createSelector(
    selectTaskState,
    (state: TaskState) => {
      let tasks = [...state.tasks];
  
      // Фильтрация
      if (state.filter === 'completed') {
        tasks = tasks.filter(task => task.status === 'completed');
      } else if (state.filter === 'pending') {
        tasks = tasks.filter(task => task.status === 'pending');
      } else if (state.filter === 'in progress') {
        tasks = tasks.filter(task => task.status === 'in progress');
      }
  
      // Сортировка
      if (state.sortBy === 'title') {
        tasks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (state.sortBy === 'deadline') {
        tasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      }
  
      return tasks;
    }
);

export const selectPaginatedTasks = createSelector(
    selectTaskState,
    (state: TaskState) => {
      // const startIndex = (state.currentPage - 1) * state.pageSize;
      // const endIndex = startIndex + state.pageSize;

      let tasks = [...state.tasks];
  
      // Фильтрация
      if (state.filter === 'completed') {
        tasks = tasks.filter(task => task.status === 'completed');
      } else if (state.filter === 'pending') {
        tasks = tasks.filter(task => task.status === 'pending');
      } else if (state.filter === 'in progress') {
        tasks = tasks.filter(task => task.status === 'in progress');
      }
  
      // Сортировка
      if (state.sortBy === 'title') {
        tasks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (state.sortBy === 'deadline') {
        tasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      }
  
      return tasks;
    }
);
  
export const selectPaginationInfo = createSelector(
    selectTaskState,
    (state: TaskState) => ({
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    totalTasks: state.totalTasks
    })
);