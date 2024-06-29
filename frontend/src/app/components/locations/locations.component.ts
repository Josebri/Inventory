import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations: any[] = [];
  newLocation: any = { name: '', address: '' };

  constructor(private locationService: LocationService) {}

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

  addLocation() {
    this.locationService.addLocation(this.newLocation).subscribe(
      response => {
        this.locations.push(response);
        this.newLocation = { name: '', address: '' };
      },
      error => {
        console.error('Error adding location', error);
      }
    );
  }

  deleteLocation(id: number) {
    this.locationService.deleteLocation(id).subscribe(
      response => {
        this.locations = this.locations.filter(location => location.id !== id);
      },
      error => {
        console.error('Error deleting location', error);
      }
    );
  }
}
