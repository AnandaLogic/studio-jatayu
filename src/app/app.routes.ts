import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { StoreComponent } from './components/store/store.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AcademyOfGodsComponent } from './components/projects/academy-of-gods/academy-of-gods.component';
import { BalakandaComponent } from './components/projects/balakanda/balakanda.component';
import { DinoAndDynoComponent } from './components/projects/dino-and-dyno/dino-and-dyno.component';
import { GirlAndTheMonsterComponent } from './components/projects/girl-and-the-monster/girl-and-the-monster.component';
import { NikoComponent } from './components/projects/niko/niko.component';
import { BhagZombieBhagComponent } from './components/projects/bhag-zombie-bhag/bhag-zombie-bhag.component';
import { GullyGangsComponent } from './components/projects/gully-gangs/gully-gangs.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'store', component: StoreComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/academy-of-gods', component: AcademyOfGodsComponent },
  { path: 'projects/balakanda', component: BalakandaComponent },
  { path: 'projects/dino-and-dyno', component: DinoAndDynoComponent },
  { path: 'projects/girl-and-the-monster', component: GirlAndTheMonsterComponent },
  { path: 'projects/niko', component: NikoComponent },
  { path: 'projects/bhag-zombie-bhag', component: BhagZombieBhagComponent },
  { path: 'projects/gully-gangs', component: GullyGangsComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
