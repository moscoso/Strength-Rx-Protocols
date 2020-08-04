import { NgModule } from '@angular/core';
import { HighlightSearchPipe } from './highlight-search.pipe';

@NgModule({
    'imports': [],
    'declarations': [HighlightSearchPipe],
    'exports': [HighlightSearchPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            'ngModule': PipeModule,
            'providers': [],
        };
    }
}
