import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { VehicleService, Vehicle } from '../../services/vehicle.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class VehicleListPage implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  search: string = '';

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.vehicles = this.vehicleService.getAllVehicles();
    this.filteredVehicles = [...this.vehicles];
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  onSearch() {
    const term = this.search.toLowerCase().trim();
    if (!term) {
      this.filteredVehicles = [...this.vehicles];
      return;
    }
    this.filteredVehicles = this.vehicles.filter(v =>
      v.name.toLowerCase().includes(term) ||
      v.plate.toLowerCase().includes(term) ||
      v.brand.toLowerCase().includes(term) ||
      v.model.toLowerCase().includes(term)
    );
  }

  viewVehicle(vehicle: Vehicle) {
    this.router.navigate(['/vehicle'], { queryParams: { id: vehicle.id } });
  }

  viewTelemetry(vehicle: Vehicle) {
    this.router.navigate(['/telemetry'], { queryParams: { id: vehicle.id } });
  }

  goBack() {
    window.history.back();
  }
}
