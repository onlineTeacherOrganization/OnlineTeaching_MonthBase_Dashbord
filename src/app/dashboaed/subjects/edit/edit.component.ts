import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SubjectsService } from 'src/app/services/Subjects.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  datadialog: any;
  myForm!: FormGroup;
  photo!: any;
  constructor(private toast: ToastrService,
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditComponent>, private service: SubjectsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.datadialog = data;
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      LevelID: ['', Validators.required],
      telegeramLink: ['', Validators.pattern(this.telegramLinkPattern)],
      describtion: [''],
      IntroVideo: ['', Validators.pattern(this.regex)]
    });
  }
  regex = "((http|https)://)(www.)?" + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"

  ngOnInit(): void {
    this.GetLevel()
    this.service.GetSubject(this.data.id).subscribe((ele: any) => {
      this.LevelPlaceHolder = ele.level;
      console.log(this.LevelPlaceHolder)
      console.log(ele)
      console.log(ele.introVideo)
      this.datadialog = ele
      this.myForm = this.formBuilder.group({
        name: [ele.name, Validators.required],
        price: [ele.price, Validators.required],
        LevelID: [ele.level.id, Validators.required],
        telegeramLink: [ele.telegeramLink, [Validators.pattern(this.telegramLinkPattern)]],
        describtion: [ele.describtion],
        IntroVideo: [ele.introVideo, [Validators.pattern(this.regex)]]
      });
    });
  }

  // telegramLinkPattern = /(https?:\/\/)?(www[.])?(telegram|t)\/([a-zA-Z0-9_-]*)\/?$/;
  telegramLinkPattern = /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)/;
  invalid = false;
  boolValueLevele = false;
  onSubmit() {
    if (this.myForm.valid) {
      this.invalid = false
      let formData = new FormData();
      formData.append('name', this.myForm.get('name')?.value);
      formData.append('price', this.myForm.get('price')?.value);
      formData.append('LevelID', this.LevelPlaceHolder.id);
      formData.append('ID', this.data.id);
      formData.append('ImageOrFile', this.photo);
      formData.append('IntroVideo', this.myForm.get('IntroVideo')?.value);
      formData.append('describtion', this.myForm.get('describtion')?.value);
      formData.append('telegeramLink', this.myForm.get('telegeramLink')?.value);
      this.service.PutSubjects(this.data.id, formData).subscribe(ele => {
        // this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }, (err: any) => {
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
      this.invalid = true;
      this.toast.error(`ادخل جميع المدخلات المطلوبة `);
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
  Level!: any
  LevelPlaceHolder!: any
  GetLevel() {
    this.service.GetLevels().subscribe((ele: any) => {
      this.Level = ele.items
      console.log(this.Level)
      console.log(ele)
    })
  }
}
