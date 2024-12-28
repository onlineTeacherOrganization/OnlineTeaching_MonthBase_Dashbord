import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LockStudentService } from 'src/app/services/lock.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private toast: ToastrService,
    public dialogRef: MatDialogRef<EditComponent>, private service: LockStudentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.data)
      // this.service.UnlockStudenSububject(this.data.studnetID, this.data.subSubjectID).subscribe((ele: any) => {
      //   this.toast.success("تمت العملية بنجاح")
      //   this.dialogRef.close();
      // }, (err: any) => {
      //   if (err.status >= 200 && err.status < 300) {
      //     this.toast.success("تمت العملية بنجاح")
      //     this.dialogRef.close();
      //   }
      //   else {
      //     this.toast.error("لم تتم العملية")
      //   }
      // })
      this.service.UnLockStudent(this.data.studentID).subscribe((ele: any) => {
  //      this.toast.success("تمت العملية بنجاح")
        this.dialogRef.close();
      }, (err) => {
        if (err.status >= 200 && err.status < 300) {
     //     this.toast.success("تمت العملية بنجاح")
          this.dialogRef.close();
        }
        else {
     //     this.toast.error("لم تتم العملية")
        }
      })
      // studentID

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}