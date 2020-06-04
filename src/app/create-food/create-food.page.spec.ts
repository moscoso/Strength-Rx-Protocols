import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateFoodPage } from './create-food.page';

describe('CreateFoodPage', () => {
  let component: CreateFoodPage;
  let fixture: ComponentFixture<CreateFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
