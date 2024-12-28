import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from 'src/app/services/Students.service';

@Component({
  selector: 'app-Edit',
  templateUrl: './Edit.component.html',
  styleUrls: ['./Edit.component.scss']
})
export class EditComponent implements OnInit {
  datadialog = this.data;
  Student!: string;
  constructor(private toast: ToastrService,
    public dialogRef: MatDialogRef<EditComponent>, private service: StudentsService,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder
  ) {
    this.datadialog = data;
    this.Student = data.name

  }
  myForm!: FormGroup;
  photo!: any;
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      phone: [this.data.phone, Validators.required],
      parentPhone: [this.data.parentPhone, Validators.required],
    });
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.service.UpdatePhoneNumberForStudentByAdmin({
        id: this.data.id,
        phoneNumber: this.myForm.get('phone')?.value,
        parentPhone: this.myForm.get('parentPhone')?.value,
      }).subscribe(ele => {
     //   this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }, (err: any) => {
        if (err.status >= 200 && err.status < 300) {
       //   this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        }
        else {
        //  this.toast.error(' لم تم العملية')
        }
      })
    }
    else {
      this.toast.error('ادخل جيمع المدخلات')

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
