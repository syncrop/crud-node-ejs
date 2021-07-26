import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/shared/interfaces/mascota.interface';
import { MascotaService } from 'src/app/shared/services/mascota.service';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.scss']
})
export class CrearMascotaComponent implements OnInit {
  form: FormGroup;

  formData = new FormData()

  constructor(
    private mascotaService: MascotaService,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: [''],
      descripcion: [''],
      imagen: [null]
    })
   }

  ngOnInit(): void {

  }

  uploadFile(event): void{
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      imagen: file
    });
    this.form.get('imagen').updateValueAndValidity();
  }

  onSubmit(): void{
    console.log(this.form.value)
    var formData: any = new FormData();
    formData.append("nombre", this.form.get('nombre').value);
    formData.append("descripcion", this.form.get('descripcion').value)
    formData.append("imagen", this.form.get('imagen').value)
    this.mascotaService.postMascota(formData).subscribe(
      resp => this.router.navigate(['/home']),
      err => console.log(err)
    );
  }

}
