/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentsLatestResultsComponent } from './students-latest-results.component';

describe('StudentsLatestResultsComponent', () => {
  let component: StudentsLatestResultsComponent;
  let fixture: ComponentFixture<StudentsLatestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsLatestResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsLatestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
