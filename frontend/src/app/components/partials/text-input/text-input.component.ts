/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen = true;
  @Input()
  label!: string;
  @Input()
  type: 'text' | 'password' | 'email' = 'text';
  @Input()
  value: string | null = null; // Add value input property

  @Output() valueChange = new EventEmitter<string>();

  get formControl() {
    return this.control as FormControl;
  }
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
