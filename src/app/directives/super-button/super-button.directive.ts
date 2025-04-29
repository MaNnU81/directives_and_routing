import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appSuperButton]'
})
export class SuperButtonDirective {

  el = inject(ElementRef);
  @Input({alias: 'appSuperButton'}) set backgroundColor(value:string){
    if (value) {this.el.nativeElement.style.backgroundColor = value;
  }
}

@Input({alias: 'font-color'}) set color(value:string){
  if (value) {this.el.nativeElement.style.color = value;
}
}

  constructor() {
    console.log('ref', this.el);
    
    this.el.nativeElement.style.backgroundColor = 'lightblue';
   }



}
