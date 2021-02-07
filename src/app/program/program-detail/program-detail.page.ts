import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/core/state/program/program.model';
import { Observable, of } from 'rxjs';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';
import { EditProgramPage } from '../edit-program/edit-program.page';
import { first, map } from 'rxjs/operators';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { ClientStoreDispatcher } from 'src/app/core/state/client/client.dispatcher';
import { Client } from 'src/app/core/state/client/client.model';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';

@Component({
    'selector': 'app-program-detail',
    'templateUrl': './program-detail.page.html',
    'styleUrls': ['./program-detail.page.scss'],
})
export class ProgramDetailPage implements OnInit {

    program$: Observable < Program > ;
    isMasterProgram = false;
    isTrainer$: Observable < boolean > = of(false);

    constructor(
        public programService: ProgramStoreDispatcher,
        public modalCtrl: ModalController,
        public profileService: ProfileStoreDispatcher,
        public clientService: ClientStoreDispatcher,
        public actionSheetCtrl: ActionSheetController,
        public routerService: RouterStoreDispatcher,
    ) {}

    ngOnInit() {
        this.checkPrivileges();
        this.loadProgram();
    }

    async checkPrivileges() {
        this.isTrainer$ = this.profileService.selectUserIsTrainer();
    }

    async loadProgram() {
        const routerState = await this.routerService.selectState().pipe(first()).toPromise();
        const url = routerState.state.url;
        this.isMasterProgram = url.indexOf('/programs') === 0;
        const belongsToUser = url === '/profile/program';
        if (this.isMasterProgram) {
            this.programService.loadAll();
            this.program$ = this.programService.selectProgramByRouteURL();
        } else {
            this.clientService.loadAll();
            let client$: Observable < Client >;
            if (belongsToUser) {
                client$ = this.clientService.selectUserAsClient();
            } else {
                const clientID = routerState.state.params.id;
                client$ = this.clientService.selectClient(clientID);
            }
            this.program$ = client$.pipe(
                first(client => client != null),
                map(client => client.assignedProgram)
            );
        }
    }

    doRefresh(event): void {
        this.programService.loadAll();
        this.programService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    getDayList() {
        return ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
    }

    async showEditModal(): Promise < void > {
        const modal = await this.modalCtrl.create({
            'id': 'edit-program',
            'component': EditProgramPage,
            'cssClass': 'modal-80-width'
        });
        await modal.present();
        return;
    }

    async showActionSheetToDelete(): Promise < void > {
        const actionSheet = await this.actionSheetCtrl.create({
            'id': 'delete-program',
            'header': 'Are you sure you want to delete?',
            'buttons': [
            {
                'text': 'Delete',
                'role': 'destructive',
                'icon': 'trash',
                'handler': () => { this.requestDelete(); }
            }, {
                'text': 'Cancel',
                'role': 'cancel'
            }],
        });
        actionSheet.present();
    }

    async requestDelete(): Promise < void > {
        const program = await this.program$.pipe(first()).toPromise();
        this.programService.delete(program.id);
    }
}
