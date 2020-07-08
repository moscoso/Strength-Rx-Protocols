import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, OnInit, AfterContentInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from 'src/app/account/register/register.page';
import { environment } from 'src/environments/environment';

@Component({
    'selector': 'app-landing',
    'templateUrl': './landing.page.html',
    'styleUrls': ['./landing.page.scss'],
})
export class LandingPage implements OnInit, AfterViewInit {

    @ViewChild('header', { 'read': ElementRef}) header: ElementRef < HTMLIonHeaderElement > ;
    @ViewChild('video') video: ElementRef < HTMLVideoElement > ;

    headerHeight = 100;

    constructor(
        public modalController: ModalController
    ) {}

    ngOnInit() {
        window.addEventListener('resize', (e) => {
            this.setHeaderHeight();
        });

        window.addEventListener('load', () => {
            this.setHeaderHeight();
        });
    }

    ngAfterViewInit() {
        this.startVideo();
    }

    startVideo() {
        if (this.video) {
            this.video.nativeElement.muted = true;
            this.video.nativeElement.play();
            this.video.nativeElement.volume = .5;
        }
    }

    calcVideoHeight(): string {
        return 'calc(100vh - ' + this.headerHeight + 'px)';
    }

    setHeaderHeight() {
        const height = this.header.nativeElement.offsetHeight;
        if (this.header && height !== 0) {
            this.headerHeight = height;
        }
    }

    /**
     * Get a resource from the Firebase's project storage bucket
     * @param slug the slug of the resource
     */
    getStorageURL(slug: string) {
        const storageBucket = environment.firebase.storageBucket;
        return `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${slug}`;
    }


    async openModal() {
        const modal = await this.modalController.create({
            'id': 'register',
            'component': RegisterPage
        });
        await modal.present();
        return;
    }
}
