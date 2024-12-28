import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  constructor(private toast: ToastrService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>, private service: SubSubjectsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formsubsubjects = this.formBuilder.group({
      name: ['', Validators.required],
      subjectID: ['', Validators.required],
      openDate: [''],
      closeDate: [''],
      previousSubSubjectID: ['']
    });
  }
  AllSubSubject!: any;
  SubjectIdentity!: any
  SubSubjectIdentity!: any
  Nothing = {
    "id": null,
    "name": "لا شئ",
    "lectureID": null
  }
  ngOnInit(): void {
    this.FuncGetAllSubject()
    this.service.GetsubSubjectById(this.data.id).subscribe((ele: any) => {
      this.formsubsubjects = this.formBuilder.group({
        name: [ele.name, Validators.required],
        subjectID: [ele.subjectID],
        openDate: [ele.openDate],
        closeDate: [ele.closeDate],
        previousSubSubjectID: [ele.previousSubSubjectID],
      });
      this.service.GetSubjectsById(ele.subjectID).subscribe(ele2 => {
        this.SubjectIdentity = ele2
      })
      if (ele.previousSubSubjectID)
        this.service.GetsubSubjectById(ele.previousSubSubjectID).subscribe(ele2 => {
          this.SubSubjectIdentity = ele2
        })
      else {
        this.SubSubjectIdentity = this.Nothing
        console.log(this.SubSubjectIdentity)
        console.log(this.SubSubjectIdentity.name)
      }
    })
    // this.service.GetAllSubSubject().subscribe((ele: any) => {
    //   this.AllSubSubject = ele.items.filter((x: any) => x.id == this.data.id)[0];
    //   this.formsubsubjects = this.formBuilder.group({
    //     name: [this.AllSubSubject.name, Validators.required],
    //     subjectID: [this.AllSubSubject.subjectID],
    //     openDate: [this.AllSubSubject.openDate],
    //     closeDate: [this.AllSubSubject.closeDate],
    //   });
    // })
  }

  formsubsubjects!: FormGroup;
  GetAllSubject!: any;
  GetAllSubSubject!: any;

  invalid = false
  ErrorsubjectID = false;
  ErrorspreviousSubSubjectID = false;

  onSubmit() {
    console.log(this.SubSubjectIdentity)
    console.log(this.formsubsubjects.get('previousSubSubjectID')?.value)
    if (this.SubSubjectIdentity.name == this.formsubsubjects.get('previousSubSubjectID')?.value) {
      this.ErrorspreviousSubSubjectID = false
    }
    else if (typeof this.formsubsubjects.get('previousSubSubjectID')?.value == 'string' && this.SubSubjectIdentity.name != this.formsubsubjects.get('previousSubSubjectID')?.value) {
      this.ErrorspreviousSubSubjectID = true
    }
    else {
      this.SubSubjectIdentity = this.formsubsubjects.get('previousSubSubjectID')?.value
      console.log(this.SubSubjectIdentity)
      this.ErrorspreviousSubSubjectID = false

    }
    if (this.SubjectIdentity.name == this.formsubsubjects.get('subjectID')?.value) {
      this.ErrorsubjectID = false
    }
    else if (typeof this.formsubsubjects.get('subjectID')?.value == 'string' && this.SubjectIdentity.name != this.formsubsubjects.get('subjectID')?.value) {
      this.ErrorsubjectID = true
    }
    else {
      this.SubjectIdentity = this.formsubsubjects.get('subjectID')?.value
      console.log(this.SubjectIdentity)
      this.ErrorsubjectID = false

    }
    if (this.formsubsubjects.valid && this.ErrorsubjectID == false && this.ErrorspreviousSubSubjectID == false) {
      this.invalid = false
      this.ErrorsubjectID = false
      let formData = new FormData();
      let examOpenDateForm = this.formsubsubjects.get('openDate')?.value;
      let examCloseDateForm = this.formsubsubjects.get('closeDate')?.value;
      if (examOpenDateForm == '') {
        examOpenDateForm = null
      }
      if (examCloseDateForm == '') {
        examCloseDateForm = null
      }

      formData.append('ID', this.data.id);
      formData.append('Name', this.formsubsubjects.get('name')?.value);
      formData.append('SubjectID', this.SubjectIdentity?.id);
      formData.append('previousSubSubjectID', this.SubSubjectIdentity?.id == null ? '' : this.SubSubjectIdentity?.id);
      formData.append('SubjectName', ' ');
      formData.append('ImageOrFile', this.photo);
      // formData.append('OpenDate', examOpenDateForm);
      // formData.append('CloseDate', examCloseDateForm);
      examOpenDateForm != null ? formData.append('OpenDate', examOpenDateForm) : "";
      examCloseDateForm != null ? formData.append('CloseDate', examCloseDateForm) : "";
      this.service.PutSbsubjects(this.data.id, formData).subscribe(ele => {
        //   this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }, (err: any) => {
        console.log(err)
        if (err.status >= 200 && err.status < 300) {
          //     this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        }
        else {
          //   this.toast.error(' لم تم العملية')
        }
      })
    }
    else {
      this.invalid = true
      this.toast.error(`ادخل جميع المدخلات المطلوبة `);
    }
  }
  FuncGetAllSubject() {
    this.service.GetAllSubject().subscribe((ele: any) => {
      this.GetAllSubject = ele.items
    })
    this.service.GetAllSubsubjects().subscribe((ele: any) => {
      console.log(ele)
      this.service.getAllSubsubjects(ele.count).subscribe((ele2: any) => {
        this.GetAllSubSubject = ele2.items
        this.GetAllSubSubject.unshift(this.Nothing);
        console.log(this.GetAllSubSubject)
        console.log(ele2)
      })
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  maxFileSizeMB: number = 5;
  Errorimage!: string;
  photo!: any;
  ImageName!: string
  onFileSelected(event: any) {
    console.log("Cancled")
    console.log(event.target.files.length)
    console.log(event.target.files.length == 0)
    console.log(event.target.files)
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

  selectEvent(item: any) {
    // do something with selected item
  }
  keyword = 'name';
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }
  selectEvent2(item: any) {
    // do something with selected item
  }
  keyword2 = 'name';
  onChangeSearch2(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused2(e: any) {
    // do something when input is focused
  }
}
