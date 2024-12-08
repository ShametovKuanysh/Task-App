import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  @Input() taskId!: number;
  @Output() commentAdded = new EventEmitter<void>();
  commentForm: FormGroup;

  constructor(private fb: FormBuilder, private commentsService: CommentsService) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  addComment() {
    if (this.commentForm.valid) {
      this.commentsService.addComment(this.commentForm.value.content, this.taskId).subscribe(() => {
        this.commentForm.reset();
        this.commentAdded.emit();
      });
    }
  }
}
