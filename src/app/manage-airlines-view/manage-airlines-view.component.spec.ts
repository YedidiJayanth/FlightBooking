import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAirlinesViewComponent } from './manage-airlines-view.component';

describe('ManageAirlinesViewComponent', () => {
  let component: ManageAirlinesViewComponent;
  let fixture: ComponentFixture<ManageAirlinesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAirlinesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAirlinesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
