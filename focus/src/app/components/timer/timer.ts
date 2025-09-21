import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TimerState = 'stopped' | 'running' | 'paused';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.html',
  styleUrl: './timer.scss'
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() initialMinutes: number = 25;
  @Input() currentTask: string = 'Completar informe mensual';

  @Output() timerComplete = new EventEmitter<void>();
  @Output() timerStateChange = new EventEmitter<TimerState>();

  minutes: number = 25;
  seconds: number = 0;
  totalSeconds: number = 0;
  initialTotalSeconds: number = 0;
  state: TimerState = 'stopped';

  private intervalId?: number;

  ngOnInit(): void {
    this.resetTimer();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  get displayTime(): string {
    return `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
  }

  get progressPercentage(): number {
    if (this.initialTotalSeconds === 0) return 0;
    return ((this.initialTotalSeconds - this.totalSeconds) / this.initialTotalSeconds) * 100;
  }

  get strokeDasharray(): string {
    const circumference = 2 * Math.PI * 120; // radius = 120
    return `${circumference} ${circumference}`;
  }

  get strokeDashoffset(): string {
    const circumference = 2 * Math.PI * 120;
    const offset = circumference - (this.progressPercentage / 100) * circumference;
    return offset.toString();
  }

  startTimer(): void {
    if (this.state === 'running') return;

    this.state = 'running';
    this.timerStateChange.emit(this.state);

    this.intervalId = window.setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        this.updateDisplayTime();
      } else {
        this.completeTimer();
      }
    }, 1000);
  }

  pauseTimer(): void {
    if (this.state !== 'running') return;

    this.state = 'paused';
    this.timerStateChange.emit(this.state);
    this.clearInterval();
  }

  stopTimer(): void {
    this.state = 'stopped';
    this.timerStateChange.emit(this.state);
    this.clearInterval();
    this.resetTimer();
  }

  private resetTimer(): void {
    this.minutes = this.initialMinutes;
    this.seconds = 0;
    this.totalSeconds = this.initialMinutes * 60;
    this.initialTotalSeconds = this.totalSeconds;
  }

  private updateDisplayTime(): void {
    this.minutes = Math.floor(this.totalSeconds / 60);
    this.seconds = this.totalSeconds % 60;
  }

  private completeTimer(): void {
    this.state = 'stopped';
    this.timerStateChange.emit(this.state);
    this.clearInterval();
    this.timerComplete.emit();
  }

  private clearInterval(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}