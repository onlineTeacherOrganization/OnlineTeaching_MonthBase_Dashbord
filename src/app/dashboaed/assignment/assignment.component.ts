import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizAssService } from 'src/app/services/Quiz&Ass.service';
import { ConfrimComponent } from '../exams/confrim/confrim.component';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  AssigmentForm!: FormGroup
  AllLectures!: any;
  ngOnInit() {
    this.service.GetAllLecutre().subscribe((ele: any) => {
      this.service.getAllLecutre(ele.count).subscribe((ele2: any) => {
        this.AllLectures = ele2.items
        console.log(this.AllLectures)
      })
    })
  }
  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AssignmentComponent>, private toast: ToastrService,
    private service: QuizAssService, private router: Router
  ) {
    // this.AssigmentForm == this.formBuilder.group({
    //   name: ['', Validators.required],
    //   degree: ['', Validators.required],
    //   examDuration: ['', Validators.required],
    //   examOpenDate: ['', Validators.required],
    //   examCloseDate: ['', Validators.required],
    //   lectureID: ['', Validators.required],
    // });
    this.AssigmentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      degree: new FormControl(''),
      examDuration: new FormControl(''),
      examOpenDate: new FormControl(''),
      examCloseDate: new FormControl(''),
      lectureID: new FormControl('', Validators.required),
    });
  }
  invalid = false;

  onSubmit() {
    if (typeof this.AssigmentForm.get('lectureID')?.value != 'object') {
      {
        this.valuebool == true
      }
    }
    else {
      this.valuebool == false
    }

    let AssigmentexamDuration = this.AssigmentForm.get('examDuration')?.value
    let Assigmentdegree = this.AssigmentForm.get('degree')?.value
    if (AssigmentexamDuration == '')
      AssigmentexamDuration = null
    if (Assigmentdegree == '')
      Assigmentdegree = null
    if (this.AssigmentForm.valid && typeof this.AssigmentForm.get('lectureID')?.value == 'object') {
      this.invalid = false;
      this.valuebool = false

      let examOpenDateForm = this.AssigmentForm.get('examOpenDate')?.value;
      if (this.AssigmentForm.get('examOpenDate')?.value == '') {
        examOpenDateForm = null
      }
      let examCloseDateForm = this.AssigmentForm.get('examCloseDate')?.value
      if (examCloseDateForm == '') {
        examCloseDateForm = null
      }
      let form = {
        "id": 0,
        "name": this.AssigmentForm.get('name')?.value,
        "degree": Assigmentdegree == null ? 0 : Assigmentdegree,
        "examDuration": AssigmentexamDuration == null ? 0 : AssigmentexamDuration,
        "examOpenDate": examOpenDateForm,
        "examCloseDate": examCloseDateForm,
        "lectureID": this.AssigmentForm.get('lectureID')?.value.id
      }
      this.service.GetLectureByID(this.AssigmentForm.get('lectureID')?.value.id).subscribe((ele: any) => {
        console.log(ele)
        console.log(ele?.assigmentID)
        console.log(typeof ele?.assigmentID != 'number')
        if (ele?.assigmentID) {
          if (typeof ele?.assigmentID == 'number') {
            this.AddConfrimComponentDialog(form)
          }
        }
        else {
          this.service.PostAssigment(form).subscribe(ele => {
            // this.toast.success('تمت بنجاح')
            this.dialogRef.close();
            // this.router.navigate(['/dashboard/exams'])

          }, (err: any) => {
            if (err.status >= 200 && err.status < 300) {
              //   this.toast.success('تمت بنجاح');
              this.dialogRef.close();
              // this.router.navigate(['/dashboard/exams'])
            }
            else {
              //   this.toast.error(' لم تم العملية')
            }
          });
        }
      })

    }
    else {
      this.toast.error(`ادخل جميع المدخلات المطلوبة `);
      this.invalid = true;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  keyword = 'name';
  onChangeSub(event: any) {
  }
  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  valuebool = false;
  onFocused(e: any) {
    // do something when input is focused
  }

  AddConfrimComponentDialog(dataItem: any): void {
    const dialogRef = this.dialog.open(ConfrimComponent, {
      data: dataItem,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      console.log(result.status)
      console.log(result.status == true)
      console.log(result.status === true)
      if (result.status === true) {
        this.service.PostAssigment(dataItem).subscribe(ele => {
          // this.toast.success('تمت بنجاح')
          this.dialogRef.close();
          // this.router.navigate(['/dashboard/exams'])

        }, (err: any) => {
          if (err.status >= 200 && err.status < 300) {
            //   this.toast.success('تمت بنجاح');
            this.dialogRef.close();
            // this.router.navigate(['/dashboard/exams'])
          }
          else {
            //   this.toast.error(' لم تم العملية')
          }
        });
      }
      else if (result.status === false) {
        // this.dialogRef.close();
      }
    });
  }
}
