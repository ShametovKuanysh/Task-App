import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';

import { taskReducer } from '../features/tasks/state/task.reducer';
// import { commentReducer } from '../features/comments/state/comment.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
//   comments: commentReducer,
};
