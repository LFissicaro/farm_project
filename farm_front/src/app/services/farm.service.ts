import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Owner } from '../models/Owner'
import { Farm } from './../models/Farm'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  farmList!: Farm[]
  farm!: Farm

  baseUrl = 'http://localhost:8000/api/v1/'
  constructor(private http: HttpClient) {}

  create(farm: Farm): Observable<any> {
    console.log('creating', farm)
    return this.http.post(this.baseUrl + 'farms', farm)
  }

  update(farm: Farm): Observable<any> {
    return this.http.put(this.baseUrl + 'farms/' + farm.id, farm)
  }

  read(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'farms/' + id)
  }

  list(): Farm[] {
    return this.http.get(this.baseUrl + 'farms').toPromise() as any
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'farms/' + id)
  }
}
