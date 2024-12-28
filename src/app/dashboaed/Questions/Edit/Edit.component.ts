import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/Question.service';

@Component({
  selector: 'app-Edit',
  templateUrl: './Edit.component.html',
  styleUrls: ['./Edit.component.scss']
})
export class EditComponent implements OnInit {
  editdata!: any;
  filename!: string
  photo!: any;
  datats: any;
  Id!: any;
  formedit!: FormGroup;
  constructor(private toast: ToastrService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditComponent>, private service: QuestionService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.editdata = data.Qestionmar;
    this.Id = data.id;
    // this.formedit = this.formBuilder.group({
    //   id: [this.editdata.id],
    //   description: [this.editdata.description, Validators.required],
    //   oneAnswer: [this.editdata.oneAnswer, Validators.required],
    //   secondAnswer: [this.editdata.secondAnswer, Validators.required],
    //   thirdAnswer: [this.editdata.thirdAnswer, Validators.required],
    //   correctAnswer: [this.editdata.correctAnswer, Validators.required],
    //   fourthAnswer: [this.editdata.fourthAnswer, Validators.required],
    // });
    this.formedit = this.formBuilder.group({
      id: [this.editdata.id],
      description: [''],
      oneAnswer: ['', Validators.required],
      secondAnswer: ['', Validators.required],
      thirdAnswer: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      fourthAnswer: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.service.GetQuestion(this.data.Qestionmar.id).subscribe((ele: any) => {
      this.formedit = this.formBuilder.group({
        id: [this.editdata.id],
        description: [ele.description],
        oneAnswer: [ele.oneAnswer, Validators.required],
        secondAnswer: [ele.secondAnswer, Validators.required],
        thirdAnswer: [ele.thirdAnswer, Validators.required],
        correctAnswer: [ele.correctAnswer, Validators.required],
        fourthAnswer: [ele.fourthAnswer, Validators.required],
      });
    });
  }
  invalid = false;
  onSubmit() {
    if (this.formedit.valid) {
      this.invalid = true;
      let formData = new FormData();
      formData.append('ExamID', this.Id);
      formData.append('ID', this.data.Qestionmar.id);
      formData.append('ImageOrFile', this.photo);
      formData.append('Description', this.formedit.get('description')?.value);
      formData.append('oneAnswer', this.formedit.get('oneAnswer')?.value);
      formData.append('secondAnswer', this.formedit.get('secondAnswer')?.value);
      formData.append('thirdAnswer', this.formedit.get('thirdAnswer')?.value);
      formData.append('fourthAnswer', this.formedit.get('fourthAnswer')?.value);
      formData.append('File', ' ');
      formData.append('FileName', ' ');
      formData.append('correctAnswer', this.formedit.get('correctAnswer')?.value);
      this.service.PutQuestions(this.data.Qestionmar.id, formData).subscribe(ele => {
        console.log(ele);
        // this.toast.success('تمت التعديل')
        this.dialogRef.close();
      }, (err: any) => {
        console.log(err)
        if (err.status >= 200 && err.status < 300) {
          //this.toast.success('تمت التعديل')
          this.dialogRef.close();
        }
        else {
          //  this.toast.error(' لم تم العملية')

        }
      });
    }
    else {
      this.toast.error('  ادخل جميع المدخلات ')
      this.invalid = false;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  maxFileSizeMB: number = 5;
  Errorimage!: string;
  ImageName!: string
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].size < (this.maxFileSizeMB * 1024 * 1024)) {
        const file = event.target.files[0];
        this.ImageName = event.target.files[0].name
        this.Errorimage = ''
        this.photo = file
      }
      else {
        this.Errorimage = "الصورة اكبر من اللازم الرجاء اختيار صورة اصغر";
        this.ImageName = ''
      }
    }
    else {
      this.ImageName = ''
      this.photo = ''

    }
  }
}
