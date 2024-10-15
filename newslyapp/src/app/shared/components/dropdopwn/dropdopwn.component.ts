import { CommonModule } from '@angular/common';
import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdopwn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdopwn.component.html',
  styleUrl: './dropdopwn.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdopwnComponent),
      multi: true
    }
  ]
})
export class DropdopwnComponent implements ControlValueAccessor {
  @Input() options : any[] = [];
  selectedOption: string | null = null;
  isDropdownOpen = false;
  @Input() value: any;

  onChange: any = () => {};
  onTouch: any = () => {};

  setValue(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouch();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: any) {
    this.selectedOption = option.name;
    this.isDropdownOpen = false;
    this.onChange(option.name);  
    this.onTouch();
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.isDropdownOpen = false; 
    }
  }

  @HostListener('document:keydown', ['$event'])
  closeDropdownOnEsc(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isDropdownOpen = false; 
    }
  }
}
