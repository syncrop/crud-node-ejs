import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mascota } from '../interfaces/mascota.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  constructor(private httpClient: HttpClient) { }

  public getMascotas(): Observable<Array<Mascota>>{
    return this.httpClient.get<Array<Mascota>>('mascotas');
  }

  public postMascota(data): Observable<Mascota>{
    return this.httpClient.post<Mascota>('mascotas', data);
  }

  public putMascota(id, data): Observable<Mascota>{
    return this.httpClient.put<Mascota>('mascotas/'+id, data);
  }

  public getMascota(id): Observable<Mascota>{
    return this.httpClient.get<Mascota>('mascotas/'+id);
  }

  public deleteMascota(id): Observable<Mascota>{
    return this.httpClient.delete<Mascota>('mascotas/'+id);
  }

  public uploadImage(id, data): Observable<Mascota>{
    return this.httpClient.put<Mascota>('mascotas/image/'+id, data);
  }
}
