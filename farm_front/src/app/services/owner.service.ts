import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Owner } from '../models/Owner'
import { Farm } from './../models/Farm'
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:8000/api/v1/'

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  farmList!: Farm[]
  farm!: Farm

  constructor(private http: HttpClient) {}

  // read(id: number): Farm {
  //   return this.http.get(baseUrl + 'owners/' + id).toPromise() as any
  // }

  list(): Observable<any> {
    return this.http.get(baseUrl + 'owners')
  }

  read(id: Number) {
    return this.http.get(baseUrl + 'owners/' + id)
  }
}
