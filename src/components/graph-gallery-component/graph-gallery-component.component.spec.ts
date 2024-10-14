import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphGalleryComponentComponent } from './graph-gallery-component.component';

describe('GraphGalleryComponentComponent', () => {
  let component: GraphGalleryComponentComponent;
  let fixture: ComponentFixture<GraphGalleryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphGalleryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphGalleryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
