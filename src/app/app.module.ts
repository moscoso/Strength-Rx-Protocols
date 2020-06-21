import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';


@NgModule({
    'declarations': [AppComponent],
    'imports': [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        CoreModule,
        ServiceWorkerModule.register('ngsw-worker.js', { 'enabled': environment.production })
    ],
    'providers': [
        { 'provide': RouteReuseStrategy, 'useClass': IonicRouteStrategy },
    ],
    'bootstrap': [AppComponent],
})
export class AppModule {}
