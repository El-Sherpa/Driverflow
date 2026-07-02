import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class SettingsPage implements OnInit {
  settings = {
    notifications: true,
    darkMode: true,
    language: 'es',
    gpsFrequency: '30'
  };

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    this.translationService.currentLanguage$.subscribe(lang => {
      this.settings.language = lang;
    });
  }

  changeLanguage() {
    this.translationService.setLanguage(this.settings.language);
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  saveSettings() {
    console.log('Ajustes guardados:', this.settings);
  }
}
