import { Component, OnInit } from '@angular/core';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { first, startWith } from 'rxjs/operators';
import { CreateProgramPage } from '../create-program/create-program.page';
import { Program } from 'src/app/core/state/program/program.model';
import Fuse from 'fuse.js';
import { Observable, of, Subject, combineLatest } from 'rxjs';
import { ModalController } from '@ionic/angular';

@UntilDestroy()
@Component({
    'selector': 'app-program-list',
    'templateUrl': './program-list.page.html',
    'styleUrls': ['./program-list.page.scss'],
})
export class ProgramListPage implements OnInit {

    programs$: Observable < Program[] > = of ([]);
    searchTerm$: Subject < string > = new Subject();
    programList: Program[] = [];
    requestInProgress$: Observable < boolean > = of (false);

    constructor(
        public modalController: ModalController,
        public programService: ProgramStoreDispatcher,
    ) {}

    ngOnInit(): void {
        this.initWorkoutList();
    }

    async initWorkoutList() {
        this.programService.loadAll();
        this.requestInProgress$ = this.programService.selectRequestInProgress();
        this.programs$ = this.programService.selectAll();
        this.programs$.pipe(untilDestroyed(this)).subscribe();
        combineLatest([this.programs$, this.searchTerm$.pipe(startWith(''))]).subscribe(
            ([programs, searchTerm]) => this.filterPrograms([programs, searchTerm])
        );
    }

    doRefresh(event): void {
        this.programService.loadAll();
        this.programService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'create-program',
            'component': CreateProgramPage,
            'cssClass': 'modal-80-width'
        });
        await modal.present();
        return;
    }

    search(event) {
        const searchTerm = event.srcElement.value;
        this.searchTerm$.next(searchTerm);
    }

    private filterPrograms([programs, searchTerm]: [Program[], string]) {
        searchTerm = searchTerm.trim();

        if (searchTerm.length === 0) {
            this.programList = programs;
        } else {
            const options = {
                'includeScore': true,
                'keys': ['name', 'tags'],
                'shouldSort': true,
            };
            const searcher = new Fuse(programs, options);
            const matches = searcher.search(searchTerm);
            this.programList = matches.map(match => match.item);
        }
    }


}
