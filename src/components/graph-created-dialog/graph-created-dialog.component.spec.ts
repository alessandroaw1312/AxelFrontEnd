import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCreatedDialogComponent } from './graph-created-dialog.component';

describe('GraphCreatedDialogComponent', () => {
  let component: GraphCreatedDialogComponent;
  let fixture: ComponentFixture<GraphCreatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphCreatedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphCreatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
