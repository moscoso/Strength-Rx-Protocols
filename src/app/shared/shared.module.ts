import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DismissModalButtonComponent } from './dismiss-modal-button/dismiss-modal-button.component';
import { IonicModule } from '@ionic/angular';
import { MenuListComponent } from './menu-list/menu-list.component';
import { RouterModule } from '@angular/router';
import { ImageComparisonModule } from './image-comparison/image-comparison.module';
import { EntityListRefresherComponent } from './entity-list-refresher/entity-list-refresher.component';


@NgModule({
    'imports': [
        IonicModule,
        RouterModule,
        CommonModule,
        ImageComparisonModule,
        YouTubePlayerModule,
    ],
    'declarations': [
        DismissModalButtonComponent,
        EntityListRefresherComponent,
        MenuListComponent,
        YoutubePlayerComponent,

    ],
    'exports': [
        DismissModalButtonComponent,
        EntityListRefresherComponent,
        ImageComparisonModule,
        MenuListComponent,
        YouTubePlayerModule,
        YoutubePlayerComponent,
    ]
})
export class SharedModule {}
