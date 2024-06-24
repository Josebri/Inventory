import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
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

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId).subscribe(product => {
      this.productForm.patchValue(product);
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach(key => {
      formData.append(key, this.productForm.get(key).value);
    });

    this.productService.updateProduct(this.productId, formData).subscribe(response => {
      console.log('Product updated successfully');
      this.router.navigate(['/products']);
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('foto').setValue(file);
    }
  }
}
