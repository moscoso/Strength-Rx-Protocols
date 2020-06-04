import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateMealPage } from './create-meal.page';

describe('CreateMealPage', () => {
  let component: CreateMealPage;
  let fixture: ComponentFixture<CreateMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
