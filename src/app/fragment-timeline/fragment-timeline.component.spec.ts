import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentTimelineComponent } from './fragment-timeline.component';

describe('FragmentTimelineComponent', () => {
  let component: FragmentTimelineComponent;
  let fixture: ComponentFixture<FragmentTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragmentTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
