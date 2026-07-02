import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from './services/translation.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class AppComponent implements OnInit, OnDestroy {
  userRole$: Observable<string | null>;
  private langSub!: Subscription;

  constructor(
    private authService: AuthService,
    private translationService: TranslationService
  ) {
    this.userRole$ = this.authService.getUserRole();
  }

  ngOnInit() {
    // Escuchar cambios de idioma para forzar detección de cambios si es necesario
    this.langSub = this.translationService.currentLanguage$.subscribe(() => {
      // El pipe async y los métodos t() se encargarán de actualizar la vista
    });
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  logout() {
    this.authService.logout();
  }
}
