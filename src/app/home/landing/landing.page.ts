import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    'selector': 'app-landing',
    'templateUrl': './landing.page.html',
    'styleUrls': ['./landing.page.scss'],
})
export class LandingPage implements OnInit, AfterViewInit {

    @ViewChild('video') video: ElementRef < HTMLVideoElement > ;

    constructor() {}

    ngOnInit() { }

    ngAfterViewInit() {
        if (this.video) {
            this.video.nativeElement.muted = true;
            this.video.nativeElement.play();
            this.video.nativeElement.volume = .5;
        }


    }

}
