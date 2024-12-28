import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SubscrpitionsService } from 'src/app/services/Subscrpitions.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  constructor(
    private toast: ToastrService, public dialogRef: MatDialogRef<EditComponent>, private service: SubscrpitionsService, @Inject(MAT_DIALOG_DATA) public dt: any
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
        "isActive": true
      })
    }
    console.log(this.DataEdit)
    this.service.PutSubscribtion(this.DataEdit).subscribe(ele => {
      console.log(ele);
     // this.toast.success('تمت بنجاح')
      this.dialogRef.close();
    }, (err: any) => {
      console.log(err)
      if (err.status >= 200 && err.status < 300) {
      //  this.toast.success('تمت بنجاح')
      }
      else {
       // this.toast.error(' لم تم العملية')
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
