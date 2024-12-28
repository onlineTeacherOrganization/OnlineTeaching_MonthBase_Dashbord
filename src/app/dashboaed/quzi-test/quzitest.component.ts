import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizAssService } from 'src/app/services/Quiz&Ass.service';

@Component({
  selector: 'app-quzitest',
  templateUrl: './quzitest.component.html',
  styleUrls: ['./quzitest.component.scss']
})
export class QuzitestComponent {
  AllLectures!: any;
  QuizForm!: FormGroup

  ngOnInit() {
    this.service.GetAllLecutre().subscribe((ele: any) => {
      this.service.getAllLecutre(ele.count).subscribe((ele2: any) => {
        this.AllLectures = ele2.items
      })
    })
  }
  constructor(public dialogRef: MatDialogRef<QuzitestComponent>, private toast: ToastrService, private formBuilder: FormBuilder, private router: Router,
    private service: QuizAssService,
  ) {
    // this.QuizForm == this.formBuilder.group({
    //   name: ['', Validators.required],
    //   degree: ['', Validators.required],
    //   examDuration: ['', Validators.required],
    //   examOpenDate: ['', Validators.required],
    //   examCloseDate: ['', Validators.required],
    //   lectureID: ['', Validators.required],
    // });
    this.QuizForm = this.formBuilder.group({
      name: [],
      degree: [],
      examDuration: [''],
      examOpenDate: [null],
      examCloseDate: [null],
      lectureID: [''],
      precentageToOpen: [''],
    })
    // this.QuizForm = new FormGroup({
    //   name: new FormControl(),
    //   degree: new FormControl(),
    //   examDuration: new FormControl(),
    //   examOpenDate: new FormControl(),
    //   examCloseDate: new FormControl(),
    //   lectureID: new FormControl(),
    // });
  }
  invalid = false;
  valuebool = false;
  onSubmit() {
    if (typeof this.QuizForm.get('lectureID')?.value != 'object')
      this.valuebool = true
    else
      this.valuebool = false

    let quizexamDuration = this.QuizForm.get('examDuration')?.value
    let quizdegree = this.QuizForm.get('degree')?.value
    if (quizexamDuration == '')
      quizexamDuration = null
    if (quizdegree == '')
      quizdegree = null
    if (this.QuizForm.valid && typeof this.QuizForm.get('lectureID')?.value == 'object') {
      this.invalid = false;
      this.valuebool = false

      this.invalid = false;
      let examOpenDateForm = this.QuizForm.get('examOpenDate')?.value;
      if (examOpenDateForm == '') {
        examOpenDateForm = null
      }
      let examCloseDateForm = this.QuizForm.get('examCloseDate')?.value
      if (examCloseDateForm == '') {
        examCloseDateForm = null
      }
      let form = {
        "id": 0,
        "name": this.QuizForm.get('name')?.value,
        "degree": quizdegree == null ? 0 : quizdegree,
        "examDuration": quizexamDuration == null ? 0 : quizexamDuration,
        "examOpenDate": examOpenDateForm,
        "examCloseDate": examCloseDateForm,
        "lectureID": this.QuizForm.get('lectureID')?.value.id,
        "precentageToOpen": this.QuizForm.get('precentageToOpen')?.value,
      }
      this.service.PostQuiz(form).subscribe(ele => {
        // this.toast.success('تمت بنجاح')
        this.dialogRef.close();
        // this.router.navigate(['/dashboard/exams'])
      }, (err: any) => {
        if (err.status >= 200 && err.status < 300) {
          // this.toast.success('تمت بنجاح')
          this.dialogRef.close();

          // this.router.navigate(['/dashboard/exams'])
        }
        else {
          // this.toast.error(' لم تم العملية')
        }
      });
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

  onFocused(e: any) {
    // do something when input is focused
  }
}
