import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventory: any[] = [];
  locations: any[] = [];
  selectedLocation: number | null = null;
  newInventory: any = { product_id: '', location_id: '', quantity: 0 };

  constructor(private inventoryService: InventoryService, private locationService: LocationService) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations() {
    this.locationService.getAllLocations().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        console.error('Error fetching locations', error);
      }
    );
  }

  fetchInventory() {
    if (this.selectedLocation) {
      this.inventoryService.getInventoryByLocation(this.selectedLocation).subscribe(
        data => {
          this.inventory = data;
        },
        error => {
          console.error('Error fetching inventory', error);
        }
      );
    }
  }

  addInventory() {
    this.inventoryService.addInventory(this.newInventory).subscribe(
      response => {
        this.inventory.push(response);
        this.newInventory = { product_id: '', location_id: '', quantity: 0 };
      },
      error => {
        console.error('Error adding inventory', error);
      }
    );
  }

  deleteInventory(productId: number, locationId: number) {
    this.inventoryService.deleteInventory(productId, locationId).subscribe(
      response => {
        this.inventory = this.inventory.filter(item => item.product_id !== productId || item.location_id !== locationId);
      },
      error => {
        console.error('Error deleting inventory', error);
      }
    );
  }
}
