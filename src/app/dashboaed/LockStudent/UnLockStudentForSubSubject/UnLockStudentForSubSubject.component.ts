import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LevelsService } from 'src/app/services/Levels.service';
import { LockStudentService } from 'src/app/services/lock.service';

@Component({
  selector: 'app-UnLockStudentForSubSubject',
  templateUrl: './UnLockStudentForSubSubject.component.html',
  styleUrls: ['./UnLockStudentForSubSubject.component.scss']
})
export class UnLockStudentForSubSubjectComponent implements OnInit {

  constructor(private toast: ToastrService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UnLockStudentForSubSubjectComponent>, private service: LockStudentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    /*
    isGeneral
lockedCount
studentName
studnetID
subSubjectID
subjectName
*/
  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.data.subSubjectID) {
      this.service.UnlockStudenSububject(this.data.studnetID, this.data.subSubjectID)
      .subscribe((ele: any) => {
        // this.toast.success("تمت العملية بنجاح")
        this.dialogRef.close();
      }, (err: any) => {
        if (err.status >= 200 && err.status < 300) {
          // this.toast.success("تمت العملية بنجاح")
          this.dialogRef.close();
        }
        else{
          // this.toast.error("لم تتم العملية")
        }
      })

    }
    else {
      this.service.UnLockStudent(this.data.studnetID).subscribe((ele: any) => {
        // this.toast.success("تمت العملية بنجاح")
        this.dialogRef.close();
      }, (err) => {
        if (err.status >= 200 && err.status < 300) {
          // this.toast.success("تمت العملية بنجاح")
          this.dialogRef.close();
        }
        else{
          // this.toast.error("لم تتم العملية")
        }
      })
      console.log(this.data.studentName)
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
