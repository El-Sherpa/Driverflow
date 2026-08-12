import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location-permission',
  templateUrl: './location-permission.page.html',
  styleUrls: ['./location-permission.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class LocationPermissionPage implements OnInit {
  requesting = false;
  granted = false;

  constructor(
    private router: Router,
    private translationService: TranslationService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.requestPermission();
  }

  async requestPermission() {
    if (this.requesting || this.granted) return;
    this.requesting = true;

    try {
      const result = await Geolocation.requestPermissions();
      if (result.location === 'granted') {
        this.granted = true;
        this.showToast(this.t('LOCATION_PERMISSION_GRANTED'));
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 700);
      } else {
        this.showToast(this.t('LOCATION_PERMISSION_DENIED'));
      }
    } catch (error) {
      console.warn('No se pudo solicitar el permiso de ubicación (demo frontend)', error);
      this.showToast(this.t('LOCATION_PERMISSION_DENIED'));
    } finally {
      this.requesting = false;
    }
  }

  skip() {
    this.router.navigate(['/login']);
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }
}
