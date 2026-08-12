import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from './services/translation.service';
import { VehicleService, Vehicle } from './services/vehicle.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class AppComponent implements OnInit, OnDestroy {
  userRole$: Observable<string | null>;
  private langSub!: Subscription;

  clientVehicles: Vehicle[] = [];

  constructor(
    private authService: AuthService,
    private translationService: TranslationService,
    private vehicleService: VehicleService,
    private router: Router
  ) {
    this.userRole$ = this.authService.getUserRole();
  }

  ngOnInit() {
    this.langSub = this.translationService.currentLanguage$.subscribe(() => {});
    this.loadClientVehicles();
    this.checkLocationPermission();
  }

  private async checkLocationPermission() {
    if (this.router.url.includes('location-permission')) return;
    try {
      const status = await Geolocation.checkPermissions();
      if (status.location !== 'granted') {
        this.goToLocationPermission();
      }
    } catch (error) {
      console.warn('No se pudo verificar el permiso de ubicación (demo frontend)', error);
      this.goToLocationPermission();
    }
  }

  private goToLocationPermission() {
    setTimeout(() => {
      this.router.navigate(['/location-permission']);
    }, 400);
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }

  loadClientVehicles() {
    const v1 = this.vehicleService.getVehicleByPlate('ABC-123');
    const v2 = this.vehicleService.getVehicleByPlate('LMN-234');
    if (v1) this.clientVehicles.push(v1);
    if (v2) this.clientVehicles.push(v2);
  }

  goToVehicle(id: number) {
    this.router.navigate(['/vehicle'], { queryParams: { id } });
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  logout() {
    this.authService.logout();
  }
}
