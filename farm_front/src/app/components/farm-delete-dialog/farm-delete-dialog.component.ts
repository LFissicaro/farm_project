import { Component } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { FarmService } from 'src/app/services/farm.service'

@Component({
  selector: 'app-farm-delete-dialog',
  templateUrl: './farm-delete-dialog.component.html',
})
export class FarmDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FarmDeleteDialogComponent>,
    private service: FarmService,
    private activatedRoute: ActivatedRoute
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  confirmDelete() {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data)
      // this.service.delete(data.id)
    })
  }
}
