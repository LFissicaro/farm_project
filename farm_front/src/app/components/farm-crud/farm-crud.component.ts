import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Farm } from '../../models/Farm'
import { Owner } from '../../models/Owner'
import { FarmService } from '../../services/farm.service'

@Component({
  selector: 'app-farm-crud',
  templateUrl: './farm-crud.component.html',
  styleUrls: ['./farm-crud.component.scss'],
})
export class FarmCrudComponent implements OnInit {
  displayedColumns: string[] = ['name'] // aqui eu defino as colunas do crud.
  dataSource: Farm[] = [] // variável que armazenará a lista de fazendas.

  constructor(public dialog: MatDialog, private farmService: FarmService, private router: Router) {}
  ngOnInit(): void {
    this.getFarmList()
  }

  async getFarmList() {
    this.dataSource = (await this.farmService.list()) as Farm[] // chamada do farmService para recuperar a lista de fazendas no banco de dados.
  }

  farmDetails(id: number) {
    this.router.navigate(['/details/' + id])
  }
}
