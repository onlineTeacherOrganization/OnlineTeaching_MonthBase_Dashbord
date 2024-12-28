import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExamsService } from 'src/app/services/Exams.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  ReExam =
    {
      "studentID": 0,
      "requestObjectID": 0,
      "isActive": true
    };
  ngOnInit() {
  }
  subsubjects!: any
  constructor(private toast: ToastrService,
    public dialogRef: MatDialogRef<AddComponent>, private service: ExamsService, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }
  onSubmit() {
    this.ReExam.isActive = true;
    this.ReExam.requestObjectID=this.data.requestObjectID;
    this.ReExam.studentID=this.data.studentID;
    this.service.PostAcceptReopenExam(this.ReExam).subscribe(ele => {
      console.log(ele);
     // this.toast.success('تمت بنجاح')
      this.dialogRef.close();
    }, (err: any) => {
      console.log(err)
      if (err.status >= 200 && err.status < 300) {
      //  this.toast.success('تمت بنجاح')
        this.dialogRef.close();
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
