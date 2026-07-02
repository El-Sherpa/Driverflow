import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

type CompanyCodeStatus = 'Vigente' | 'Revocado';

@Component({
  selector: 'app-company-code',
  templateUrl: './company-code.page.html',
  styleUrls: ['./company-code.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class CompanyCodePage {
  empresaId = 4;
  expiresInDays = 30;

  code: string | null = null;
  status: CompanyCodeStatus = 'Vigente';
  expiryLabel = 'Sin expiración';

  constructor(private toastController: ToastController) {
    this.code = this.generateCode();
  }

  async refresh() {
    await this.showToast('Datos actualizados.');
  }

  async rotateCode() {
    this.code = this.generateCode();
    this.status = 'Vigente';
    this.expiryLabel = `${this.expiresInDays} días`;
    await this.showToast('Código generado/rotado.');
  }

  async revoke() {
    this.status = 'Revocado';
    await this.showToast('Código revocado.');
  }

  private generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < 8; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1600,
      color: 'dark'
    });
    await toast.present();
  }
}
