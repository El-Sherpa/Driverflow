import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { TranslationService } from '../../services/translation.service';

type AgentStatus = 'Activo' | 'Inactivo';

interface AgentRow {
  status: AgentStatus;
  name: string;
  identification: string;
  phone: string;
  plate: string;
  model: string;
  color: string;
  soatDate: string;
  tecnoDate: string;
}

@Component({
  selector: 'app-agents',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AgentsPage implements OnInit {
  search = '';

  rows: AgentRow[] = [
    { status: 'Activo', name: 'Agente Especial 01', identification: '708090', phone: '3112223344', plate: 'GHI-456', model: '2022', color: 'Azul', soatDate: '2024-11-20', tecnoDate: '2024-11-25' },
    { status: 'Inactivo', name: 'Agente Soporte 05', identification: '112233', phone: '3156667788', plate: 'JKL-123', model: '2020', color: 'Negro', soatDate: '2024-03-15', tecnoDate: '2024-03-20' },
    { status: 'Activo', name: 'Supervisor Operativo', identification: '445566', phone: '3201112233', plate: 'MNO-789', model: '2024', color: 'Blanco', soatDate: '2025-02-10', tecnoDate: '2025-02-15' }
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private translationService: TranslationService
  ) { }

  ngOnInit() {}

  t(key: string): string {
    return this.translationService.translate(key);
  }

  onFiltersChange() {
    // Lógica para actualizar filtros si es necesario
  }

  get filteredRows(): AgentRow[] {
    const q = this.search.trim().toLowerCase();

    return this.rows.filter(r => {
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.identification.toLowerCase().includes(q) ||
        r.plate.toLowerCase().includes(q)
      );
    });
  }

  async confirmDelete(agent: AgentRow) {
    const alert = await this.alertController.create({
      header: this.t('CONFIRMAR_ELIMINACION'),
      message: `${this.t('DESEA_ELIMINAR_AGENTE')} <strong>${agent.name}</strong>?`,
      buttons: [
        { text: this.t('CANCELAR'), role: 'cancel' },
        { text: this.t('ELIMINAR'), handler: () => this.deleteAgent(agent) }
      ]
    });
    await alert.present();
  }

  deleteAgent(agent: AgentRow) {
    this.rows = this.rows.filter(r => r !== agent);
  }
}
