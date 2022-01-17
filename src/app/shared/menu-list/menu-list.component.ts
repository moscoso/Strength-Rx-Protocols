import { Component, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
    'selector': 'menu-list',
    'templateUrl': './menu-list.component.html',
    'styleUrls': ['./menu-list.component.scss'],
})
export class MenuListComponent {

    @Input() items: MenuItem[] = [];

    constructor(
        public menuController: MenuController
    ) {}


    scrollPage(s: string) {
        // const options: ScrollIntoViewOptions = { 'behavior': 'smooth', 'block': 'start', 'inline': 'nearest' };
        document.getElementById(s).scrollIntoView();
        this.menuController.close();
    }
}


export interface MenuItem {
    label: string;
    icon ?: string;
    src ?: string;
    img ?: string;
    link ?: string;
    href ?: string;
    scrollID ?: string;
}
