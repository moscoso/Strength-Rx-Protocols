import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { ClientStoreDispatcher } from 'src/app/core/state/client/client.dispatcher';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';
import { Program } from 'src/app/core/state/program/program.state';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { CreateCustomProgramComponent } from './create-custom-program/create-custom-program.component';
import { SubscribeToProgramComponent } from './subscribe-to-program/subscribe-to-program.component';
import { EditCustomProgramComponent } from './edit-custom-program/edit-custom-program.component';

@Component({
    'selector': 'assign-program',
    'templateUrl': './assign-program.component.html',
    'styleUrls': ['./assign-program.component.scss'],
})
export class AssignProgramComponent implements OnInit {

    @Input() clientID: string;

    public iAmTrainer$: Observable < boolean > = of (false);
    public profileIsClient$: Observable < boolean > = of (false);
    public programList$: Observable < Program[] > = of ([]);
    public requestInProgress$: Observable < boolean > = of (false);

    form: FormGroup;
    programs = new FormControl([], [Validators.required]);
    program = new FormControl(null);

    defaultProgram: Program;

    constructor(
        public profileService: ProfileStoreDispatcher,
        public clientService: ClientStoreDispatcher,
        public programService: ProgramStoreDispatcher,
        public modalController: ModalController,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'programs': this.programs
        });
        this.programService.loadAll();
        this.programList$ = this.programService.selectAll();
        this.iAmTrainer$ = this.profileService.selectUserIsTrainer();
        this.requestInProgress$ = this.programService.selectRequestInProgress();
        this.clientService.loadAll();
        this.clientService.selectClient(this.clientID).pipe(
            first(client => client != null && client.assignedProgram != null)
        ).subscribe((client) => {
            this.defaultProgram = client.assignedProgram;
            this.programs.setValue(this.defaultProgram);
        });
    }

    async assignProgram(program: Program) {
        this.clientService.assignProgram(this.clientID, program);
    }

    async onSubmit(form) {
        this.assignProgram(this.programs.value);
    }


    async setProgramControlFromModal(options: {
        'id': string,
        'component': any,
        'cssClass' ?: string,
        'componentProps' ?: any
    }) {
        const modal = await this.modalController.create(options);
        modal.onDidDismiss().then(event => {
            console.log(event);
            if (event && event.data && event.data.program) {
                // dayControl.setValue(event.data.workout);
                // dayControl.markAsDirty();
                // dayControl.markAsTouched();
                this.clientService.assignProgram(this.clientID, event.data.program);
                this.defaultProgram = event.data.program;
            }
        });
        return await modal.present();
    }

    async subscribeToProgram() {
        const options = {
            'id': 'subscribe-to-program',
            'component': SubscribeToProgramComponent,
            'cssClass': 'modal-short-form'
        };
        this.setProgramControlFromModal(options);
    }

    async editCustomProgram() {
        console.log(this.defaultProgram);
        const options = {
            'id': 'edit-custom-program',
            'component': EditCustomProgramComponent,
            'cssClass': 'modal-80-width',
            'componentProps': {
                'program': this.defaultProgram
            }
        };
        this.setProgramControlFromModal(options);
    }

    async createCustomProgram() {
        const options = {
            'id': 'create-custom-program',
            'component': CreateCustomProgramComponent,
            'cssClass': 'modal-80-width',
        };
        this.setProgramControlFromModal(options);
    }
}
