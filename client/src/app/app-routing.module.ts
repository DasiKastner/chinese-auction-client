import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftComponent } from './components/gift/gift.component';
import { DonorComponent } from './components/donor/donor.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { LotteryComponent } from './components/lottery/lottery.component';

// const routes: Routes = [
//   {'path': "/", 'component': GiftComponent},
//   {'path': "/donor", 'component': DonorComponent}
// ];


const routes: Routes = [
  { path: '', redirectTo: 'home/0', pathMatch: 'full' },

  {
    path: 'home/:id', component: NavigationComponent, children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'donor', component: DonorComponent },
      { path: 'homePage', component: HomePageComponent },
      { path: 'gift', component: GiftComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'lottery', component: LoginComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
