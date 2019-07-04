import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenmodalPage } from './imagenmodal.page';

describe('ImagenmodalPage', () => {
  let component: ImagenmodalPage;
  let fixture: ComponentFixture<ImagenmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
