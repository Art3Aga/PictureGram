import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPage } from './subir.page';

describe('SubirPage', () => {
  let component: SubirPage;
  let fixture: ComponentFixture<SubirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
