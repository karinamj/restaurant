import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateMenuComponent } from './pages/create-menu/create-menu.component';
import { DetailMenuComponent } from './pages/detail-menu/detail-menu.component';
import { PlateSelectComponent } from './pages/plate-select/plate-select.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'home/:id/post', component:HomeComponent},
  {path: 'create/menu/:id', component:CreateMenuComponent},
  {path: 'detail/menu/:id', component:DetailMenuComponent},
  {path: 'get/menu', component:PlateSelectComponent},
  {path: 'login', component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
