import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersFallComponent } from './letters-fall.component';

describe('LettersFallComponent', () => {
  let component: LettersFallComponent;
  let fixture: ComponentFixture<LettersFallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersFallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersFallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
