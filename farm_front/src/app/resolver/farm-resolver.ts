import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Farm } from '../models/Farm'
import { FarmService } from '../services/farm.service'

@Injectable({ providedIn: 'root' })
export class FarmResolver implements Resolve<Farm> {
  constructor(private service: FarmService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.read(route.params.id)
  }
}
