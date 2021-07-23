import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/shared/interfaces/mascota.interface';
import { MascotaService } from 'src/app/shared/services/mascota.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  mascota: Mascota;
  mascotaForm: FormGroup;

  constructor(
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    console.log(id);
    this.mascotaService.getMascota(id).subscribe(
      resp => {
        this.mascota = resp['mascota'];
        this.mascotaForm = new FormGroup({
          nombre: new FormControl(this.mascota.nombre),
          descripcion: new FormControl(this.mascota.descripcion),
        });
      },
      err => console.log(err)
    );
  }

  onSubmit(): void{
    let mascotaSend: Mascota = {
      nombre: this.mascotaForm.value.nombre,
      descripcion: this.mascotaForm.value.descripcion,
      imagen: this.mascotaForm.value.imagen
    }

    this.mascotaService.putMascota(this.mascota._id, mascotaSend).subscribe(
      resp => console.log(resp),
      err => console.log(err)
    );
  }

  deleteMascota(id): void{
    this.mascotaService.deleteMascota(id).subscribe(
      resp => this.router.navigate(['/home']),
      err => console.log(err)
    )
  }
}
