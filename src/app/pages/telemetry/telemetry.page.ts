import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.page.html',
  styleUrls: ['./telemetry.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TelemetryPage implements OnInit {
  vehicle = {
    name: 'Yamaha MT-03',
    plate: 'GHT-45F'
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
    private authService: AuthService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {}

  goBack() {
    const user = this.authService.currentUserValue;
    if (user?.role === 'empresa') {
      this.router.navigate(['/empresa-dashboard']);
    } else if (user?.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }
}
