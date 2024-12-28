import { Component, OnInit, Inject } from '@angular/core';
import { StudentsComponent } from '../students.component';
import { StudentsService } from 'src/app/services/Students.service';
import { SubjectsService } from 'src/app/services/Subjects.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-LockStudent',
  templateUrl: './LockStudent.component.html',
  styleUrls: ['./LockStudent.component.scss']
})
export class LockStudentComponent implements OnInit {

  constructor(private toast: ToastrService, public dialogRef: MatDialogRef<LockStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: StudentsService, private subjectservice: SubSubjectsService, private formBuilder: FormBuilder) {
    console.log(data);

    this.FormGroups = this.formBuilder.group({
      SubSubject: [''],
      Reason: [''],
    });
  }
  Students!: any;
  SubSubjects!: any;
  ngOnInit(): void {
    this.GetData();
  }
  GetData() {
    this.subjectservice.GetSubsubjects().subscribe((ele: any) => {
      this.SubSubjects = ele.items;
      console.log(ele)
    })
  }
  disableSelect = new FormControl(false);
  FormGroups!: FormGroup;
  onSubmit() {
    console.log(this.data.id)
      this.service.LockStudent(this.data.id).subscribe(ele => {
        // this.toast.success('تمت بنجاح', "1")
        this.dialogRef.close();
      }, (err: any) => {
        if (err.status >= 200 && err.status < 300) {
          console.log(err, "err");
          // this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        }
        else {
          // this.toast.error(' لم تم العملية')
        }
      })
  }
  onNoClick() {
    this.dialogRef.close();

  }
}
