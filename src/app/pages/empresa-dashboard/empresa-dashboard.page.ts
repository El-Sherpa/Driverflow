import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as maplibregl from 'maplibre-gl';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-empresa-dashboard',
  templateUrl: './empresa-dashboard.page.html',
  styleUrls: ['./empresa-dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class EmpresaDashboardPage implements OnInit, AfterViewInit, OnDestroy {
  companyName: string = 'Transportes Global S.A.S';
  map!: maplibregl.Map;

  stats = [
    { label: 'VEHICULOS_ACTIVOS', value: '42', icon: 'car-outline', color: '#3b82f6' },
    { label: 'ALERTAS_HOY', value: '5', icon: 'alert-circle-outline', color: '#ef4444' },
    { label: 'ESTADO_FLOTA', value: '94%', icon: 'stats-chart', color: '#10b981' }
  ];

  recentActivity = [
    { id: 1, type: 'movement', vehicle: 'ABC-123', time: '10:45 AM', status: 'En movimiento' },
    { id: 2, type: 'alert', vehicle: 'XYZ-789', time: '09:30 AM', status: 'Exceso velocidad' },
    { id: 3, type: 'parking', vehicle: 'DEF-456', time: '08:15 AM', status: 'Estacionado' }
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService
  ) { }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnInit() {
    this.updateStatsLabels();
    this.translationService.currentLanguage$.subscribe(() => {
      this.updateStatsLabels();
    });
  }

  updateStatsLabels() {
    if (this.stats && this.stats.length >= 3) {
      this.stats[0].label = this.t('VEHICULOS_ACTIVOS');
      this.stats[1].label = this.t('ALERTAS_HOY');
      this.stats[2].label = this.t('ESTADO_FLOTA');
    }
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  initMap() {
    this.map = new maplibregl.Map({
      container: 'mini-map',
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-74.0721, 4.7110], // Bogotá
      zoom: 11,
      attributionControl: false
    });

    this.map.on('load', () => {
      // Simular marcadores de flota para la empresa
      this.addFleetMarkers();
      // Forzar resize inmediato y luego uno retardado para asegurar renderizado correcto
      this.map.resize();
      setTimeout(() => {
        if (this.map) this.map.resize();
      }, 500);
    });
  }

  addFleetMarkers() {
    const fleet = [
      { coords: [-74.0721, 4.7110], id: 'V1' },
      { coords: [-74.0821, 4.7210], id: 'V2' },
      { coords: [-74.0621, 4.7010], id: 'V3' },
    ];

    fleet.forEach(v => {
      const el = document.createElement('div');
      el.className = 'fleet-marker';
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.backgroundColor = '#3b82f6';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.8)';

      new maplibregl.Marker(el)
        .setLngLat(v.coords as [number, number])
        .addTo(this.map);
    });
  }

  async confirmService(vehicle: any) {
    const alert = await this.alertController.create({
      header: 'Solicitar Servicio',
      message: `¿Desea solicitar un nuevo servicio para el vehículo <strong>${vehicle.plate}</strong>?`,
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Solicitar',
          handler: () => {
            this.showToast('Servicio solicitado exitosamente.');
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'secondary',
      position: 'bottom'
    });
    toast.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
