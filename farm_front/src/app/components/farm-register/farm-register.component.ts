import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Farm } from '../../models/Farm'
import { Owner } from '../../models/Owner'
import { FarmService } from '../../services/farm.service'
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
    private router: Router
  ) {}

  id
  farm: Farm = {} as Farm
  owner1: Owner = {
    id: 1,
    name: 'Leonardo',
    document: '113.113.113-13',
    document_type: 'CPF',
  }
  geometryToLoad: GeoJsonFeatureAddon = {} as GeoJsonFeatureAddon

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params.id // recuperando o id passado pela rota de farm-register
    })
    if (this.id > 0) {
      this.retrieveFarm() // caso o id já exista, ou seja maior que 0, considero que seja edição de um registro
    } else {
      this.farm = {} as Farm // no caso contrário eu suponho que seja a criação de uma nova fazenda,
    }
  }

  async retrieveFarm() {
    this.farm = await this.farmService.read(this.id)
  }

  // Nessa função eu recupero o objeto GeoJsonFeatureAddon,
  // vindo do componente filho @app-farm,
  // para adicionar a fazenda que está sendo editada/criada
  receiveGeometry($event) {
    this.farm.geometry = $event
  }

  submit(id: number) {
    if (id > 0) {
      this.farmService.update(this.farm)
      this.router.navigate([''])
    } else {
      if (this.farm.name != undefined) {
        this.farmService.create(this.farm)
        this.router.navigate([''])
      }
    }
    alert('Cadastro efetuado com sucesso!')
  }
}
