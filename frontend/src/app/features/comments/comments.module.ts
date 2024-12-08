import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    CommentFormComponent,
    CommentListComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    CommentFormComponent,
    CommentListComponent
  ]
})
export class CommentsModule { }
