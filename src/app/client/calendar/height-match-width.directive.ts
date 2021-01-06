import {
    Directive,
    ElementRef,
    AfterViewChecked,
    Input,
    HostListener
} from '@angular/core';

@Directive({
    'selector': '[myMatchHeight]'
})
export class HeightMatchWidthDirective implements AfterViewChecked {

    // class name to match height
    @Input()
    myMatchHeight: any;

    constructor(private el: ElementRef) {}

    ngAfterViewChecked() {
        this.matchHeight();
    }

    @HostListener('window:resize')
    onResize() {
        this.matchHeight();
    }

    matchHeight() {
        const element = this.el.nativeElement;
        const width = element.getBoundingClientRect().width;
        element.style.height = `${width}px`;
    }
}
