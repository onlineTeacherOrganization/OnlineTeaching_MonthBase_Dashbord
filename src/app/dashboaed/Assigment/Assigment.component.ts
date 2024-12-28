import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QuizAssService } from 'src/app/services/Quiz&Ass.service';

@Component({
  selector: 'app-Assigment',
  templateUrl: './Assigment.component.html',
  styleUrls: ['./Assigment.component.scss']
})
export class AssigmentComponent implements OnInit {
  AssigmentForm!: FormGroup
  AllLectures!: any;
  ngOnInit() {
    this.service.GetAllLecutre().subscribe((ele: any) => this.AllLectures = ele.items)
  }
  constructor(private toast: ToastrService,
    private service: QuizAssService,
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
      name: new FormControl(),
      degree: new FormControl(),
      examDuration: new FormControl(),
      examOpenDate: new FormControl(),
      examCloseDate: new FormControl(),
      lectureID: new FormControl(),
    });
  }
  onSubmit() {
    if (this.AssigmentForm.valid) {

      let form = {
        "id": 0,
        "name": this.AssigmentForm.get('name')?.value,
        "degree": this.AssigmentForm.get('degree')?.value,
        "examDuration": this.AssigmentForm.get('examDuration')?.value,
        "examOpenDate": this.AssigmentForm.get('examOpenDate')?.value,
        "examCloseDate": this.AssigmentForm.get('examCloseDate')?.value,
        "lectureID": +this.AssigmentForm.get('lectureID')?.value
      }
      console.log(this.AssigmentForm)
      this.service.PostAssigment(form).subscribe(ele => {
        console.log(ele);
      }, (err: any) => {
        console.log(err)
        if (err.status >= 200 && err.status < 300) {
          // this.toast.success('تمت بنجاح')
        }
        else {
          //     this.toast.error(' لم تم العملية')
        }
      });
    }
    else {
      this.toast.error('ادخل جميع المدخلات')
    }
  }
  onNoClick(): void {
  }

}
