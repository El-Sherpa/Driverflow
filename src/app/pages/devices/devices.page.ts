import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslationService } from '../../services/translation.service';

interface Device {
  plate: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class DevicesPage implements OnInit {
  searchQuery: string = '';
  activeDevices: Device[] = [
    { plate: 'ABC-123', status: 'active' },
    { plate: 'DEF-456', status: 'active' },
    { plate: 'GHI-789', status: 'active' }
  ];
  inactiveDevices: Device[] = [
    { plate: 'XYZ-000', status: 'inactive' },
    { plate: 'JKL-111', status: 'inactive' }
  ];

  filteredActive: Device[] = [];
  filteredInactive: Device[] = [];

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    this.filteredActive = [...this.activeDevices];
    this.filteredInactive = [...this.inactiveDevices];
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  onSearch() {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.filteredActive = [...this.activeDevices];
      this.filteredInactive = [...this.inactiveDevices];
      return;
    }
    this.filteredActive = this.activeDevices.filter(d => d.plate.toLowerCase().includes(q));
    this.filteredInactive = this.inactiveDevices.filter(d => d.plate.toLowerCase().includes(q));
  }
}
