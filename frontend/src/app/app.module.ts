import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './pages/home/home.module';
import { CrearMascotaModule } from './pages/crear-mascota/crear-mascota.module';
import { DetallesModule } from './pages/detalles/detalles.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    CrearMascotaModule,
    DetallesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
