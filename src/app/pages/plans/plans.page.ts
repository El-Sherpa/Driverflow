import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslationService } from '../../services/translation.service';

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class PlansPage implements OnInit {
  cycle: 'monthly' | 'annual' = 'monthly';
  currency: 'COP' | 'USD' = 'COP';

  private readonly basePrices = {
    'Básico': 9.00,
    'Pro': 19.00,
    'Enterprise': 49.00
  };

  private readonly exchangeRate = 4000;

  plans: Plan[] = [
    {
      name: 'Básico',
      price: 0,
      description: 'Ideal para seguimiento individual de vehículos.',
      features: ['Seguimiento en tiempo real', 'Historial de 30 días', 'Alertas básicas']
    },
    {
      name: 'Pro',
      price: 0,
      description: 'Perfecto para pequeñas flotas en crecimiento.',
      features: ['Todo en Básico', 'Geocercas ilimitadas', 'Reportes detallados', 'Soporte prioritario']
    },
    {
      name: 'Enterprise',
      price: 0,
      description: 'Solución completa para grandes operaciones logísticas.',
      features: ['Todo en Pro', 'API de integración', 'Gestión de conductores', 'Análisis predictivo']
    }
  ];

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    this.calculatePrice();
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  onFiltersChange() {
    this.calculatePrice();
  }

  calculatePrice() {
    this.plans.forEach(plan => {
      let price = this.basePrices[plan.name as keyof typeof this.basePrices];
      
      if (this.cycle === 'annual') {
        price = (price * 12) * 0.8;
      }

      if (this.currency === 'COP') {
        price = price * this.exchangeRate;
      }

      plan.price = price;
    });
  }

  onSelectPlan(plan: Plan) {
    console.log('Selected plan:', plan.name);
  }
}
