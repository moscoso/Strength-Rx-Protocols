import { Component, OnInit } from '@angular/core';
import { ProgramFacade } from 'src/app/core/state/program/program.facade';

@Component({
    'selector': 'app-edit-program',
    'templateUrl': './edit-program.page.html',
    'styleUrls': ['./edit-program.page.scss'],
})
export class EditProgramPage implements OnInit {

    constructor(
        public programService: ProgramFacade
    ) {}

    ngOnInit() {}

    onSubmit(program) {
        this.programService.update(program.id, program);
    }

}
