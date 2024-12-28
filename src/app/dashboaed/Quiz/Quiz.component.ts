import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { QuizAssService } from 'src/app/services/Quiz&Ass.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-Quiz',
  templateUrl: './Quiz.component.html',
  styleUrls: ['./Quiz.component.scss']
})
export class QuizComponent implements OnInit {
  AllLectures!: any;
  QuizForm!: FormGroup

  ngOnInit() {
    this.service.GetAllLecutre().subscribe((ele: any) => this.AllLectures = ele.items)
  }
  constructor(private toast: ToastrService,
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
    this.QuizForm = new FormGroup({
      name: new FormControl(),
      degree: new FormControl(),
      examDuration: new FormControl(),
      examOpenDate: new FormControl(),
      examCloseDate: new FormControl(),
      lectureID: new FormControl(),
    });
  }
  onSubmit() {
    let form = {
      "id": 0,
      "name": this.QuizForm.get('name')?.value,
      "degree": this.QuizForm.get('degree')?.value,
      "examDuration": this.QuizForm.get('examDuration')?.value,
      "examOpenDate": this.QuizForm.get('examOpenDate')?.value,
      "examCloseDate": this.QuizForm.get('examCloseDate')?.value,
      "lectureID": this.QuizForm.get('lectureID')?.value
    }
    this.service.PostQuiz(form).subscribe(ele => {
      console.log(ele);
    //  this.toast.success('تمت بنجاح')
    }, (err: any) => {
      console.log(err)
      if (err.status >= 200 && err.status < 300) {
    //    this.toast.success('تمت بنجاح')
      }
      else {
     //   this.toast.error(' لم تم العملية')
      }
    });
  }
  onNoClick(): void {
  }
}
