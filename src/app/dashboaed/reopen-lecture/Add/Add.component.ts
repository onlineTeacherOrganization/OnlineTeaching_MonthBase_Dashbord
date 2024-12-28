import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LecturesService } from 'src/app/services/Lectures.service';

@Component({
  selector: 'app-Add',
  templateUrl: './Add.component.html',
  styleUrls: ['./Add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private toast: ToastrService, public dialogRef: MatDialogRef<AddComponent>, private service: LecturesService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
  }
  Confrim() {
    this.service.Confirm_OpenWatching({
      "lectureID": this.data.lectureID,
      "studentID": this.data.studentID,
      "lectureName": this.data.lectureName,
      "studentName": this.data.studentName,
      "isConfirmed": this.data.isConfirmed,
      "reason": this.data.reason
    }).subscribe({
      next: (ele) => {
       // this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }, error: (err) => {
        console.log(err)
        if (err.status >= 200 && err.status <= 299) {
        //  this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        } else {
        //  this.toast.error(' لم تتم العملية')
        }
      }
    })
  }
  Cancel() {
    this.dialogRef.close();
  }
}
