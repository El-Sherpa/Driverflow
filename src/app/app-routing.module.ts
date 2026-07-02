import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: 'gps',
    loadComponent: () => import('./pages/gps/gps.page').then(m => m.GpsPage)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.page').then(m => m.UsersPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'company-code',
    loadComponent: () => import('./pages/company-code/company-code.page').then(m => m.CompanyCodePage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa'] }
  },
  {
    path: 'clients',
    loadComponent: () => import('./pages/clients/clients.page').then(m => m.ClientsPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa'] }
  },
  {
    path: 'agents',
    loadComponent: () => import('./pages/agents/agents.page').then(m => m.AgentsPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa'] }
  },
  {
    path: 'devices',
    loadComponent: () => import('./pages/devices/devices.page').then(m => m.DevicesPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa'] }
  },
  {
    path: 'assign-vehicle',
    loadComponent: () => import('./pages/assign-vehicle/assign-vehicle.page').then(m => m.AssignVehiclePage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa'] }
  },
  {
    path: 'vehicle',
    loadComponent: () => import('./pages/vehicle/vehicle.page').then(m => m.VehiclePage)
  },
  {
    path: 'plans',
    loadComponent: () => import('./pages/plans/plans.page').then(m => m.PlansPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa'] }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.page').then(m => m.AdminDashboardPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'empresa-dashboard',
    loadComponent: () => import('./pages/empresa-dashboard/empresa-dashboard.page').then(m => m.EmpresaDashboardPage),
    canActivate: [RoleGuard],
    data: { roles: ['empresa'] }
  },
  {
    path: 'cliente-dashboard',
    loadComponent: () => import('./pages/cliente-dashboard/cliente-dashboard.page').then(m => m.ClienteDashboardPage),
    canActivate: [RoleGuard],
    data: { roles: ['cliente'] }
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
    canActivate: [RoleGuard],
    data: { roles: ['cliente', 'empresa', 'admin'] }
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa'] }
  },
  {
    path: 'telemetry',
    loadComponent: () => import('./pages/telemetry/telemetry.page').then(m => m.TelemetryPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa'] }
  },
  {
    path: 'chat-list',
    loadComponent: () => import('./pages/chat-list/chat-list.page').then(m => m.ChatListPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa', 'cliente'] }
  },
  {
    path: 'chat-conversation',
    loadComponent: () => import('./pages/chat-conversation/chat-conversation.page').then(m => m.ChatConversationPage),
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'empresa', 'cliente'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
