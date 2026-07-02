import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ClienteDashboardPage } from './cliente-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteDashboardPage,
    RouterModule.forChild([{ path: '', component: ClienteDashboardPage }])
  ],
  declarations: []
})
export class ClienteDashboardPageModule {}
