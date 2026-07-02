import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AdminDashboardPage {
  users = [
    { id: 1, nombres: 'Juan', apellidos: 'Perez', tipo_usuario: 'cliente', status: 'EXITOSO', lastActive: '14:30' },
    { id: 2, nombres: 'Transportes', apellidos: 'ABC', tipo_usuario: 'empresa', status: 'PENDIENTE', lastActive: '14:15' },
    { id: 3, nombres: 'Maria', apellidos: 'Gomez', tipo_usuario: 'cliente', status: 'EXITOSO', lastActive: '13:50' }
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService
  ) {}

  t(key: string): string {
    return this.translationService.translate(key);
  }

  async confirmDelete(registro: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Está seguro de que desea eliminar el registro de <strong>${registro.name}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'ELIMINAR',
          handler: () => {
            this.deleteRegistro(registro);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteRegistro(registro: any) {
    this.users = this.users.filter(r => r.id !== registro.id);
    const toast = await this.toastController.create({
      message: 'Registro eliminado con éxito.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async confirmStatusChange(registro: any) {
    const alert = await this.alertController.create({
      header: 'Cambiar Estado',
      message: 'Seleccione el nuevo estado para el registro.',
      inputs: [
        { name: 'status', type: 'radio', label: 'Exitoso', value: 'Exitoso', checked: registro.status === 'Exitoso' },
        { name: 'status', type: 'radio', label: 'Pendiente', value: 'Pendiente', checked: registro.status === 'Pendiente' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: (data) => {
            registro.status = data;
            this.showToast('Estado actualizado correctamente.');
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
      color: 'success'
    });
    toast.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
