import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditExercisePage } from './edit-exercise.page';

describe('EditExercisePage', () => {
  let component: EditExercisePage;
  let fixture: ComponentFixture<EditExercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExercisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
