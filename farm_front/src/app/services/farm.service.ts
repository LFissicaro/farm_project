import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Owner } from '../models/Owner'
import { Farm } from './../models/Farm'

const baseUrl = 'http://localhost:8000/api/v1/'

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  farmList!: Farm[]
  farm!: Farm

  constructor(private http: HttpClient) {}

  create(farm: Farm) {
    this.http.post(baseUrl + 'farms', farm).toPromise()
  }

  update(farm: Farm) {
    return this.http.put(baseUrl + 'farms/' + farm.id, farm).toPromise()
  }

  read(id: number): Farm {
    return this.http.get(baseUrl + 'farms/' + id).toPromise() as any
  }

  list(): Farm[] {
    return this.http.get(baseUrl + 'farms').toPromise() as any
  }

  delete(id: number) {
    return this.http.delete(baseUrl + 'farms/' + id).toPromise()
  }
}
