import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { FarmComponent } from './components/farm/farm.component'
import { FarmCrudComponent } from './components/farm-crud/farm-crud.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { FarmRegisterComponent } from './components/farm-register/farm-register.component'
import { FarmDetailsComponent } from './components/farm-details/farm-details.component'
import { FarmResolver } from './resolver/farm-resolver'
import { MenuComponent } from './components/menu/menu.component'

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'farm-register', component: FarmRegisterComponent },
  { path: 'details/:id', component: FarmDetailsComponent, resolve: { farm: FarmResolver } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
