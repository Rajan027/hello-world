import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('appInputFormat') format;

  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    const value: string = this.el.nativeElement.value;
    if (this.format === 'lowercase') {
      this.el.nativeElement.value = value.toLowerCase();
    } else {
      this.el.nativeElement.value = value.toUpperCase();
    }
  }
}
