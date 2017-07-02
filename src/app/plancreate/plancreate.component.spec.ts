import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCreateComponent } from './plancreate.component';

describe('PlanCreateComponent', () => {
  let component: PlanCreateComponent;
  let fixture: ComponentFixture<PlanCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
