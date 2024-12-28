import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExamsService } from 'src/app/services/Exams.service';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  AddExam!: FormGroup
  ngOnInit() {
    this.subsubjectsservices.GetAllSubsubjects().subscribe((ele: any) => {
      this.subsubjectsservices.getallsubjects(ele.count).subscribe((ele2: any) => {
        this.subsubjects = ele2.items
        console.log(ele2)
      })
      console.log(ele)

    })
  }
  subsubjects!: any
  constructor(private toast: ToastrService, private subsubjectsservices: SubSubjectsService,
    public dialogRef: MatDialogRef<AddComponent>, private service: ExamsService,
  ) {
    // this.AddExam == this.formBuilder.group({
    //   name: ['', Validators.required],
    //   degree: ['', Validators.required],
    //   examDuration: ['', Validators.required],
    //   examOpenDate: ['', Validators.required],
    //   examCloseDate: ['', Validators.required],
    //   lectureID: ['', Validators.required],
    // });
    this.AddExam = new FormGroup({
      name: new FormControl('', Validators.required),
      degree: new FormControl(''),
      examDuration: new FormControl(''),
      examOpenDate: new FormControl(),
      examCloseDate: new FormControl(),
      subSubjectID: new FormControl('', Validators.required),
    });
  }
  invalid = false;

  onSubmit() {
    let AssigmentexamDuration = this.AddExam.get('examDuration')?.value
    let Assigmentdegree = this.AddExam.get('degree')?.value
    if (AssigmentexamDuration == '')
      AssigmentexamDuration = null
    if (Assigmentdegree == '')
      Assigmentdegree = null
    console.log(this.AddExam.value)
    if (this.AddExam.valid) {
      let examOpenDateForm = this.AddExam.get('examOpenDate')?.value;
      if (this.AddExam.get('examOpenDate')?.value == '') {
        examOpenDateForm = null
      }
      let examCloseDateForm = this.AddExam.get('examCloseDate')?.value
      if (examCloseDateForm == '') {
        examCloseDateForm = null
      }
      this.invalid = false;
      let form = {
        "id": 0,
        "name": this.AddExam.get('name')?.value,
        "degree": Assigmentdegree == null ? 0 : Assigmentdegree,
        "examDuration": AssigmentexamDuration == null ? 0 : AssigmentexamDuration,
        "examOpenDate": examOpenDateForm,
        "examCloseDate": examCloseDateForm,
        "subSubjectID": this.AddExam.get('subSubjectID')?.value.id
      }
      console.log(this.AddExam)
      this.service.PostExams(form).subscribe(ele => {
        console.log(ele);
        //    this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }, (err: any) => {
        console.log(err)
        if (err.status >= 200 && err.status < 300) {
          //   this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        }
        else {
          //    this.toast.error(' لم تم العملية')
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

  keyword = 'name';
  onChangeSub(event: any) {
    console.log(event.target.value)
  }
  selectEvent(item: any) {
    // do something with selected item
    console.log(item)
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log(val)
  }

  onFocused(e: any) {
    // do something when input is focused
    console.log(e)
  }
  valuebool = false;
  handleNoResults() {
  }
}
