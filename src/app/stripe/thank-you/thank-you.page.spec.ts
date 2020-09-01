import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThankYouPage } from './thank-you.page';

describe('ThankYouPage', () => {
  let component: ThankYouPage;
  let fixture: ComponentFixture<ThankYouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankYouPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThankYouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
