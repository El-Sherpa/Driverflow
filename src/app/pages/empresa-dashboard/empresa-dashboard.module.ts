import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EmpresaDashboardPage } from './empresa-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaDashboardPage,
    RouterModule.forChild([{ path: '', component: EmpresaDashboardPage }])
  ],
  declarations: []
})
export class EmpresaDashboardPageModule {}
