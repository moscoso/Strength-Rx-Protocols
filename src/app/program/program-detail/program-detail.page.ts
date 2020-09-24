import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/core/state/program/program.state';
import { Observable } from 'rxjs';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';
import { EditProgramPage } from '../edit-program/edit-program.page';
import { first } from 'rxjs/operators';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { ModalController, ActionSheetController } from '@ionic/angular';

@Component({
    'selector': 'app-program-detail',
    'templateUrl': './program-detail.page.html',
    'styleUrls': ['./program-detail.page.scss'],
})
export class ProgramDetailPage implements OnInit {

    program$: Observable < Program > ;
    isTrainer$: Observable < boolean > ;

    constructor(
        public profileService: ProfileStoreDispatcher,
        public programService: ProgramStoreDispatcher,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
    ) {}

    ngOnInit() {
        this.programService.loadAll();
        this.program$ = this.programService.selectProgramByRouteURL();
        this.isTrainer$ = this.profileService.selectUserIsTrainer();
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

    // getWorkout(workoutID: string, program: Program): Workout {
    //     return program.workouts[workoutID];
    // }

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
                'handler': () => {this.requestDelete(); }
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
