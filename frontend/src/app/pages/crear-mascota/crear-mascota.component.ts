import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Mascota } from 'src/app/shared/interfaces/mascota.interface';
import { MascotaService } from 'src/app/shared/services/mascota.service';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.scss']
})
export class CrearMascotaComponent implements OnInit {
  mascota = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    imagen: new FormControl('')
  });

  constructor(private mascotaService: MascotaService) { }

  ngOnInit(): void {

  }

  onSubmit(): void{
    let mascotaSend: Mascota = {
      nombre: this.mascota.value.nombre,
      descripcion: this.mascota.value.descripcion,
      imagen: this.mascota.value.imagen
    }
    this.mascotaService.postMascota(mascotaSend).subscribe(
      resp => console.log(resp),
      err => console.log(err)
    );
  }

}
