import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

import { HomeComponent } from './home/home.component';
import { ActivateComponent } from './activate/activate.component';
import { DocumentTrackingComponent } from './document-tracking/document-tracking.component';
import { RecipeReportingComponent } from './recipe-reporting/recipe-reporting.component';
import { SettingsComponent } from "./settings/settings.component";
import { BuildComponent } from './build/build.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BillingComponent } from './billing/billing.component';
import { MailAlertComponent } from './mail-alert/mail-alert.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children: [
    { path: '',component: HomeComponent, canActivate: [AuthGuard], },
    { path: 'build', component: BuildComponent, canActivate: [AuthGuard], data: {title: 'Build', roles: [Role.Admin]}},
    { path: 'activate', component: ActivateComponent, canActivate: [AuthGuard], data: {title: 'Activate', roles: [Role.Admin]}},
    { path: 'document-tracking', component: DocumentTrackingComponent, canActivate: [AuthGuard], data: {title: 'Document Tracking', roles: [Role.Admin]}},
    { path: 'recipe-reporting', component: RecipeReportingComponent, canActivate: [AuthGuard], data: {title: 'Recipe Reporting', roles: [Role.Admin]}},
    { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard], data: {title: 'Change Password', roles: [Role.Admin]}},
    {
      path: 'settings',
      component: SettingsComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Settings',
        roles: [Role.Admin]
      },
      children: [
        {
          path: '',
          //redirectTo: environment.isAdmin ? 'user-profile' : 'billing',
          redirectTo: 'billing',
          pathMatch: 'full'
        },
        {
          path: 'billing',
          component: BillingComponent,
          data: { title: 'Billing' }
        },
        {
          path: 'mail-alert',
          component: MailAlertComponent,
          data: { title: 'Mail Alert' }
        },
        {
          path: 'company-profile',
          component: CompanyProfileComponent,
          data: { title: 'Company Profile' }
        }
      ]
    }
  ]
   },
  { path: 'login', component: LoginComponent, data: {title: 'Login'}},
    // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
