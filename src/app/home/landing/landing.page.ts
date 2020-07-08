import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
    'selector': 'app-landing',
    'templateUrl': './landing.page.html',
    'styleUrls': ['./landing.page.scss'],
})
export class LandingPage implements OnInit, AfterViewInit {

    @ViewChild('video') video: ElementRef < HTMLVideoElement > ;

    constructor(
        public menuController: MenuController
    ) {}

    ngOnInit() {
        this.getMenu();
    }

    async getMenu() {
        console.log(await this.menuController.getMenus());
        const menu = (await this.menuController.getMenus())[0];
        console.log(menu);
    }

    ngAfterViewInit() {
        if (this.video) {
            this.video.nativeElement.muted = true;
            this.video.nativeElement.play();
            this.video.nativeElement.volume = .5;
        }


    }

}
