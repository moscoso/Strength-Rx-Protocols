import { Component, OnInit, Input } from '@angular/core';

@Component({
    'template': `<youtube-player [videoId]="videoID"></youtube-player>`,
    'selector': 'app-youtube-player',
})
export class YoutubePlayerComponent implements OnInit {

    @Input() videoID: string;

    ngOnInit() {
        console.log(this.videoID);
        // This code loads the IFrame Player API code asynchronously, according to the instructions at
        // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }

}
