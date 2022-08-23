import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Farm } from '../../models/Farm'
import { Owner } from '../../models/Owner'
import { FarmService } from '../../services/farm.service'
import { OwnerService } from '../../services/owner.service'
import { GeoJsonFeatureAddon } from '@common/feature'

@Component({
  selector: 'app-farm-register',
  templateUrl: './farm-register.component.html',
  styleUrls: ['./farm-register.component.scss'],
})
export class FarmRegisterComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private farmService: FarmService,
    private ownerService: OwnerService,
    private router: Router
  ) {}

  id
  farm: Farm = {} as Farm
  owners: Owner[] = []
  owner1: Owner = {
    id: 1,
    name: 'Leonardo',
    document: '113.113.113-13',
    document_type: 'CPF',
  }

  ngOnInit(): void {
    this.retrieveFarm()
    this.getOwners()
  }

  retrieveFarm() {
    this.activatedRoute.data.subscribe((data) => {
      this.farm = data.farm
    })
    // gambiarra hihi
    if (this.farm == undefined) {
      this.farm = {} as Farm
      this.farm.owner = {} as Owner
    }
  }

  getOwners() {
    this.ownerService.list().subscribe((response) => {
      this.owners = response
    })
  }

  changeFarmOwner($event) {
    // this.farm.owner = $event.value[0] as Owner
    console.log(this.farm)
  }

  // aqui recupero desenho(geometry) da fazenda para enviar ao backend
  receiveGeometry($event) {
    this.farm.geometry = $event
  }

  // Esta funcao verifica se os parametros passados satisfazem a
  // criação co model...
  // Confere se o id do Proprietário existe e se o nome passado é válido!!
  validateSubmit() {
    // const owner_id = this.farm.owner.id
    if (this.farm.name != undefined && this.farm.name != '') {
      this.ownerService.read(1).subscribe(
        (response) => {
          this.farm.owner = 1
          this.farmService.create(this.farm as Farm).subscribe((data) => {
            this.router.navigate([''])
            alert('Cadastro efetuado com sucesso!')
            console.log('Cadastro efetuado com sucesso!')
          })
        },
        (error) => {
          console.error('error verifiyng owner', error)
          alert('Digite um id válido para proprietário!')
        }
      )
    }
  }

  submit(id: number) {
    if (id) {
      this.farmService.update(this.farm).subscribe(
        (data) => {
          console.log('farm updated successfully', data)
        },
        (error) => {
          console.log('error updating')
        }
      )
      this.router.navigate([''])
    } else {
      this.validateSubmit()
    }
  }
}
