import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatType = 'completed' | 'time' | 'tasks' | 'progress';

export interface StatData {
  type: StatType;
  title: string;
  value: string | number;
  icon: string;
  color: string;
  subtitle?: string;
}

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss'
})
export class StatsCardComponent {
  @Input() stat!: StatData;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get cardClasses(): string {
    const classes = ['stats-card'];
    classes.push(`stats-card--${this.stat.type}`);
    classes.push(`stats-card--${this.size}`);
    return classes.join(' ');
  }

  get iconClasses(): string {
    return `stats-icon stats-icon--${this.stat.type}`;
  }
}