import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    'selector': 'app-navbar',
    'templateUrl': './navbar.component.html',
    'styleUrls': ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

    constructor() {}

    showMobileMenu = false;
    width: number;


    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.width = event.target.innerWidth;
    }

    ngOnInit() {
        this.width = window.innerWidth;
    }


    toggleMenu() {
        this.showMobileMenu = !this.showMobileMenu;
    }

    scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({ 'behavior': 'smooth', 'block': 'start', 'inline': 'nearest' });
    }


}
