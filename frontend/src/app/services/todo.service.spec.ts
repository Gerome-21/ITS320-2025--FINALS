import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todos by category', () => {
    const dummyTodos = [
      { _id: '1', todo_name: 'Task 1', todo_description: 'Desc 1', category_id: 'cat1', status: 'not_started' },
      { _id: '2', todo_name: 'Task 2', todo_description: 'Desc 2', category_id: 'cat1', status: 'completed' }
    ];

    service.getTodosByCategoryId('cat1').subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(dummyTodos);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/todo/category/cat1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTodos);
  });
});
