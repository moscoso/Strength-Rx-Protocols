import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';
import { Observable } from 'rxjs';
import { selectUserID } from '../core/state/auth/auth.selector';
import { map, first } from 'rxjs/operators';
import { CheckIn } from '../core/state/check-ins/check-in.state';
import { CreateRequested } from '../core/state/check-ins/check-in.actions';
import { ClientStoreDispatcher } from '../core/state/client/client.dispatcher';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    'selector': 'app-check-in',
    'templateUrl': './check-in.page.html',
    'styleUrls': ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {

    form: FormGroup;

    macros = new FormControl('');
    cardioProtocol = new FormControl('');
    missedCardio = new FormControl('');
    medicalIssues = new FormControl('');
    menstrualCycle = new FormControl('No');
    adherenceLevel = new FormControl(1, [Validators.min(1), Validators.max(10)]);
    weekSummary = new FormControl('');
    energyLevel = new FormControl('Great');
    requests = new FormControl('');
    questions = new FormControl('');

    monday = new FormControl(0);
    tuesday = new FormControl(0);
    wednesday = new FormControl(0);
    thursday = new FormControl(0);
    friday = new FormControl(0);
    saturday = new FormControl(0);
    sunday = new FormControl(0);


    requestInProgress$: Observable < boolean > ;
    sex$: Observable < 'M' | 'F' >;

    constructor(
        public store: Store < AppState > ,
        public clientService: ClientStoreDispatcher,
        public fb: AngularFirestore
    ) {
        this.clientService.loadAll();
        this.sex$ = this.clientService.selectUserAsClient().pipe(
            first(client => client != null),
            map(client => client.sex)
        );
    }

    ngOnInit() {

        this.form = new FormGroup({
            'macros': this.macros,
            'cardioProtocol': this.cardioProtocol,
            'missedCardio': this.missedCardio,
            'medicalIssues': this.medicalIssues,
            'menstrualCycle': this.menstrualCycle,
            'adherenceLevel': this.adherenceLevel,
            'weekSummary': this.weekSummary,
            'energyLevel': this.energyLevel,
            'requests': this.requests,
            'questions': this.questions,
            'monday': this.monday,
            'tuesday': this.tuesday,
            'wednesday': this.wednesday,
            'thursday': this.thursday,
            'friday': this.friday,
            'saturday': this.saturday,
            'sunday': this.sunday,
        });
    }

    async onSubmit(form) {
        const userID = await this.store.select(selectUserID).pipe(first(userID => userID != null && userID != '')).toPromise();
        const checkIn: CheckIn = {
            ...form,
            userID,
            'id': this.generateRandomID(),
            'timestamp': new Date(),
        };
        
        this.store.dispatch(new CreateRequested(checkIn));
    }

    generateRandomID() {
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var randomID = randLetter + Date.now();
        return randomID;
    }

}
