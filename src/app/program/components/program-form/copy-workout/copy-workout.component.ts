import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/core/state/client/client.model';
import { ClientFacade } from 'src/app/core/state/client/client.facade';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Workout } from 'src/app/core/state/workout/workout.model';

@Component({
    'selector': 'app-copy-workout',
    'templateUrl': './copy-workout.component.html',
    'styleUrls': ['./copy-workout.component.scss'],
})
export class CopyWorkoutComponent implements OnInit {

    requestInProgress$: Observable < boolean > ;
    clientList$: Observable < Client[] > = of ([]);
    clientControl = new FormControl(null, [Validators.required]);
    phaseControl = new FormControl(null, [Validators.required]);
    workoutControl = new FormControl(null, [Validators.required]);

    form: FormGroup = new FormGroup({
        'workout': this.workoutControl,
    });

    workoutOptions = [];

    constructor(
        public clientService: ClientFacade,
        public modalController: ModalController,
    ) {}

    ngOnInit() {
        this.requestInProgress$ = this.clientService.selectRequestInProgress();
        this.clientService.loadAll();
        this.clientList$ = this.clientService.selectAll()
            .pipe(map(clientList => clientList.filter(client => client.assignedProgram != null)));

        this.phaseControl.valueChanges.subscribe(phase => {
            const client: Client = this.clientControl.value;
            const schedule = client.assignedProgram.phases[phase].schedule;
            const days = Object.keys(schedule);
            const nonRestDays = days.filter(day => schedule[day] != null);
            this.workoutOptions = nonRestDays;
        });
    }

    getWorkoutFromSchedule(phase: number, day: string): Workout {
        const client: Client = this.clientControl.value;
        const program = client.assignedProgram;
        const schedule = program.phases[phase].schedule;
        return schedule[day];
    }

    onSubmit(form) {
        this.modalController.dismiss({'workout': form.workout}, undefined, 'copy-workout');
    }

    /**
     * A function to compare the option values with the selected values.
     * @param e1 the first argument is a value from an option.
     * @param e2 the second is a value from the selection.
     * @returns a boolean should be returned.
     */
    compareClients(e1: Client, e2: Client): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }
}
