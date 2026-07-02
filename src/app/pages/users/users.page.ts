import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

type UserRole = 'administrador' | 'empresa' | 'cliente';

interface AppUserRow {
  username: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  blocked: boolean;
  city?: string;
  identification?: string;
  rh?: string;
  birthYear?: string;
  address?: string;
}

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-user-detail-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-content class="ion-no-padding cyber-modal-content">
      <div class="modal-inner">
        <!-- Handlebar for mobile look -->
        <div class="modal-handle"></div>

        <div class="modal-header">
          <div class="avatar-wrapper">
            <div class="avatar-large" [ngClass]="'role-bg-' + user.role">
              {{ user.name.charAt(0) }}
            </div>
            <div class="status-dot-large"></div>
          </div>
          <h2 class="user-name">{{ user.name }}</h2>
          <div class="role-badge-container">
            <span class="role-badge" [ngClass]="'role-' + user.role">
              <ion-icon [name]="user.role === 'administrador' ? 'shield-checkmark' : user.role === 'empresa' ? 'business' : 'person'"></ion-icon>
              {{ user.role.toUpperCase() }}
            </span>
          </div>
        </div>

        <div class="modal-body">
          <div class="info-list">
            <div class="info-row">
              <ion-icon name="at-outline"></ion-icon>
              <div class="info-content">
                <span class="label">USERNAME</span>
                <span class="value">@{{ user.username }}</span>
              </div>
            </div>

            <div class="info-row">
              <ion-icon name="mail-outline"></ion-icon>
              <div class="info-content">
                <span class="label">EMAIL</span>
                <span class="value">{{ user.email }}</span>
              </div>
            </div>

            <div class="info-row-grid">
              <div class="info-row">
                <ion-icon name="call-outline"></ion-icon>
                <div class="info-content">
                  <span class="label">TELÉFONO</span>
                  <span class="value">{{ user.phone || 'N/A' }}</span>
                </div>
              </div>
              <div class="info-row">
                <ion-icon name="finger-print-outline"></ion-icon>
                <div class="info-content">
                  <span class="label">ID</span>
                  <span class="value">{{ user.identification || 'N/A' }}</span>
                </div>
              </div>
            </div>

            <div class="info-row-grid">
              <div class="info-row">
                <ion-icon name="map-outline"></ion-icon>
                <div class="info-content">
                  <span class="label">CIUDAD</span>
                  <span class="value">{{ user.city || 'N/A' }}</span>
                </div>
              </div>
              <div class="info-row">
                <ion-icon name="water-outline"></ion-icon>
                <div class="info-content">
                  <span class="label">RH</span>
                  <span class="value">{{ user.rh || 'N/A' }}</span>
                </div>
              </div>
            </div>

            <div class="info-row">
              <ion-icon name="calendar-outline"></ion-icon>
              <div class="info-content">
                <span class="label">AÑO NACIMIENTO</span>
                <span class="value">{{ user.birthYear || 'N/A' }}</span>
              </div>
            </div>

            <div class="info-row">
              <ion-icon name="location-outline"></ion-icon>
              <div class="info-content">
                <span class="label">DIRECCIÓN</span>
                <span class="value">{{ user.address || 'N/A' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <ion-button expand="block" fill="clear" (click)="dismiss()" class="close-button">
            {{ t('VOLVER') }}
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .cyber-modal-content {
      --background: #0b1220;
    }
    .modal-inner {
      padding: 12px 20px 30px;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .modal-handle {
      width: 40px;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      margin: 0 auto 25px;
    }
    .modal-header {
      text-align: center;
      margin-bottom: 30px;
      
      .avatar-wrapper {
        position: relative;
        display: inline-block;
        margin-bottom: 15px;
        
        .avatar-large {
          width: 90px;
          height: 90px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          border: 2px solid rgba(255,255,255,0.1);
        }
        
        .status-dot-large {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 24px;
          height: 24px;
          background: #10b981;
          border: 4px solid #0b1220;
          border-radius: 50%;
        }
      }
      
      .user-name {
        margin: 0 0 8px;
        color: white;
        font-size: 1.6rem;
        font-weight: 700;
        letter-spacing: -0.5px;
      }
      
      .role-badge-container {
        display: flex;
        justify-content: center;
        
        .role-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          
          ion-icon { font-size: 1rem; }
          
          &.role-administrador { color: #3b82f6; border-color: rgba(59, 130, 246, 0.3); }
          &.role-empresa { color: #a78bfa; border-color: rgba(167, 139, 250, 0.3); }
          &.role-cliente { color: #10b981; border-color: rgba(16, 185, 129, 0.3); }
        }
      }
    }
    .modal-body {
      flex: 1;
      .info-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        
        .info-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .info-row {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.03);
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          
          ion-icon {
            font-size: 1.4rem;
            color: #3b82f6;
            opacity: 0.8;
          }
          
          .info-content {
            display: flex;
            flex-direction: column;
            gap: 2px;
            
            .label {
              font-size: 0.65rem;
              color: rgba(255, 255, 255, 0.3);
              font-weight: 700;
              letter-spacing: 0.5px;
            }
            
            .value {
              color: white;
              font-size: 0.95rem;
              font-weight: 500;
            }
          }
        }
      }
    }
    .modal-footer {
      margin-top: 30px;
      .close-button {
        --color: #94a3b8;
        font-weight: 700;
        letter-spacing: 1px;
        margin: 0;
      }
    }
    .role-bg-administrador { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
    .role-bg-empresa { background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%); }
    .role-bg-cliente { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
  `]
})
export class UserDetailModal {
  user!: AppUserRow;
  constructor(
    private modalCtrl: ModalController,
    private translationService: TranslationService
  ) {}
  
  t(key: string): string {
    return this.translationService.translate(key);
  }

  dismiss() { this.modalCtrl.dismiss(); }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class UsersPage {
  roleFilter: 'Todos' | UserRole = 'Todos';
  search = '';
  pageSize = 10;
  page = 1;

  rows: AppUserRow[] = [
    { username: 'admin', name: 'Admin System', email: 'admin@example.com', phone: '3001112233', role: 'administrador', blocked: false, city: 'Bogotá', identification: '123456', rh: 'O+', birthYear: '1990', address: 'Calle 1' },
    { username: 'admin_test', name: 'Admin Prueba', email: 'admin_test@example.com', phone: '3004445566', role: 'administrador', blocked: false, city: 'Medellín', identification: '789012', rh: 'A+', birthYear: '1992', address: 'Calle 2' },
    { username: 'cliente_test', name: 'Cliente Prueba', email: 'cliente_test@example.com', phone: '3102223344', role: 'cliente', blocked: false, city: 'Cali', identification: '345678', rh: 'O-', birthYear: '1995', address: 'Calle 3' },
    { username: 'empresa_test', name: 'Empresa Prueba', email: 'empresa@test.com', phone: '3159998877', role: 'empresa', blocked: false, city: 'Barranquilla', identification: '901234', rh: 'B+', birthYear: '1988', address: 'Calle 4' },
    { username: 'usuario_test', name: 'Usuario Prueba', email: 'user@test.com', phone: '3201110022', role: 'cliente', blocked: false, city: 'Bucaramanga', identification: '567890', rh: 'AB+', birthYear: '1998', address: 'Calle 5' }
  ];

  constructor(
    private modalCtrl: ModalController,
    private translationService: TranslationService
  ) {}

  t(key: string): string {
    return this.translationService.translate(key);
  }

  async viewUserDetails(user: AppUserRow) {
    const modal = await this.modalCtrl.create({
      component: UserDetailModal,
      componentProps: { user },
      cssClass: 'cyber-modal-container',
      backdropDismiss: true
    });
    await modal.present();
  }

  get filteredRows(): AppUserRow[] {
    const q = this.search.trim().toLowerCase();

    return this.rows
      .filter(r => (this.roleFilter === 'Todos' ? true : r.role === this.roleFilter))
      .filter(r => {
        if (!q) return true;
        return (
          r.username.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q)
        );
      });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize));
  }

  get pagedRows(): AppUserRow[] {
    const safePage = Math.min(this.page, this.totalPages);
    const start = (safePage - 1) * this.pageSize;
    return this.filteredRows.slice(start, start + this.pageSize);
  }

  onFiltersChange() {
    this.page = 1;
  }

  prev() {
    this.page = Math.max(1, this.page - 1);
  }

  next() {
    this.page = Math.min(this.totalPages, this.page + 1);
  }

  toggleBlocked(row: AppUserRow, blocked: boolean) {
    row.blocked = blocked;
  }
}
