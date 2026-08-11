import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VehicleService, Vehicle } from '../../services/vehicle.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class VehiclePage implements OnInit {
  vehicle: Vehicle | null = null;
  loading = true;
  showVehicleSelector = false;

  allVehicles: Vehicle[] = [];
  selectedVehicleId: number | null = null;

  docs = [
    { title: 'SOAT', expiry: '15/12/2026', status: 'VIGENTE', statusClass: 'status-vigente' },
    { title: 'TECNOMECÁNICA', expiry: '02/04/2026', status: 'PRÓXIMO', statusClass: 'status-proximo' },
    { title: 'LICENCIA', expiry: '20/10/2030', status: 'VIGENTE', statusClass: 'status-vigente' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private vehicleService: VehicleService,
    private translationService: TranslationService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;

    if (user?.role === 'empresa' || user?.role === 'admin') {
      this.allVehicles = this.vehicleService.getAllVehicles();
      this.showVehicleSelector = this.allVehicles.length > 1;
    } else if (user?.role === 'cliente') {
      const v1 = this.vehicleService.getVehicleByPlate('ABC-123');
      const v2 = this.vehicleService.getVehicleByPlate('LMN-234');
      if (v1) this.allVehicles.push(v1);
      if (v2) this.allVehicles.push(v2);
      this.showVehicleSelector = this.allVehicles.length > 1;
    }

    this.route.queryParams.subscribe(params => {
      this.loading = true;

      if (params['id']) {
        const found = this.vehicleService.getVehicleById(+params['id']);
        if (found) {
          this.vehicle = found;
          this.selectedVehicleId = found.id;
          this.loadDocs();
          this.loading = false;
          return;
        }
      }

      if (this.allVehicles.length > 0) {
        this.vehicle = this.allVehicles[0];
        this.selectedVehicleId = this.allVehicles[0].id;
      }

      this.loadDocs();
      this.loading = false;
    });
  }

  onVehicleSwitch() {
    if (this.selectedVehicleId) {
      const found = this.vehicleService.getVehicleById(this.selectedVehicleId);
      if (found) {
        this.vehicle = found;
        this.loadDocs();
      }
    }
  }

  loadDocs() {
    this.docs = [
      { title: 'SOAT', expiry: '15/12/2026', status: 'VIGENTE', statusClass: 'status-vigente' },
      { title: 'TECNOMECÁNICA', expiry: '02/04/2026', status: 'PRÓXIMO', statusClass: 'status-proximo' },
      { title: 'LICENCIA', expiry: '20/10/2030', status: 'VIGENTE', statusClass: 'status-vigente' }
    ];
  }

  goToTelemetry() {
    if (this.vehicle) {
      this.router.navigate(['/telemetry'], { queryParams: { id: this.vehicle.id } });
    }
  }

  async updateData() {
    if (this.vehicle) {
      const toast = await this.toastController.create({
        message: `Datos de "${this.vehicle.name}" actualizados correctamente.`,
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      toast.present();
    }
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  goBack() {
    window.history.back();
  }
}
