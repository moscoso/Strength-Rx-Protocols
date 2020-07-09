import { Component, OnInit } from '@angular/core';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';

@Component({
    'selector': 'app-edit-program',
    'templateUrl': './edit-program.page.html',
    'styleUrls': ['./edit-program.page.scss'],
})
export class EditProgramPage implements OnInit {

    constructor(
        public programService: ProgramStoreDispatcher
    ) {}

    ngOnInit() {}

    onSubmit(program) {
        this.programService.update(program.id, program);
    }

}
