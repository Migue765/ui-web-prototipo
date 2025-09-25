import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'disabled';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && this.variant !== 'disabled') {
      this.clicked.emit();
    }
  }

  get buttonClasses(): string {
    const classes = ['btn'];

    classes.push(`btn--${this.variant}`);
    classes.push(`btn--${this.size}`);

    if (this.disabled || this.variant === 'disabled') {
      classes.push('btn--disabled');
    }

    if (this.fullWidth) {
      classes.push('btn--full-width');
    }

    return classes.join(' ');
  }
}