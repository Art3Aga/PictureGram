import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapitaComponent } from './mapita.component';

describe('MapitaComponent', () => {
  let component: MapitaComponent;
  let fixture: ComponentFixture<MapitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapitaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
