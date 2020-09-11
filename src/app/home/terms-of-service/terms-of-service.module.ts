import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TermsOfServicePageRoutingModule } from './terms-of-service-routing.module';
import { TermsOfServicePage } from './terms-of-service.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    'imports': [
        CommonModule,
        FormsModule,
        IonicModule,
        PdfViewerModule,
        TermsOfServicePageRoutingModule
    ],
    'declarations': [TermsOfServicePage]
})
export class TermsOfServicePageModule {}
