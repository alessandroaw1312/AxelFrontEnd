import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTextInputComponent } from './document-text-input.component';

describe('DocumentTextInputComponent', () => {
  let component: DocumentTextInputComponent;
  let fixture: ComponentFixture<DocumentTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTextInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
