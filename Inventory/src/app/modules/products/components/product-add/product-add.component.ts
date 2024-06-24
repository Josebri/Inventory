import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      codigo: [''],
      categoria: [''],
      descripcion: [''],
      descripcionDetallada: [''],
      marca: [''],
      precio: [''],
      foto: [null]
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach(key => {
      formData.append(key, this.productForm.get(key).value);
    });

    this.productService.addProduct(formData).subscribe(response => {
      console.log('Product added successfully');
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('foto').setValue(file);
    }
  }
}
