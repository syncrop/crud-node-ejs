import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/shared/interfaces/mascota.interface';
import { MascotaService } from 'src/app/shared/services/mascota.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MascotaService]
})
export class HomeComponent implements OnInit {
  arrayMascotas: Array<Mascota> = [];

  constructor(private mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe(
      resp => {
        this.arrayMascotas = resp['mascotas']
      },
      err => console.log(err)
    );
  }

}
