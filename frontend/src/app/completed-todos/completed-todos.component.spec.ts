import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTodosComponent } from './completed-todos.component';

describe('CompletedTodosComponent', () => {
  let component: CompletedTodosComponent;
  let fixture: ComponentFixture<CompletedTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
