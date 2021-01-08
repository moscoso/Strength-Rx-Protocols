import { ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightSearchPipe } from './highlight-search.pipe';
import { TimestampPipe } from './timestamp.pipe';

@NgModule({
    'imports': [],
    'declarations': [HighlightSearchPipe, TimestampPipe],
    'exports': [HighlightSearchPipe, TimestampPipe],
})

export class PipeModule {

    static forRoot(): ModuleWithProviders<PipeModule> {
    return {
        'ngModule': PipeModule,
        'providers': [],
    };
}
}
