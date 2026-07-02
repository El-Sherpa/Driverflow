import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.page.html',
  styleUrls: ['./assign-vehicle.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AssignVehiclePage implements OnInit {
  isAssigning = false;
  assignment = {
    userId: 1,
    vehicleId: 1,
    marca: 'Toyota',
    modelo: 'Corolla',
    anio: '2023',
    placa: 'ABC-123',
    fechaSoat: '2024-12-01',
    fechaTecno: '2024-11-15',
    color: 'Rojo',
    urlImagen: 'assets/images/logo2.png'
  } as any;

  users: any[] = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María García' },
    { id: 3, name: 'Carlos Rodríguez' }
  ]; 
  vehicles: any[] = [
    { id: 1, plate: 'ABC-123' },
    { id: 2, plate: 'DEF-456' },
    { id: 3, plate: 'GHI-789' }
  ]; 

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    // Hardcode some default values to show the form filled
  }

  async onAssign() {
    this.isAssigning = true;
    
    // Simulamos una carga tecnológica
    setTimeout(async () => {
      this.isAssigning = false;
      const toast = await this.toastController.create({
        message: 'VEHÍCULO ASIGNADO CON ÉXITO',
        duration: 3000,
        position: 'bottom',
        cssClass: 'success-toast',
        buttons: [
          {
            side: 'start',
            icon: 'checkmark-done-circle'
          }
        ]
      });
      toast.present();
    }, 2000);
  }
}
