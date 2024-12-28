import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from 'src/app/services/Students.service';
@Component({
  selector: 'app-lockstudents',
  templateUrl: './lockstudents.component.html',
  styleUrls: ['./lockstudents.component.scss']
})
export class LockstudentsComponent implements OnInit {
  resaon!: any
  StudentName = this.data[1].name;
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<LockstudentsComponent>, private service: StudentsService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toast: ToastrService) { }
  ngOnInit(): void {
    console.log(this.data)
  }
  onSubmit() {
    this.service.LockStudentForSubSubject(this.data[1].id, this.data[0], this.resaon).subscribe(ele => {
      console.log(ele);
   //   this.toast.success('تمت بنجاح')
      this.dialogRef.close();
    }, (err: any) => {
      console.log(err)
      if (err.status >= 200 && err.status < 300) {
      //  this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }
      else {
     //   this.toast.error(' لم تم العملية')
      }
    })
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
