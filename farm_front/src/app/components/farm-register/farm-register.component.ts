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
  owner: Owner = {} as Owner
  geometryMissing: boolean = false
  nameInvalid: boolean = false
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
      this.owner = this.farm.owner
    })
    if (this.farm == undefined) {
      this.farm = {} as Farm
    }
  }

  getOwners() {
    this.ownerService.list().subscribe((response) => {
      this.owners = response
    })
  }

  changeFarmOwner($event) {
    this.farm.owner = $event.value[0] as Owner
    this.farm.owner_id = $event.value[0].id
    console.log(this.farm)
  }

  // aqui recupero desenho(geometry) da fazenda para enviar ao backend
  receiveGeometry($event) {
    this.farm.geometry = $event
  }

  // Esta funcao verifica se os parametros passados satisfazem a
  // criação do model...
  // Confere se o id do Proprietário existe e se o nome passado é válido!!
  validateSubmit() {
    if (this.farm.name != undefined && this.farm.name != '') {
      this.nameInvalid = false
      if (this.farm.geometry != undefined && this.farm.geometry != null) {
        this.geometryMissing = false
        if (this.farm.owner) {
          this.ownerService.read(this.farm.owner.id).subscribe(
            (response) => {
              this.farmService.create(this.farm as Farm).subscribe((data) => {
                this.router.navigate([''])
                alert('Cadastro efetuado com sucesso!')
                console.log('Cadastro efetuado com sucesso!')
              })
            },
            (error) => {
              alert('Digite um id válido para proprietário!')
              console.error('error verifiyng owner', error)
              this.router.navigate([''])
            }
          )
        }
      } else {
        this.geometryMissing = true
      }
    } else {
      this.nameInvalid = true
    }
  }

  submit(id: number) {
    if (id) {
      this.farmService.update(this.farm).subscribe(
        (data) => {
          console.log('farm updated successfully', data)
          alert('Fazenda atualizada com sucesso!')
          this.router.navigate([''])
        },
        (error) => {
          alert('Ocorreu um problema ao atualizar esta fazenda!')
          console.log('error updating')
        }
      )
    } else {
      this.validateSubmit()
    }
  }
}
