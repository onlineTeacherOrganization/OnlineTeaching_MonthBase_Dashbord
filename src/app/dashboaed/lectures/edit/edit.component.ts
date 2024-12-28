import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LecturesService } from 'src/app/services/Lectures.service';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';
import { SubjectsService } from 'src/app/services/Subjects.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  filename!: string
  photo!: string
  Onfoucs: any;
  datats: any;
  subsubject!: any
  formedit!: FormGroup;
  Lectures!: any;
  subsubjectFilter!: any;
  subjectsItems!: any;
  subjectZero = false;
  invalid = false;
  valuebool = false;
  isExamLecture !: boolean;
  valueboolLectureID = false;
  LectureID!: any
  Nothing = {
    "id": null,
    "name": "لا شئ",
    "lectureID": null
  }
  constructor(private subjectService: SubjectsService, private subsubjectservice: SubSubjectsService, private toast: ToastrService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditComponent>, private service: LecturesService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formedit = this.formBuilder.group({
      ID: [data.id],
      Name: ['', Validators.required],
      SubSubjectID: ['', Validators.required],
      subjectID: [this.SubjectIDTest],
      LectureLink: ['', [Validators.required, Validators.pattern(this.regex)]],
      Description: [""],
      StartLiveWatchingDateTime: [''],
      StopLiveWatchingDateTime: [''],
      IsAppear: [''],
      IsFree: [''],
      LectureID: [''],
    });
  }
  SubSubjectName!: any;
  LectureName!: any;
  previousLecture!: any;
  ngOnInit(): void {
    this.Subjects();
    this.SubSubject();
    this.service.GetLectures().subscribe((ele: any) => {
      if (ele != null && ele !== undefined) {
        this.service.getLectures(ele.count).subscribe((ele2: any) => {
          this.Lectures = ele2.items;
          this.Lectures = this.Lectures.unshift(this.Nothing);
          this.Lectures = ele2.items;
        })
      }
    })
    this.service.GetLecture(this.data.id).subscribe((ele: any) => {
      this.formedit = this.formBuilder.group({
        ID: [this.data.id],
        Name: [ele?.name, Validators.required],
        SubSubjectID: [ele?.subSubjectID, Validators.required],
        subjectID: [this.SubjectIDTest],
        LectureLink: [ele?.lectureLink, [Validators.required, Validators.pattern(this.regex)]],
        Description: [ele?.description],
        StartLiveWatchingDateTime: [ele?.startLiveWatchingDateTime],
        StopLiveWatchingDateTime: [ele?.stopLiveWatchingDateTime],
        IsAppear: [ele?.isAppear],
        IsFree: [ele?.isFree],
        LectureID: [ele?.LectureID],
      });
      this.isExamLecture = ele.isExamLecture;
      console.log(this.isExamLecture)
      console.log(ele.isExamLecture)
      this.service.getSubsubject(ele.subSubjectID).subscribe((ele: any) => {
        this.SubSubjectName = ele
        this.SubSubjectName ? this.valuebool = false : this.valuebool = true;
      })

      if (ele.lectureID === null) {

        this.previousLecture = this.Nothing;
      }
      else {
        this.service.GetLecture(ele.lectureID).subscribe((ele: any) => {
          this.previousLecture = ele;
        })
      }
    })
  }
  telegramLinkPattern = /(https?:\/\/)?(www[.])?([a-zA-Z0-9_-]*)\/?$/;
  regex = "((http|https)://)(www.)?" + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"

  get LectureLinks() {
    return this.formedit.controls['LectureLink'];
  }
  SubjectIDTest!: any
  SubSubject() {
    this.subsubjectservice.GetAllSubsubjects().subscribe((ele: any) => {
      this.subsubjectFilter = this.subsubject;
      this.subsubjectservice.getallsubjects(ele.count).subscribe((ele2: any) => {
        this.subsubject = ele2.items;
        this.SubjectIDTest = ele2.items.filter((x: any) => x.id == this.data.subSubjectID)[0].subjectID;
        this.subsubjectFilter = this.subsubject.filter((x: any) => x.subjectID == this.SubjectIDTest);
      })
    })
  }
  Subjects() {
    this.subjectService.GetAllSubjects().subscribe((ele: any) => {
      this.Onfoucs = ele.items;

    })
  }
  SubSubjectID !: any
  onSubmit() {
    if (this.formedit.get('LectureID')?.value === undefined || this.formedit.get('LectureID')?.value == null || (this.previousLecture.name == this.formedit.get('LectureID')?.value && this.formedit.get('LectureID')?.value.id == null)) {
      this.valueboolLectureID = false;
      this.LectureName = '';
      if (this.formedit.get('LectureID')?.value.id == null)
        this.LectureName == ''
      else
        this.LectureName == this.previousLecture.id
    }
    else if (typeof this.formedit.get('LectureID')?.value != 'object') {
      this.valueboolLectureID = true;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value == 'object') {
      this.LectureName = this.formedit.get('LectureID')?.value.id;
      this.valueboolLectureID = false;
    }
    if (this.SubSubjectName?.name == this.formedit.get('SubSubjectID')?.value || typeof this.formedit.get('SubSubjectID')?.value == 'object') {
      this.valuebool = false
      if (this.SubSubjectName?.name == this.formedit.get('SubSubjectID')?.value)
        this.SubSubjectID = this.formedit.get('SubSubjectID')?.value;
      else
        this.SubSubjectID = this.formedit.get('SubSubjectID')?.value?.id;

    }
    else if (typeof this.formedit.get('SubSubjectID')?.value != 'object') {
      this.valuebool = true
    }
    if (this.formedit.valid && this.valuebool == false && this.valueboolLectureID == false) {
      this.invalid = false;
      this.valuebool = false
      this.subjectZero = true;
      this.invalid = false;
      let examOpenDateForm = this.formedit.get('StartLiveWatchingDateTime')?.value;
      if (this.formedit.get('StartLiveWatchingDateTime')?.value == '') {
        examOpenDateForm = null
      }
      let examCloseDateForm = this.formedit.get('StopLiveWatchingDateTime')?.value
      if (examCloseDateForm == '') {
        examCloseDateForm = null
      }
      if (this.LectureName == null)
        this.LectureName = '';
      let formData = new FormData();
      formData.append('ID', this.data.id);
      formData.append('Name', this.formedit.get('Name')?.value);
      formData.append('SubSubjectID', this.SubSubjectID);
      formData.append('Description', this.formedit.get('Description')?.value);
      formData.append('LectureLink', this.formedit.get('LectureLink')?.value);
      // formData.append('StartLiveWatchingDateTime', examOpenDateForm);
      // formData.append('StopLiveWatchingDateTime', examCloseDateForm);
      examOpenDateForm != null ? formData.append('StartLiveWatchingDateTime', examOpenDateForm) : '';
      examCloseDateForm != null ? formData.append('StopLiveWatchingDateTime', examCloseDateForm) : '';
      formData.append('IsAppear', this.formedit.get('IsAppear')?.value);
      formData.append('IsFree', this.formedit.get('IsFree')?.value);
      formData.append('FilePath', '');
      formData.append('ImageOrFile', this.photo);
      formData.append('isExamLecture', String(this.isExamLecture));
      formData.append('File', ' ');
      formData.append('LectureID', this.LectureName);
      formData.append('FileName', ' ');
      formData.append('QuizID', '');
      formData.append('AssigmentID', '');
      this.service.PutLectures(this.data.id, formData).subscribe(ele => {
        // this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }, (err: any) => {
        if (err.status >= 200 && err.status < 300) {
          //  this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        }
        else {
          // this.toast.error(' لم تم العملية')

        }
      })
    }
    else {
      this.toast.error(`ادخل جميع المدخلات المطلوبة `);
      this.invalid = true;

    }

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
  onNoClick() {
    this.dialogRef.close();
  }
  onChange(event: any) {
    this.subjectsItems = this.Onfoucs;
    if (this.subjectsItems) {
      this.subsubjectFilter = this.subsubject.filter((x: any) => x.subjectID == event.target.value);
      this.formedit.patchValue({
        SubSubjectID: '',
      });
      this.SubSubjectName = '';
    }
  }
  keyword = 'name';
  onChangeSub(event: any) {

    if (this.SubSubjectName?.name == this.formedit.get('SubSubjectID')?.value || typeof this.formedit.get('SubSubjectID')?.value == 'object') {
      this.valuebool = false
      if (this.SubSubjectName?.name == this.formedit.get('SubSubjectID')?.value)
        this.SubSubjectID = this.formedit.get('SubSubjectID')?.value;
      else
        this.SubSubjectID = this.formedit.get('SubSubjectID')?.value?.id;

    }
    else {
      this.valuebool = true
    }
  }
  boolisExamLecture = false;

  selectEvent(item: any) {
    if (item.examID == null) {
      this.boolisExamLecture = true;
      this.isExamLecture = false
    }
    else
      this.boolisExamLecture = false;
    this.formedit.patchValue({
      SubSubjectID: item,
    });
    if (this.SubSubjectName?.name == this.formedit.get('SubSubjectID')?.value || typeof this.formedit.get('SubSubjectID')?.value == 'object' || typeof this.SubSubjectName?.name == 'string') {
      this.valuebool = false
      if (this.SubSubjectName?.name == this.formedit.get('SubSubjectID')?.value)
        this.SubSubjectID = this.formedit.get('SubSubjectID')?.value;
      else
        this.SubSubjectID = this.formedit.get('SubSubjectID')?.value?.id;
    }
    else {
      this.valuebool = true
    }
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

    if (this.SubSubjectName?.name == this.formedit.get('SubSubjectID')?.value || typeof this.formedit.get('SubSubjectID')?.value == 'object' || typeof this.SubSubjectName?.name == 'string') {
      this.valuebool = false
      if (this.SubSubjectName?.name == this.formedit.get('SubSubjectID')?.value)
        this.SubSubjectID = this.formedit.get('SubSubjectID')?.value;
      else
        this.SubSubjectID = this.formedit.get('SubSubjectID')?.value?.id;

    }
    else {
      this.valuebool = true
    }
  }
  keyword2 = 'name';
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
    // do something with selected item
    if (this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value === undefined || this.formedit.get('LectureID')?.value == 'لا شئ' || this.formedit.get('LectureID')?.value === null) {
      this.valueboolLectureID = false;
      this.LectureName = '';
    }
    else if (this.formedit.get('LectureID')?.value !== null) {
      this.LectureName = '';
      this.valueboolLectureID = false;
    }
    else if (this.previousLecture == this.formedit.get('LectureID')?.value) {
      this.LectureName = this.previousLecture.id;
      this.valueboolLectureID = false;
    }
    else if (typeof this.formedit.get('LectureID')?.value == 'object') {
      this.LectureName = this.formedit.get('LectureID')?.value.id;
      this.valueboolLectureID = false;
    }
    else if (typeof this.formedit.get('LectureID')?.value != 'object') {
      this.valueboolLectureID = true;
    }
  }

  onChangeSearch2(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

    if (this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value == '' || this.formedit.get('LectureID')?.value === undefined || this.formedit.get('LectureID')?.value == null) {
      this.valueboolLectureID = false;
      this.LectureName = '';
    }
    else if (typeof this.formedit.get('LectureID')?.value != 'object') {
      this.valueboolLectureID = true;
      this.LectureName = '';
    }
    else if (this.previousLecture == this.formedit.get('LectureID')?.value) {
      this.LectureName = this.previousLecture.id;
    }
    else if (typeof this.formedit.get('LectureID')?.value == 'object') {
      this.LectureName = this.formedit.get('LectureID')?.value.id;
      this.valueboolLectureID = false;
    }
  }

  onFocused(e: any) {
    // do something when input is focused
  }


}
