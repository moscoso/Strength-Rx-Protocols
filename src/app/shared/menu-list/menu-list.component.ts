import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
    'selector': 'menu-list',
    'templateUrl': './menu-list.component.html',
    'styleUrls': ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {

    @Input() items: MenuItem[] = [];

    constructor(
        public menuController: MenuController
    ) {}

    ngOnInit() {}

    scrollPage(s: string) {
        const options: ScrollIntoViewOptions = { 'behavior': 'smooth', 'block': 'start', 'inline': 'nearest' };
        document.getElementById(s).scrollIntoView(options);
        this.menuController.close();
    }
}


export interface MenuItem {
    label: string;
    icon ?: string;
    src ?: string;
    link ?: string;
    href ?: string;
    scrollID ?: string;
}
