import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RtcService } from '../_services/rtc.service';

import { CallHubComponent } from './callhub.component';

describe('CallHubComponent', () => {
  let component: CallHubComponent;
  let fixture: ComponentFixture<CallHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
