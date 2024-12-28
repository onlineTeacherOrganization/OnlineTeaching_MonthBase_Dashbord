import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { SubscrpitionsService } from 'src/app/services/Subscrpitions.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  constructor(
    private toast: ToastrService, public dialogRef: MatDialogRef<DeleteComponent>, private service: SubscrpitionsService, @Inject(MAT_DIALOG_DATA) public dt: any
  ) {

  }
  ngOnInit(): void {
  }
  DataEdit: any = [];
  onSubmit() {
    for (let index = 0; index < this.dt.length; index++) {
      this.DataEdit.push({
        "studentID": this.dt[index].studentID,
        "subjectID": this.dt[index].subjectID,
      })
    }
    console.log(this.DataEdit)
    this.service.Delete(this.DataEdit).subscribe(ele => {
      console.log(ele);
     // this.toast.success('تمت بنجاح')
      this.dialogRef.close();
    }, (err: any) => {
      console.log(err)
      if (err.status >= 200 && err.status < 300) {
     //   this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }
      else {
      //  this.toast.error(' لم تم العملية')
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
