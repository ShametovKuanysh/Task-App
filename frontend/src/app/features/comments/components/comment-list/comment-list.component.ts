import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsService } from '../../services/comments.service';
import { Comment } from 'src/app/features/models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() taskId!: number;
  comments$!: Observable<Comment[]>;

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.comments$ = this.commentsService.getComments(this.taskId);
  }
}
