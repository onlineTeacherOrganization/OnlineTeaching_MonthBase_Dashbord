import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LecturesService } from 'src/app/services/Lectures.service';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';
import { SubjectsService } from 'src/app/services/Subjects.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  editdata!: any;
  filename!: string;
  Onfoucs: any;
  subsubject!: any;
  subsubjectFilter!: any;
  subjectsItems!: any;
  photo!: string;
  isExamLecture = false;
  datats: any;
  Lectures!: any;
  invalid = false;
  SubSubjectNamePrevious!: any;
  LectureName!: any;
  SubSubjectName!: any;
  formedit!: FormGroup;
  maxFileSizeMB: number = 5;
  Errorimage!: string;
  ImageName!: string;
  keyword = 'name';
  keyword2 = 'name';
  valueboolSubSubjectID: boolean = false;
  valueboolLectureID: boolean = false;
  telegramLinkPattern = /(https?:\/\/)?(www[.])?([a-zA-Z0-9_-]*)\/?$/;
  regex = "((http|https)://)(www.)?" + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"

  get LectureLinks() {
    return this.formedit.controls['LectureLink'];
  }
  Nothing = {
    "id": null,
    "name": "لا شئ",
    "lectureID": null
  }
  constructor(private subjectService: SubjectsService, private subsubjectservice: SubSubjectsService, private toast: ToastrService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddComponent>, private service: LecturesService,
  ) {
    this.formedit = this.formBuilder.group({
      ID: ['0'],
      Name: ['', Validators.required],
      SubSubjectID: ['', [Validators.required]],
      LectureLink: ['', [Validators.required, Validators.pattern(this.regex)]],
      Description: [''],
      LectureID: [``],
      StartLiveWatchingDateTime: [''],
      StopLiveWatchingDateTime: [''],
      IsAppear: [true],
      IsFree: [false],
      AssigmentID: [""],
    });
  }

  ngOnInit(): void {
    this.Initial();
  }
  Initial() {
    this.Subjects();
    this.SubSubjectFunc();
    this.formedit = this.formBuilder.group({
      ID: ['0'],
      Name: ['', Validators.required],
      SubSubjectID: ['', [Validators.required]],
      LectureLink: ['', [Validators.required, Validators.pattern(this.regex)]],
      Description: [''],
      LectureID: [``],
      StartLiveWatchingDateTime: [''],
      StopLiveWatchingDateTime: [''],
      IsAppear: [true],
      IsFree: [false],
      AssigmentID: [""],
    });

    this.service.GetLectures().subscribe((ele: any) => {
      if (ele != null && ele !== undefined) {
        this.service.getLectures(ele.count).subscribe((ele2: any) => {
          this.Lectures = ele2.items;
          this.Lectures = this.Lectures.unshift(this.Nothing);
          console.log(this.Nothing)
          this.Lectures = ele2.items;
        })
      }
    })
  }
  Subjects() {
    this.subjectService.GetAllSubjects().subscribe((ele: any) => {
      this.subjectService.GetAllSubjects2(ele.count).subscribe((ele2: any) => {
        this.Onfoucs = ele2.items;

      })
    })
  }

  onSubmit() {
    if (typeof this.formedit.get('SubSubjectID')?.value != 'object')
      this.valueboolSubSubjectID = true
    else
      this.valueboolSubSubjectID = false

    console.log(this.formedit.get('LectureID')?.value)
    console.log(this.formedit.get('LectureID')?.value == null)
    if (this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value === undefined || this.formedit.get('LectureID')?.value.id == null) {
      this.valueboolLectureID = false;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value != 'object') {
      this.valueboolLectureID = true;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value == 'object') {
      this.LectureName = this.formedit.get('LectureID')?.value.id;
      this.valueboolLectureID = false;
    }
    if (this.formedit.valid && this.valueboolSubSubjectID == false && this.valueboolLectureID == false) {
      this.invalid = false;
      let examOpenDateForm = this.formedit.get('StartLiveWatchingDateTime')?.value;
      if (this.formedit.get('StartLiveWatchingDateTime')?.value == '') {
        examOpenDateForm = null
      }
      let examCloseDateForm = this.formedit.get('StopLiveWatchingDateTime')?.value
      if (examCloseDateForm == '') {
        examCloseDateForm = null
      }
      let formData = new FormData();
      formData.append('ID', '0');
      formData.append('Name', this.formedit.get('Name')?.value);
      formData.append('SubSubjectID', this.formedit.get('SubSubjectID')?.value.id);
      formData.append('Description', this.formedit.get('Description')?.value);
      formData.append('LectureID', this.LectureName);
      formData.append('LectureLink', this.formedit.get('LectureLink')?.value);
      examOpenDateForm != null ? formData.append('StartLiveWatchingDateTime', examOpenDateForm) : '';
      examCloseDateForm != null ? formData.append('StopLiveWatchingDateTime', examCloseDateForm) : '';
      formData.append('IsAppear', this.formedit.get('IsAppear')?.value);
      formData.append('isExamLecture', String(this.isExamLecture));
      formData.append('IsFree', this.formedit.get('IsFree')?.value);
      formData.append('FilePath', '');
      formData.append('ImageOrFile', this.photo);
      formData.append('QuizID', '');
      formData.append('AssigmentID', '');
      this.service.PostLectures(formData).subscribe(ele => {
        //    this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }, (err: any) => {
        if (err.status >= 200 && err.status < 300) {
          //   this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        }
        else {
          //   this.toast.error(' لم تم العملية')
        }
      })
    }
    else {
      this.toast.error(`ادخل جميع المدخلات المطلوبة `);

      this.invalid = true;
    }
  }
  SubSubjectFunc() {

    this.subsubjectservice.GetAllSubsubjects().subscribe((ele: any) => {
      this.subsubjectservice.getallsubjects(ele.count).subscribe((ele2: any) => {
        this.subsubject = ele2.items;
        console.log(this.subsubject)
      })
    })
  }

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
      this.photo = ''
      this.ImageName = ''
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onChange(event: any) {
    this.subjectsItems = this.Onfoucs;
    if (this.subsubject) {
      this.subsubjectFilter = this.subsubject.filter((x: any) => x.subjectID == event.target.value);
      // this.formedit.setValue('LectureID','')
      this.formedit.patchValue({
        SubSubjectID: '',
      });
    }
  }


  onChangeSub(event: any) {
    if (typeof this.formedit.get('SubSubjectID')?.value != 'object')
      this.valueboolSubSubjectID = true
    else
      this.valueboolSubSubjectID = false
    console.log(this.valueboolSubSubjectID)
  }
  boolisExamLecture = false;
  selectEvent(item: any) {
    this.isExamLecture = false;
    console.log(item)
    if (item.examID == null)
      this.boolisExamLecture = true;
    else
      this.boolisExamLecture = false;
    console.log(this.boolisExamLecture)
    if (typeof item != 'object')
      this.valueboolSubSubjectID = true
    else
      this.valueboolSubSubjectID = false
  }

  onChangeSearch(val: string) {
    if (typeof this.formedit.get('SubSubjectID')?.value != 'object')
      this.valueboolSubSubjectID = true
    else {
      this.valueboolSubSubjectID = false;
      this.formedit.get('SubSubjectID')?.value.examID != null ? this.boolisExamLecture = false : this.boolisExamLecture = true;
    }
  }

  onFocused(e: any) {
  }




  onChangeSub2(event: any) {
    if (this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value === undefined || this.formedit.get('LectureID')?.value == null) {
      this.valueboolLectureID = false;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value != 'object') {
      this.valueboolLectureID = true;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value == 'object') {
      this.LectureName = this.formedit.get('LectureID')?.value.id;
      this.valueboolLectureID = false;
    }
  }
  selectEvent2(item: any) {

    if (this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value === undefined || this.formedit.get('LectureID')?.value == null) {
      this.valueboolLectureID = false;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value != 'object') {
      this.valueboolLectureID = true;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value == 'object') {
      this.LectureName = this.formedit.get('LectureID')?.value.id;
      this.valueboolLectureID = false;
    }
    // do something with selected item

  }

  onChangeSearch2(val: string) {
    if (this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value === undefined || this.formedit.get('LectureID')?.value == null) {
      this.valueboolLectureID = false;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value != 'object') {
      this.valueboolLectureID = true;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value == 'object') {
      this.LectureName = this.formedit.get('LectureID')?.value.id;
      this.valueboolLectureID = false;
    }
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused2(e: any) {
    // do something when input is focused
  }
}
