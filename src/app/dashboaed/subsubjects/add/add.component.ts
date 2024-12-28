import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  SubjectID!: any;
  GetAllSubject!: any;
  GetAllSubSubject!: any;
  Nothing = {
    "id": null,
    "name": "لا شئ",
    "lectureID": null
  }
  constructor(private toast: ToastrService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>, private service: SubSubjectsService,
  ) {
    this.formsettings = this.formBuilder.group({
      Name: ['', Validators.required],
      SubjectID: ['', Validators.required],
      OpenDate: [''],
      CloseDate: [''],
      previousSubSubjectID: ['']
    });
  }
  ngOnInit(): void {
    this.FuncGetAllSubject()
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
  change(id: any) {
    console.log(id)
  }
  formsettings!: FormGroup;
  invalid = false;
  ErrorsubjectID = false;
  ErrorspreviousSubSubjectID = false;

  SubjectIdentity!: any
  SubSubjectIdentity!: any
  onSubmit() {
    if (typeof this.formsettings.get('previousSubSubjectID')?.value != 'object') {
      this.ErrorspreviousSubSubjectID = true
    }
    else {
      this.SubSubjectIdentity = this.formsettings.get('previousSubSubjectID')?.value
      this.ErrorspreviousSubSubjectID = false
    }
    if (typeof this.formsettings.get('SubjectID')?.value != 'object') {
      this.ErrorspreviousSubSubjectID = true
    }
    else {
      this.SubjectIdentity = this.formsettings.get('SubjectID')?.value
      this.ErrorsubjectID = false
    }

    if (this.formsettings.valid && this.ErrorsubjectID == false && this.ErrorspreviousSubSubjectID == false) {
      this.invalid = false;
      let examOpenDateForm = this.formsettings.get('OpenDate')?.value;
      let examCloseDateForm = this.formsettings.get('CloseDate')?.value
      if (examOpenDateForm == '') {
        examOpenDateForm = null
      }
      if (examCloseDateForm == '') {
        examCloseDateForm = null
      }
      let formData = new FormData();
      formData.append('ID', '0');
      formData.append('Name', this.formsettings.get('Name')?.value);
      formData.append('SubjectID', this.SubjectIdentity.id);
      formData.append('SubjectName', ' ');
      formData.append('previousSubSubjectID', this.SubSubjectIdentity?.id == null ? '' : this.SubSubjectIdentity?.id);

      examOpenDateForm != null ? formData.append('OpenDate', examOpenDateForm) : "";
      examCloseDateForm != null ? formData.append('CloseDate', examCloseDateForm) : "";
      this.service.PostSubsubjects(formData).subscribe(ele => {
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
          //  this.toast.error(' لم تم العملية')
        }
      })
    }
    else {
      this.toast.error(`ادخل جميع المدخلات المطلوبة `);
      this.invalid = true;
    }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  maxFileSizeMB: number = 5;
  Errorimage!: string;
  photo!: any;
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
