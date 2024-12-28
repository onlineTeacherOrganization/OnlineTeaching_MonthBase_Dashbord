import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/Question.service';

@Component({
  selector: 'app-Delete',
  templateUrl: './Delete.component.html',
  styleUrls: ['./Delete.component.scss']
})
export class DeleteComponent implements OnInit {
  constructor(private toast: ToastrService, public dialogRef: MatDialogRef<DeleteComponent>, private service: QuestionService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
  }
  Confrim() {

    this.service.DeleteQuestions(this.data).subscribe(ele => {
      console.log(ele);
    //  this.toast.success('تم المسح')
      this.dialogRef.close();
    }, (err: any) => {
      console.log(err)
      if (err.status >= 200 && err.status < 300) {
      //  this.toast.success('تم المسح')
        this.dialogRef.close();
      }
      else {
      //  this.toast.error(' لم تم العملية')
        this.dialogRef.close();
      }
    });
  }
  Cancel() {
    this.dialogRef.close();
  }

}
