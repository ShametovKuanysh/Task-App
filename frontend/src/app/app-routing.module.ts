import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/components/auth/auth.component';
import { authGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'tasks', loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TasksModule), canActivate: [authGuard]},
  { path: 'comments', loadChildren: () => import('./features/comments/comments.module').then(m => m.CommentsModule), canActivate: [authGuard] },
  { path: 'profile', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule), canActivate: [authGuard] },
  { path: 'auth/:mode', component: AuthComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
