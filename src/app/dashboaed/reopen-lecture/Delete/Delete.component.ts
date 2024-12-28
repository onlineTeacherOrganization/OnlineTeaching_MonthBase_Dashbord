import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { LecturesService } from 'src/app/services/Lectures.service';

@Component({
  selector: 'app-Delete',
  templateUrl: './Delete.component.html',
  styleUrls: ['./Delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(private toast: ToastrService, public dialogRef: MatDialogRef<DeleteComponent>, private service: LecturesService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
  }
  Confrim() {
    console.log(this.data)

    this.service.Confirm_OpenWatching({
      "lectureID": this.data.lectureID,
      "studentID": this.data.studentID,
      "lectureName": this.data.lectureName,
      "studentName": this.data.studentName,
      "isConfirmed": this.data.isConfirmed,
      "reason": this.data.reason
    }).subscribe({
      next: (ele) => {
        console.log(ele)
       // this.toast.success("تمت العملية بنجاح");
        this.dialogRef.close();

      }, error: (err) => {
        console.log(err)
        if (err.status >= 200 && err.status <= 299) {
        //  this.toast.success("تمت العملية بنجاح");
          this.dialogRef.close();
        }
        else{

          //  this.toast.error("لم تتم العملية");
        }
      }
    })
    this.dialogRef.close();
  }
  Cancel() {
    this.dialogRef.close();
  }


}
