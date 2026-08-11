import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VehicleService, Vehicle } from '../../services/vehicle.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.page.html',
  styleUrls: ['./telemetry.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TelemetryPage implements OnInit {
  vehicle: Vehicle = {
    id: 1,
    name: 'Yamaha MT-03',
    plate: 'GHT-45F',
    brand: 'Yamaha',
    model: '2024',
    color: 'Gris/Rojo',
    year: '2024',
    image: 'assets/images/vehicle-placeholder.png',
    status: 'En línea',
    nextService: '2026-03-15',
    gpsStatus: 'ONLINE',
    odometer: 15423,
    speed: { current: 65, average: 52, max: 120 },
    acceleration: { current: 0.45, average: 0.32, max: 0.85 },
    gyroscope: { pitch: 2.3, roll: 1.1, yaw: 45.2 }
  };

  speed = {
    current: 65,
    average: 52,
    max: 120,
    unit: 'km/h'
  };

  odometer = {
    total: 15423,
    unit: 'km'
  };

  gyroscope = {
    pitch: 2.3,
    roll: 1.1,
    yaw: 45.2,
    pitchLabel: 'Inclinación',
    rollLabel: 'Balanceo',
    yawLabel: 'Giro'
  };

  acceleration = {
    current: 0.45,
    average: 0.32,
    max: 0.85,
    unit: 'G'
  };

  telemetryHistory = [
    { time: '14:30:00', speed: 65, acceleration: 0.45 },
    { time: '14:29:55', speed: 62, acceleration: 0.38 },
    { time: '14:29:50', speed: 58, acceleration: 0.52 },
    { time: '14:29:45', speed: 55, acceleration: 0.31 },
    { time: '14:29:40', speed: 50, acceleration: 0.22 },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private vehicleService: VehicleService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        const found = this.vehicleService.getVehicleById(+params['id']);
        if (found) {
          this.vehicle = found;
          this.updateTelemetryData(found);
        }
      }
    });
  }

  private updateTelemetryData(vehicle: Vehicle) {
    this.speed = {
      current: vehicle.speed.current,
      average: vehicle.speed.average,
      max: vehicle.speed.max,
      unit: 'km/h'
    };
    this.odometer = {
      total: vehicle.odometer,
      unit: 'km'
    };
    this.gyroscope = {
      pitch: vehicle.gyroscope.pitch,
      roll: vehicle.gyroscope.roll,
      yaw: vehicle.gyroscope.yaw,
      pitchLabel: 'Inclinación',
      rollLabel: 'Balanceo',
      yawLabel: 'Giro'
    };
    this.acceleration = {
      current: vehicle.acceleration.current,
      average: vehicle.acceleration.average,
      max: vehicle.acceleration.max,
      unit: 'G'
    };
    this.generateHistory();
  }

  private generateHistory() {
    const baseSpeed = this.speed.current;
    this.telemetryHistory = Array.from({ length: 5 }, (_, i) => ({
      time: `14:${30 - i}:${String(55 - i * 5).padStart(2, '0')}`,
      speed: Math.max(0, baseSpeed - i * 3),
      acceleration: +(Math.random() * 0.4 + 0.1).toFixed(2)
    }));
  }

  goToVehicle() {
    this.router.navigate(['/vehicle'], { queryParams: { id: this.vehicle.id } });
  }

  goBack() {
    window.history.back();
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }
}
