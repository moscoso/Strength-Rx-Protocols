import { Component, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    'template': `<youtube-player [videoId]="videoID" [playerVars]="playerVars" ></youtube-player>`,
    'selector': 'app-youtube-player',
    'styleUrls': ['./youtube-player.component.scss'],
})
export class YoutubePlayerComponent implements OnChanges, OnDestroy {

    @Input() videoID: string;

    @Input() autoplay = false;

    playerVars: YT.PlayerVars;

    ngOnChanges(changes: SimpleChanges) {
        this.configurePlayer();
        const oldID = changes.videoID.previousValue;
        this.removeScript(oldID);
        this.createScript();
    }

    ngOnDestroy() {
        this.removeScript(this.videoID);
    }

    configurePlayer() {
        const autoplay: boolean = this.autoplay;
        this.playerVars = {
            'autoplay': +autoplay,
            'modestbranding': +autoplay,
            'playsinline': +autoplay,
            'fs': +(!autoplay),
            'controls': +(!autoplay),
            'loop': +autoplay,
            'showinfo': +(!autoplay),
            'playlist': this.videoID,
            'rel': 0,
        };
    }

    createScript() {
        // This code loads the IFrame Player API code asynchronously, according to the instructions at
        // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
        const tag = document.createElement('script');
        tag.id = `youtube-${this.videoID}`;
        tag.src = 'https://www.youtube.com/iframe_api?enablejsapi=1';
        document.body.appendChild(tag);
    }

    removeScript(videoID: string) {
        const oldScript = document.getElementById(`youtube-${videoID}`);
        if (oldScript) { oldScript.remove(); }
    }
}
