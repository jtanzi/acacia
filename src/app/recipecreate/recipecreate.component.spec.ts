import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreateComponent } from './recipecreate.component';

describe('RecipeCreateComponent', () => {
  let component: RecipeCreateComponent;
  let fixture: ComponentFixture<RecipeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
