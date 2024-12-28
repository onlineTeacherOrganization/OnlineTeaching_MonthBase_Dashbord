import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/Question.service';

@Component({
  selector: 'app-Add',
  templateUrl: './Add.component.html',
  styleUrls: ['./Add.component.scss']
})
export class AddComponent implements OnInit {

  editdata!: any;
  filename!: string
  photo!: any;
  datats: any;
  Id!: any;
  formedit!: FormGroup;
  constructor(private toast: ToastrService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddComponent>, private service: QuestionService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.Id = data;
    this.formedit = this.formBuilder.group({
      id: [''],
      description: [''],
      oneAnswer: ['الاختيار (أ) ', Validators.required],
      secondAnswer: ['الاختيار (ب) ', Validators.required],
      thirdAnswer: ['الاختيار (ج) ', Validators.required],
      fourthAnswer: ['الاختيار (د) ', Validators.required],
      correctAnswer: ['', Validators.required],
      ImageOrFile: [``],
    });
  }
  ngOnInit(): void {

  }
  invalid = false;

  onSubmit() {
    if (this.formedit.valid) {
      this.invalid = false;

      let formData = new FormData();
      formData.append('ExamID', this.Id);
      formData.append('ID', '0');
      formData.append('ImageOrFile', this.photo);
      formData.append('Description', this.formedit.get('description')?.value);
      formData.append('oneAnswer', this.formedit.get('oneAnswer')?.value);
      formData.append('secondAnswer', this.formedit.get('secondAnswer')?.value);
      formData.append('thirdAnswer', this.formedit.get('thirdAnswer')?.value);
      formData.append('fourthAnswer', this.formedit.get('fourthAnswer')?.value);
      formData.append('File', ' ');
      formData.append('FileName', ' ');
      formData.append('correctAnswer', this.formedit.get('correctAnswer')?.value);
      console.log(this.data.id)
      console.log(this.Id)
      this.service.PostQuestions(formData).subscribe(ele => {
        console.log(ele);
        //  this.toast.success('تمت الاضافة')
        this.dialogRef.close();
      }, (err: any) => {
        console.log(err)
        if (err.status >= 200 && err.status < 300) {
          //  this.toast.success('تمت الاضافة')
          this.dialogRef.close();
        }
        else {
          //  this.toast.error(' لم تم العملية')

        }
      });
      console.log(this.formedit.value)
    }
    else {
      this.toast.error('  ادخل جميع المدخلات ')
      this.invalid = true;
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
