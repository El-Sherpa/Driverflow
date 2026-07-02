import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ProfilePage implements OnInit {
  companyCode: string = '';
  profile = {
    username: 'JuanPerez2023',
    email: 'juan.perez@example.com',
    identification: '10203040',
    city: 'Bogotá',
    rh: 'O+',
    bloodGroup: 'Positivo',
    firstName: 'Juan',
    lastName: 'Perez',
    birthYear: '1995',
    address: 'Calle 123 # 45-67',
    phone: '3001234567',
    profilePhotoUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg'
  };

  constructor(
    private toastController: ToastController,
    private translationService: TranslationService
  ) { }

  ngOnInit() {}

  t(key: string): string {
    return this.translationService.translate(key);
  }

  async associateCompany() {
    if (!this.companyCode) return;
    
    const toast = await this.toastController.create({
      message: 'CÓDIGO DE EMPRESA ASOCIADO',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

  async updateProfile() {
    const toast = await this.toastController.create({
      message: 'PERFIL ACTUALIZADO CON ÉXITO',
      duration: 2000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }
}
