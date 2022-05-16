import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthGuard,
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { LoginComponent } from './body/login/login.component';
import { RegisterComponent } from './body/register/register.component';
import { AddFileComponent } from './body/add-file/add-file.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome), },
  { path: 'register', component: RegisterComponent, ...canActivate(redirectLoggedInToHome), },

  { path: 'add-file', ...canActivate(redirectUnauthorizedToLogin), component: AddFileComponent },

  { path: '', redirectTo: 'add-file', pathMatch: 'full' },
  { path: '**', redirectTo: 'add-file', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent];
