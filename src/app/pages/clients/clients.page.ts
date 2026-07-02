import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { TranslationService } from '../../services/translation.service';

type ClientStatus = 'Activo' | 'Inactivo';
type ClientOrigin = 'App' | 'Web' | 'Admin';

interface ClientRow {
  status: ClientStatus;
  name: string;
  identification: string;
  phone: string;
  plate: string;
  model: string;
  color: string;
  soatDate: string;
  tecnoDate: string;
  origin: ClientOrigin;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ClientsPage implements OnInit {
  search = '';
  showMode: 'Clientes' | 'Funcionarios' | 'PIME' | 'Todos' = 'Clientes';

  rows: ClientRow[] = [
    { status: 'Activo', name: 'Juan Pérez', identification: '10203040', phone: '3001234567', plate: 'ABC-123', model: '2023', color: 'Rojo', soatDate: '2024-12-01', tecnoDate: '2024-11-15', origin: 'App' },
    { status: 'Inactivo', name: 'María García', identification: '50607080', phone: '3109876543', plate: 'XYZ-789', model: '2021', color: 'Gris', soatDate: '2024-05-20', tecnoDate: '2024-06-10', origin: 'Web' },
    { status: 'Activo', name: 'Carlos Rodríguez', identification: '90101112', phone: '3204567890', plate: 'DEF-456', model: '2024', color: 'Azul', soatDate: '2025-01-10', tecnoDate: '2025-01-05', origin: 'Admin' },
    { status: 'Activo', name: 'Transportes Logística S.A.S', identification: '800.123.456-1', phone: '3152223344', plate: 'GHI-012', model: '2022', color: 'Blanco', soatDate: '2024-08-15', tecnoDate: '2024-08-20', origin: 'Web' }
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void { }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  onFiltersChange() {
    // Lógica para filtros
  }

  get total(): number {
    return this.filteredRows.length;
  }

  get filteredRows(): ClientRow[] {
    const q = this.search.trim().toLowerCase();

    return this.rows.filter(r => {
      if (this.showMode !== 'Todos') {
        // Lógica de filtrado por modo si es necesaria
      }
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.identification.toLowerCase().includes(q) ||
        r.plate.toLowerCase().includes(q)
      );
    });
  }

  async confirmDelete(client: ClientRow) {
    const alert = await this.alertController.create({
      header: this.t('CONFIRMAR_ELIMINACION'),
      message: `${this.t('DESEA_ELIMINAR_CLIENTE')} <strong>${client.name}</strong>?`,
      buttons: [
        { text: this.t('CANCELAR'), role: 'cancel' },
        { text: this.t('ELIMINAR'), handler: () => this.deleteClient(client) }
      ]
    });
    await alert.present();
  }

  deleteClient(client: ClientRow) {
    this.rows = this.rows.filter(r => r !== client);
  }
}
