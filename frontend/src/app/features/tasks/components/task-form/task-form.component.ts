import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      description: [data?.description || '', Validators.required],
      deadline: [data?.deadline || '', Validators.required],
      status: [data?.status || 'pending', Validators.required],
      priority: [data?.priority || 'low', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.taskForm.value });
    }
  }
}
