import { Component, Input, OnInit } from '@angular/core';
import { firstRequestComplete } from 'src/util/operator/Operators';

@Component({
    selector: 'entity-list-refresher',
    templateUrl: './entity-list-refresher.component.html',
    styleUrls: ['./entity-list-refresher.component.scss'],
})
export class EntityListRefresherComponent implements OnInit {

    @Input() dispatcher: any;

    ready = true;

    constructor() {}

    ngOnInit() {
        const function1Undefined = typeof this.dispatcher.selectRequestInProgress !== 'function';
        if(function1Undefined) {
            throw new Error(`Invalid dispatcher. it does not have a requestInProgress() function`);
        }
        const function2Undefined = typeof this.dispatcher.refreshAll !== 'function'
        if(function2Undefined){
            throw new Error(`invalid dispatcher. it does not have a refreshAll() function`);
        }
    }

    doRefresh(event): void {
        this.refresh();
        
        this.dispatcher.selectRequestInProgress().pipe(firstRequestComplete).toPromise()
                .then(() => { event.target.complete(); });
        
    }

    refresh(): void {
        this.dispatcher.refreshAll();
    }

}
