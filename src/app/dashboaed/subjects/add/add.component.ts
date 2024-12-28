import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectsService } from 'src/app/services/Subjects.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  data!: any;
  myForm!: FormGroup;
  photo!: any;
  Level!: any
  constructor(private toast: ToastrService,
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddComponent>, private service: SubjectsService,
  ) {
  }
  GetLevel() {
    this.service.GetLevels().subscribe((ele: any) => {
      this.Level = ele.items
      console.log(this.Level)
    })
  }
  ngOnInit(): void {
    this.GetAll()
    this.GetLevel()
  }
  GetAll() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      LevelID: ['', Validators.required],
      describtion: [''],
      telegeramLink: ['', Validators.pattern(this.telegramLinkPattern)],
      IntroVideo: ['', [Validators.pattern(this.regex)]]
    });
  }
  // telegramLinkPattern = /(https?:\/\/)?(www[.])?(telegram|t)\/([a-zA-Z0-9_-]*)\/?$/;
  telegramLinkPattern = /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)/;
  regex = "((http|https)://)(www.)?" + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
  get telegeramLink() {
    return this.myForm.controls['telegeramLink'];
  }
  invalid = false
  onSubmit() {
    if (this.myForm.valid) {
      this.invalid = false
      console.log(this.myForm)
      let formData = new FormData();
      formData.append('name', this.myForm.get('name')?.value);
      formData.append('price', this.myForm.get('price')?.value);
      formData.append('LevelID', this.myForm.get('LevelID')?.value);
      formData.append('ID', '0');
      formData.append('telegeramLink', this.myForm.get('telegeramLink')?.value);
      formData.append('ImageOrFile', this.photo);
      formData.append('describtion', this.myForm.get('describtion')?.value);
      formData.append('IntroVideo', this.myForm.get('IntroVideo')?.value);
      this.service.PostSubjects(formData).subscribe(ele => {
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
          // this.toast.error(' لم تم العملية')
        }
      })
    }
    else {
      this.toast.error(`ادخل جميع المدخلات المطلوبة `);
      this.invalid = true

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  maxFileSizeMB: number = 5;
  Errorimage!: string;
  ImageName!: string
  onFileSelected(event: any) {
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
