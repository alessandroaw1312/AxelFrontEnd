import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGraphComponent } from './new-graph.component';

describe('NewGraphComponent', () => {
  let component: NewGraphComponent;
  let fixture: ComponentFixture<NewGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
