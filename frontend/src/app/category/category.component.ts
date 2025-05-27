import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  showCreateForm = false;
  newCategoryName = '';
  newCategoryDescription = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    this.http.get<any[]>('http://localhost:3001/api/categories', { headers }).subscribe({
      next: (data) => {
        this.categories = data.map(cat => ({
          ...cat,
          editing: false,
          confirmDelete: false
        }));
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
      }
    });
  }

  openCreateCategoryForm() {
    this.showCreateForm = true;
  }

  createCategory() {
    if (!this.newCategoryName.trim()) {
      alert('Category name is required');
      return;
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    const newCategory = {
      category_name: this.newCategoryName,
      description: this.newCategoryDescription
    };

    this.http.post('http://localhost:3001/api/categories/create', newCategory, { headers }).subscribe({
      next: () => {
        this.showCreateForm = false;
        this.newCategoryName = '';
        this.newCategoryDescription = '';
        this.getCategories();
      },
      error: (err) => {
        console.error('Error creating category:', err);
        alert('Failed to create category');
      }
    });
  }

  cancelCreate() {
    this.showCreateForm = false;
    this.newCategoryName = '';
    this.newCategoryDescription = '';
  }

  toggleEditCategory(category: any) {
    if (category.editing) {
      this.updateCategory(category);
    } else {
      category.editing = true;
    }
  }

  updateCategory(category: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    const payload = {
      category_name: category.category_name,
      description: category.description
    };

    this.http.put(`http://localhost:3001/api/categories/${category._id}`, payload, { headers }).subscribe({
      next: () => {
        category.editing = false;
        this.getCategories();
      },
      error: (err) => {
        console.error('Error updating category:', err);
        alert('Failed to update category');
      }
    });
  }

  deleteCategory(categoryId: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    this.http.delete(`http://localhost:3001/api/categories/${categoryId}`, { headers }).subscribe({
      next: () => {
        this.getCategories();
      },
      error: (err) => {
        console.error('Error deleting category:', err);
        alert('Failed to delete category');
      }
    });
  }
}
