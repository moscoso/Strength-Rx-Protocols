import { Component } from '@angular/core';
import { ProgramFacade } from 'src/app/core/state/program/program.facade';

@Component({
    'selector': 'app-create-program',
    'templateUrl': './create-program.page.html',
    'styleUrls': ['./create-program.page.scss'],
})
export class CreateProgramPage {

    constructor(
        public programService: ProgramFacade
    ) {}

    onSubmit(program) {
        this.programService.create(program);
    }
}
