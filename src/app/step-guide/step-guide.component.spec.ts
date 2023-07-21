import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGuideComponent } from './step-guide.component';

describe('StepGuideComponent', () => {
  let component: StepGuideComponent;
  let fixture: ComponentFixture<StepGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
