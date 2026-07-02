import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-dashboard',
  templateUrl: './cliente-dashboard.page.html',
  styleUrls: ['./cliente-dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ClienteDashboardPage {
  userProfile = {
    name: 'Juan Perez',
    email: 'juan.perez@example.com',
    memberSince: '2023'
  };

  myVehicles = [
    { id: 1, plate: 'HJK-901', model: 'Toyota Corolla', nextService: '2024-05-20', status: 'Al día' },
    { id: 2, plate: 'LMN-234', model: 'Mazda CX-5', nextService: '2024-04-10', status: 'Pendiente SOAT' }
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) {}

  async requestAssistance() {
    const alert = await this.alertController.create({
      header: 'Solicitar Asistencia',
      message: '¿Necesitas asistencia técnica inmediata para tu vehículo actual?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'SOLICITAR',
          handler: () => {
            this.showToast('Solicitud de asistencia enviada. Un técnico te contactará pronto.');
          }
        }
      ]
    });
    await alert.present();
  }

  async viewVehicleDetails(vehicle: any) {
    const alert = await this.alertController.create({
      header: `DETALLES: ${vehicle.plate}`,
      subHeader: vehicle.model.toUpperCase(),
      message: `PRÓXIMO SERVICIO: ${vehicle.nextService}\nESTADO: ${vehicle.status.toUpperCase()}`,
      cssClass: 'cyber-alert',
      buttons: [
        {
          text: 'CERRAR',
          role: 'cancel',
          cssClass: 'cyber-button'
        }
      ]
    });
    await alert.present();
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'tertiary',
      position: 'top'
    });
    toast.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
