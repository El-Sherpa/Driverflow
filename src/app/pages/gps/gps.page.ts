import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';
import { FormsModule } from '@angular/forms';
import * as maplibregl from 'maplibre-gl';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class GpsPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('markerVehicle') markerVehicle!: ElementRef;
  @ViewChild('markerDestination') markerDestination!: ElementRef;
  
  map!: maplibregl.Map;
  gpsEnabled: boolean = true;
  routeVisible: boolean = false;

  vehicleMarkerInstance?: maplibregl.Marker;
  destinationMarkerInstance?: maplibregl.Marker;

  // Ubicaciones
  userCoords: [number, number] = [-74.0721, 4.7110]; // Bogotá por defecto
  officeCoords: [number, number] = [-74.0621, 4.7210]; // Destino

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private translationService: TranslationService,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
  }

  async initMap() {
    try {
      // Intentar obtener ubicación real
      const coordinates = await Geolocation.getCurrentPosition();
      this.userCoords = [coordinates.coords.longitude, coordinates.coords.latitude];
    } catch (e) {
      console.warn('No se pudo obtener ubicación real, usando por defecto', e);
    }

    this.map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: this.userCoords,
      zoom: 14,
      attributionControl: false
    });

    this.map.on('load', () => {
      this.map.resize();
      this.addMarkers();
    });
  }

  addMarkers() {
    // Marcador Vehículo (Mi Ubicación)
    this.vehicleMarkerInstance = new maplibregl.Marker({
      element: this.markerVehicle.nativeElement,
      anchor: 'bottom'
    })
    .setLngLat(this.userCoords)
    .addTo(this.map);

    // Marcador Destino (Oficina Central)
    this.destinationMarkerInstance = new maplibregl.Marker({
      element: this.markerDestination.nativeElement,
      anchor: 'bottom'
    })
    .setLngLat(this.officeCoords)
    .addTo(this.map);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  togglePower(state: boolean) {
    this.gpsEnabled = state;
    if (!state) {
      this.routeVisible = false;
      if (this.vehicleMarkerInstance) this.vehicleMarkerInstance.getElement().style.display = 'none';
      if (this.destinationMarkerInstance) this.destinationMarkerInstance.getElement().style.display = 'none';
      if (this.map.getSource('route')) {
        this.map.setLayoutProperty('route', 'visibility', 'none');
      }
    } else {
      if (this.vehicleMarkerInstance) this.vehicleMarkerInstance.getElement().style.display = 'block';
      if (this.destinationMarkerInstance) this.destinationMarkerInstance.getElement().style.display = 'block';
      if (this.routeVisible && this.map.getSource('route')) {
        this.map.setLayoutProperty('route', 'visibility', 'visible');
      }
    }
  }

  isRouteLoading = false;
  routeInfo: { duration: string, distance: string } | null = null;

  async drawRoute() {
    if (this.isRouteLoading) return;
    this.isRouteLoading = true;

    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${this.userCoords[0]},${this.userCoords[1]};${this.officeCoords[0]},${this.officeCoords[1]}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates;

        // Actualizar info de ruta
        this.routeInfo = {
          duration: this.formatDuration(route.duration),
          distance: this.formatDistance(route.distance)
        };

        if (this.map.getSource('route')) {
          (this.map.getSource('route') as maplibregl.GeoJSONSource).setData({
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': coordinates
            }
          });
          this.map.setLayoutProperty('route', 'visibility', 'visible');
        } else {
          this.map.addSource('route', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
              }
            }
          });

          this.map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#3b82f6',
              'line-width': 5,
              'line-opacity': 0.8
            }
          });
        }

        const bounds = new maplibregl.LngLatBounds();
        coordinates.forEach((coord: [number, number]) => bounds.extend(coord));
        this.map.fitBounds(bounds, { padding: 50 });
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    } finally {
      this.isRouteLoading = false;
    }
  }

  formatDuration(seconds: number): string {
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  }

  formatDistance(meters: number): string {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  }

  clearRoute() {
    if (this.map.getLayer('route')) {
      this.map.setLayoutProperty('route', 'visibility', 'none');
    }
    this.routeInfo = null;
  }

  traceRoute() {
    if (!this.gpsEnabled) return;
    this.routeVisible = !this.routeVisible;
    
    if (this.routeVisible) {
      this.drawRoute();
    } else {
      this.clearRoute();
    }
  }

  goBack() {
    const role = this.authService.currentUserValue?.role;
    if (role === 'empresa') {
      this.router.navigate(['/empresa-dashboard']);
    } else if (role === 'cliente') {
      this.router.navigate(['/cliente-dashboard']);
    } else if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
