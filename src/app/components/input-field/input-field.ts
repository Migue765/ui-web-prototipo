import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputState = 'normal' | 'focus' | 'error' | 'disabled';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: InputType = 'text';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';
  @Input() helperText: string = '';
  @Input() state: InputState = 'normal';
  @Input() fullWidth: boolean = true;

  @Output() valueChange = new EventEmitter<string>();
  @Output() focused = new EventEmitter<void>();
  @Output() blurred = new EventEmitter<void>();

  value: string = '';
  isFocused: boolean = false;

  // ControlValueAccessor implementation
  private onChange = (value: string) => { };
  private onTouched = () => { };

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onFocus(): void {
    this.isFocused = true;
    this.focused.emit();
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.blurred.emit();
  }

  get inputClasses(): string {
    const classes = ['input-field'];

    if (this.state === 'error' || this.errorMessage) {
      classes.push('input-field--error');
    } else if (this.isFocused) {
      classes.push('input-field--focus');
    } else if (this.disabled) {
      classes.push('input-field--disabled');
    } else {
      classes.push('input-field--normal');
    }

    if (this.fullWidth) {
      classes.push('input-field--full-width');
    }

    return classes.join(' ');
  }

  get containerClasses(): string {
    const classes = ['input-container'];

    if (this.fullWidth) {
      classes.push('input-container--full-width');
    }

    return classes.join(' ');
  }

  get hasError(): boolean {
    return this.state === 'error' || !!this.errorMessage;
  }
}