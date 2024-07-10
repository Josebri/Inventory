import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class AdminInventoryComponent implements OnInit {
  productForm: FormGroup;
  isEditing = false;
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      reorder_quantity: [0, [Validators.required, Validators.min(0)]],
      supplier: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.dataService.getProducts().subscribe(
      (products: any[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Error loading products', error);
      }
    );
  }

  onSave(): void {
    if (this.productForm.valid) {
      if (this.isEditing) {
        this.dataService.updateProduct(this.productForm.value.id, this.productForm.value).subscribe(
          (response) => {
            console.log('Product updated successfully', response);
            this.resetForm();
            this.loadProducts();
          },
          (error) => {
            console.error('Error updating product', error);
          }
        );
      } else {
        this.dataService.createProduct(this.productForm.value).subscribe(
          (response) => {
            console.log('Product created successfully', response);
            this.resetForm();
            this.loadProducts();
          },
          (error) => {
            console.error('Error creating product', error);
          }
        );
      }
    }
  }

  editProduct(product: any): void {
    this.isEditing = true;
    this.productForm.patchValue(product);
  }

  deleteProduct(productId: number): void {
    this.dataService.deleteProduct(productId).subscribe(
      (response) => {
        console.log('Product deleted successfully', response);
        this.loadProducts();
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }

  resetForm(): void {
    this.isEditing = false;
    this.productForm.reset();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
