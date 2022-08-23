import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Owner } from 'src/app/models/Owner'
import { Farm } from '../../models/Farm'
import { FarmService } from '../../services/farm.service'
import { MatDialog } from '@angular/material/dialog'
import { OwnerService } from 'src/app/services/owner.service'

@Component({
  selector: 'app-farm-details',
  templateUrl: './farm-details.component.html',
  styleUrls: ['./farm-details.component.scss'],
})
export class FarmDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private farmService: FarmService,
    private ownerService: OwnerService,
    public dialog: MatDialog
  ) {}

  id
  farm!: Farm
  owner: boolean = false

  ngOnInit(): void {
    this.getFarm()
  }

  // recupera os dados da fazenda
  getFarm() {
    this.activatedRoute.data.subscribe((data) => {
      this.farm = data.farm
      this.retrieveOwner()
    })
  }

  retrieveOwner() {
    this.ownerService.read(this.farm.owner_id).subscribe((owner) => {
      this.farm.owner = owner as Owner
    })
    if (this.farm.owner) {
      this.owner = true
    }
    console.log(this.farm)
  }

  // redireciona para a rota de edicao
  openEditPage() {
    this.router.navigate(['/farm-register'], { queryParams: { id: this.farm.id } })
  }

  // remove a fazenda do banco de dados
  deleteFarm() {
    this.farmService.delete(this.farm.id).subscribe(
      (data) => {
        alert('Fazenda deletada com sucesso!')
        console.log(data)
      },
      (error) => {
        alert('Ocorreu algo de errado ao deletar esta fazenda!')
        console.log(error)
      }
    )
    this.router.navigate([''])
  }
}
