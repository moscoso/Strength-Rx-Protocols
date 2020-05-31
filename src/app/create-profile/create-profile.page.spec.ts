import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateProfilePage } from './create-profile.page';

describe('CreateProfilePage', () => {
  let component: CreateProfilePage;
  let fixture: ComponentFixture<CreateProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
