import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TaskStatus = 'pending' | 'completed' | 'in-progress';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  completedAt?: string;
}

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() showCheckbox: boolean = true;
  @Input() showPriority: boolean = true;
  @Input() showDueDate: boolean = true;

  @Output() taskToggled = new EventEmitter<Task>();
  @Output() taskClicked = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();

  onToggleTask(): void {
    if (this.task.status === 'completed') {
      this.task.status = 'pending';
    } else {
      this.task.status = 'completed';
      this.task.completedAt = new Date().toISOString();
    }
    this.taskToggled.emit(this.task);
  }

  onCardClick(): void {
    this.taskClicked.emit(this.task);
  }

  onDeleteTask(event: Event): void {
    event.stopPropagation();
    this.taskDeleted.emit(this.task);
  }

  get cardClasses(): string {
    const classes = ['task-card'];

    classes.push(`task-card--${this.task.status}`);
    classes.push(`task-card--${this.task.priority}`);

    return classes.join(' ');
  }

  get priorityClasses(): string {
    return `priority-badge priority-badge--${this.task.priority}`;
  }

  get statusClasses(): string {
    return `status-indicator status-indicator--${this.task.status}`;
  }

  get isCompleted(): boolean {
    return this.task.status === 'completed';
  }

  get isOverdue(): boolean {
    if (!this.task.dueDate || this.task.status === 'completed') {
      return false;
    }
    return new Date(this.task.dueDate) < new Date();
  }

  get dueDateText(): string {
    if (!this.task.dueDate) return '';

    const dueDate = new Date(this.task.dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dueDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return dueDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  }

  get priorityText(): string {
    switch (this.task.priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return '';
    }
  }
}