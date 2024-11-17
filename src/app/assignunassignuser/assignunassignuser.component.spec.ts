import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignunassignuserComponent } from './assignunassignuser.component';

describe('AssignunassignuserComponent', () => {
  let component: AssignunassignuserComponent;
  let fixture: ComponentFixture<AssignunassignuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignunassignuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignunassignuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
