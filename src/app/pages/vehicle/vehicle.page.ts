import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class VehiclePage implements OnInit {
  vehicle = {
    name: 'Yamaha MT-03',
    plate: 'GHT-45F',
    brand: 'Yamaha',
    model: '2024',
    color: 'Gris/Rojo',
    year: '2024',
    image: 'assets/images/vehicle-placeholder.png'
  };

  docs = [
    { title: 'SOAT', expiry: '15/12/2026', status: 'VIGENTE', statusClass: 'status-vigente' },
    { title: 'TECNOMECÁNICA', expiry: '02/04/2026', status: 'PRÓXIMO', statusClass: 'status-proximo' },
    { title: 'LICENCIA', expiry: '20/10/2030', status: 'VIGENTE', statusClass: 'status-vigente' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private translationService: TranslationService
  ) { }

  ngOnInit() {}

  goToTelemetry() {
    this.router.navigate(['/telemetry']);
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  goBack() {
    const user = this.authService.currentUserValue;
    if (user?.role === 'empresa') {
      this.router.navigate(['/empresa-dashboard']);
    } else if (user?.role === 'cliente') {
      this.router.navigate(['/cliente-dashboard']);
    } else if (user?.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateData() {
    console.log('Actualizar datos presionado');
  }
}
