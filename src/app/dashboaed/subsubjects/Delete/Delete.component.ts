import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';

@Component({
  selector: 'app-Delete',
  templateUrl: './Delete.component.html',
  styleUrls: ['./Delete.component.scss']
})
export class DeleteComponent implements OnInit {
  id!: any;
  constructor(private toast: ToastrService, public dialogRef: MatDialogRef<DeleteComponent>, private service: SubSubjectsService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { this.id = data; }
  ngOnInit(): void {
    console.log(this.data);
  }
  Confrim() {
    console.log(this.id)
    console.log(this.data)
    this.service.DeleteSubsubjects(this.id).subscribe(ele => {
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
  Cancel() {
    this.dialogRef.close();
  }

}

