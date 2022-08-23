import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BasemapComponent } from './basemap/basemap.component'
import { FarmComponent } from './components/farm/farm.component'
import { FarmCrudComponent } from './components/farm-crud/farm-crud.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { FarmRegisterComponent } from './components/farm-register/farm-register.component'
import { FarmDetailsComponent } from './components/farm-details/farm-details.component'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { FarmResolver } from './resolver/farm-resolver'
import { MenuComponent } from './components/menu/menu.component'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [
    AppComponent,
    BasemapComponent,
    FarmComponent,
    FarmCrudComponent,
    DashboardComponent,
    FarmRegisterComponent,
    FarmDetailsComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  providers: [FarmResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
