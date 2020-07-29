import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../menu-list/menu-list.component';

@Component({
    'selector': 'menu-item-label',
    'templateUrl': './menu-item-label.component.html',
    'styleUrls': ['./menu-item-label.component.scss'],
})
export class MenuItemLabelComponent implements OnInit {

    @Input() page: MenuItem;

    constructor() {}

    ngOnInit() {}

}
