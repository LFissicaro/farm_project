import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Farm } from '../../models/Farm'
import { Owner } from '../../models/Owner'
import { FarmService } from '../../services/farm.service'

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
  ) {
    // this.farm.owner = {} as Owner
  }

  id
  farm: Farm = {} as Farm
  owner1: Owner = {
    id: 1,
    name: 'Leonardo',
    document: '113.113.113-13',
    document_type: 'CPF',
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params)
      this.id = params.id
    })
    console.log(this.id)
    if (this.id > 0) {
      this.retrieveFarm() // caso o id seja o id passado seja um numero 'valido' (maior que 0) eu faço a verificação com o banco de dados.
    } else {
      this.farm = {} as Farm // no caso contrário eu suponho que seja a criação de uma nova fazenda,
      // this.farm.owner = {} as Owner // e inicio o objeto farm e owner.
    }
  }

  async retrieveFarm() {
    this.farm = await this.farmService.read(this.id)
    // this.farm.owner = owner1
    console.log(this.farm)
  }

  submit(id: number) {
    if (id > 0) {
      var response = this.farmService.update(this.farm)
      this.router.navigate([''])
      console.log(response, 'edit')
    } else {
      if (this.farm.name != undefined) {
        const response = this.farmService.create(this.farm)
        this.router.navigate([''])
        console.log(response, 'create')
      }
    }
  }
}
