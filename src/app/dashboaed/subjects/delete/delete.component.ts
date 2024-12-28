import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { SubjectsService } from 'src/app/services/Subjects.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(private toast: ToastrService, public dialogRef: MatDialogRef<DeleteComponent>, private service: SubjectsService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
  }
  Confrim() {
    console.log(this.data)
    this.service.DeleteSubjects(this.data.id).subscribe(ele => {
      console.log(ele);
     // this.toast.success('تمت بنجاح')
      this.dialogRef.close();
    }, (err: any) => {
      console.log(err)
      if (err.status >= 200 && err.status < 300) {
       // this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }
      else {
      //  this.toast.error(' لم تم العملية')
      }
    })

  }
  Cancel() {
    this.dialogRef.close();
  }
}
