import { TaskState } from '../features/tasks/state/task.reducer';
// import { CommentState } from '../features/comments/state/comment.reducer';

export interface AppState {
  tasks: TaskState;
//   comments: CommentState;
}
