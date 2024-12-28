import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { LecturesService } from 'src/app/services/Lectures.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  constructor(private toast: ToastrService, public dialogRef: MatDialogRef<DeleteComponent>, private service: LecturesService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  Confrim() {
    this.service.DeleteLectures(this.data.id).subscribe(ele => {
    //  this.toast.success('تمت بنجاح')
      this.dialogRef.close();
    }, (err: any) => {
      if (err.status >= 200 && err.status < 300) {
    //    this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }
      else {
     //   this.toast.error(' لم تم العملية') 
      }
    })
  }
  Cancel() {
    this.dialogRef.close();
  }

}
