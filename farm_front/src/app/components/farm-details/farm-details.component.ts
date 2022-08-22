import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Owner } from 'src/app/models/Owner'
import { Farm } from '../../models/Farm'
import { FarmService } from '../../services/farm.service'
import { MatDialog } from '@angular/material/dialog'
import { FarmDeleteDialogComponent } from '../farm-delete-dialog/farm-delete-dialog.component'

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
    public dialog: MatDialog
  ) {
    // this.farm.owner = {} as Owner
  }

  id
  farm!: Farm
  owner1: Owner = {
    id: 1,
    name: 'Leonardo',
    document: '113.113.113-13',
    document_type: 'CPF',
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.farm = data.farm
    })
  }

  openEditPage() {
    this.router.navigate(['/farm-register'], { queryParams: { id: this.id } })
  }

  deleteFarm() {
    this.farmService.delete(this.id)
    this.router.navigate([''])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FarmDeleteDialogComponent, {
      data: { id: this.id },
      width: '250px',
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result)
    })
  }
}
