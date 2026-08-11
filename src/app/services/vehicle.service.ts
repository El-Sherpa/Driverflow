import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Vehicle {
  id: number;
  name: string;
  plate: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  image: string;
  status: string;
  nextService: string;
  gpsStatus: string;
  odometer: number;
  speed: { current: number; average: number; max: number };
  acceleration: { current: number; average: number; max: number };
  gyroscope: { pitch: number; roll: number; yaw: number };
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehicles: Vehicle[] = [
    {
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
    },
    {
      id: 2,
      name: 'Toyota Corolla',
      plate: 'ABC-123',
      brand: 'Toyota',
      model: '2023',
      color: 'Blanco',
      year: '2023',
      image: 'assets/images/vehicle-placeholder.png',
      status: 'En línea',
      nextService: '2026-05-20',
      gpsStatus: 'ONLINE',
      odometer: 32100,
      speed: { current: 0, average: 45, max: 160 },
      acceleration: { current: 0, average: 0.28, max: 0.92 },
      gyroscope: { pitch: 0, roll: 0, yaw: 120 }
    },
    {
      id: 3,
      name: 'Mazda CX-5',
      plate: 'LMN-234',
      brand: 'Mazda',
      model: '2024',
      color: 'Negro',
      year: '2024',
      image: 'assets/images/vehicle-placeholder.png',
      status: 'Pendiente SOAT',
      nextService: '2026-04-10',
      gpsStatus: 'OFFLINE',
      odometer: 8750,
      speed: { current: 0, average: 38, max: 140 },
      acceleration: { current: 0, average: 0.25, max: 0.78 },
      gyroscope: { pitch: 0, roll: 0, yaw: 0 }
    },
    {
      id: 4,
      name: 'Chevrolet Spark',
      plate: 'DEF-456',
      brand: 'Chevrolet',
      model: '2022',
      color: 'Azul',
      year: '2022',
      image: 'assets/images/vehicle-placeholder.png',
      status: 'En línea',
      nextService: '2026-06-01',
      gpsStatus: 'ONLINE',
      odometer: 45200,
      speed: { current: 42, average: 35, max: 130 },
      acceleration: { current: 0.18, average: 0.22, max: 0.65 },
      gyroscope: { pitch: 1.1, roll: 0.5, yaw: 88 }
    },
    {
      id: 5,
      name: 'Kia Sportage',
      plate: 'XYZ-789',
      brand: 'Kia',
      model: '2024',
      color: 'Rojo',
      year: '2024',
      image: 'assets/images/vehicle-placeholder.png',
      status: 'En línea',
      nextService: '2026-08-15',
      gpsStatus: 'ONLINE',
      odometer: 12300,
      speed: { current: 78, average: 55, max: 170 },
      acceleration: { current: 0.55, average: 0.35, max: 0.95 },
      gyroscope: { pitch: 3.1, roll: 1.8, yaw: 210 }
    }
  ];

  private selectedVehicleSubject = new BehaviorSubject<Vehicle | null>(null);
  public selectedVehicle$: Observable<Vehicle | null> = this.selectedVehicleSubject.asObservable();

  constructor() {}

  getAllVehicles(): Vehicle[] {
    return this.vehicles;
  }

  getVehicleById(id: number): Vehicle | undefined {
    return this.vehicles.find(v => v.id === id);
  }

  getVehicleByPlate(plate: string): Vehicle | undefined {
    return this.vehicles.find(v => v.plate === plate);
  }

  selectVehicle(vehicle: Vehicle) {
    this.selectedVehicleSubject.next(vehicle);
  }

  get selectedVehicleValue(): Vehicle | null {
    return this.selectedVehicleSubject.value;
  }
}
