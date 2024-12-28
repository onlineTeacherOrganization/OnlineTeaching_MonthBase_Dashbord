import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExamsService } from 'src/app/services/Exams.service';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';
import { ConfrimComponent } from '../confrim/confrim.component';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  Subsubjects!: any;
  examName = this.data.name;
  subsubjectidTest: any;
  EditExam!: FormGroup;
  boolconfrim = false;
  ngOnInit() {
    if (this.data.discriminator == 'Quiz' || this.data.discriminator == 'Assigment') {
      this.SubSubjectsService.GetAllLectures().subscribe((ele: any) => {
        this.SubSubjectsService.getAllLectures(ele.count).subscribe((ell2: any) => {
          this.Subsubjects = ell2.items
        })
        this.GetData();
      })
    }
    else if (this.data.discriminator == 'Exam') {
      this.SubSubjectsService.GetAllSubsubjects().subscribe((ele: any) => {
        this.SubSubjectsService.getallsubjects(ele.count).subscribe((el: any) => {
          this.Subsubjects = el.items
        })
        this.GetData();
      })
    }

  }

  AddConfrimComponentDialog(dataItem: any): void {
    const dialogRef = this.dialog.open(ConfrimComponent, {
      data: dataItem,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status === true) {
        console.log(this.boolconfrim)
        this.service.PutAssigment(dataItem).subscribe(ele => {
          //  this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        }, (err: any) => {
          if (err.status >= 200 && err.status < 300) {
            //   this.toast.success('تمت بنجاح')
            this.dialogRef.close();
          }
        })
      }
      else if (result.status === false) {
      }
    });
  }
  constructor(public dialog: MatDialog, private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any, private SubSubjectsService: SubSubjectsService,
    public dialogRef: MatDialogRef<EditComponent>, private service: ExamsService,
  ) {
    /*
     this.EditExam == this.formBuilder.group({
      name: ['', Validators.required],
       degree: ['', Validators.required],
       examDuration: ['', Validators.required],
       examOpenDate: ['', Validators.required],
       examCloseDate: ['', Validators.required],
       lectureID: ['', Validators.required],
    });
    */
    this.EditExam = new FormGroup({
      name: new FormControl('', Validators.required),
      degree: new FormControl(''),
      examDuration: new FormControl(''),
      examOpenDate: new FormControl(null),
      examCloseDate: new FormControl(null),
      subSubjectID: new FormControl('', Validators.required),
      precentageToOpen: new FormControl(''),
    });
  }
  invalid = false;
  subsubjectidTest2!: any
  GetData() {
    if (this.data.discriminator == 'Assigment') {
      this.service.GetAssignment(this.data.id).subscribe((ele: any) => {
        this.EditExam = new FormGroup({
          name: new FormControl(ele?.name, Validators.required),
          degree: new FormControl(ele?.degree),
          examDuration: new FormControl(ele?.examDuration),
          examOpenDate: new FormControl(ele?.examOpenDate),
          examCloseDate: new FormControl(ele?.examCloseDate),
          subSubjectID: new FormControl(ele?.lectureID, Validators.required),
        });
        if (ele?.lectureID > 0) {
          this.SubSubjectsService.getlecture(ele?.lectureID).subscribe((ele2: any) => {
            this.subsubjectidTest = ele2;
            this.subsubjectidTest2 = ele2.name
          })
        }
        else this.subsubjectidTest2 = 'لا شئ'
      });
    }
    else if (this.data.discriminator == 'Exam') {
      this.service.GetExamsByID(this.data.id).subscribe((ele: any) => {
        this.EditExam = new FormGroup({
          name: new FormControl(ele?.name, Validators.required),
          degree: new FormControl(ele?.degree),
          examDuration: new FormControl(ele?.examDuration),
          examOpenDate: new FormControl(ele?.examOpenDate),
          examCloseDate: new FormControl(ele?.examCloseDate),
          subSubjectID: new FormControl(ele?.subSubjectID, Validators.required),
        });
        if (ele?.subSubject?.name) {
          this.subsubjectidTest2 = ele?.subSubject.name
          this.subsubjectidTest = ele?.subSubject;
        }
        else this.subsubjectidTest2 = 'لا شئ'
        // ele?.subSubject?.name ? this.subsubjectidTest = ele?.subSubject.name : this.subsubjectidTest = null;
      })
    }
    else if (this.data.discriminator == 'Quiz') {
      this.service.GetQuiz(this.data.id).subscribe((ele: any) => {
        this.EditExam = new FormGroup({
          name: new FormControl(ele?.name, Validators.required),
          degree: new FormControl(ele?.degree),
          examDuration: new FormControl(ele?.examDuration),
          examOpenDate: new FormControl(ele?.examOpenDate),
          examCloseDate: new FormControl(ele?.examCloseDate),
          subSubjectID: new FormControl(ele?.lectureID, Validators.required),
          precentageToOpen: new FormControl(ele?.precentageToOpen, Validators.required),
        });
        if (ele?.lectureID > 0) {
          this.SubSubjectsService.getlecture(ele?.lectureID).subscribe((ele2: any) => {
            this.subsubjectidTest = ele2;
            this.subsubjectidTest2 = ele2.name
            console.log(this.subsubjectidTest)
            console.log(this.subsubjectidTest.name)
          })

        }
        else this.subsubjectidTest2 = 'لا شئ'
      });
    }
  }
  onSubmit() {

    let subsubjectid = this.EditExam.get('subSubjectID')?.value;
    if (this.EditExam.get('subSubjectID')?.value == this.subsubjectidTest2 || typeof this.EditExam.get('subSubjectID')?.value == 'object') {
      if (this.EditExam.get('subSubjectID')?.value == 'لا شئ')
        subsubjectid = ''
      else if (this.subsubjectidTest2 == this.EditExam.get('subSubjectID')?.value) {
        console.log(this.subsubjectidTest)
        console.log(this.subsubjectidTest2)
        subsubjectid = this.subsubjectidTest.id;
      }
      else if (typeof this.EditExam.get('subSubjectID')?.value == 'object')
        subsubjectid = this.EditExam.get('subSubjectID')?.value.id;
      this.valuebool = false
    }
    else if (typeof this.EditExam.get('subSubjectID')?.value != 'object')
      this.valuebool = true

    if (this.EditExam.valid && this.valuebool == false) {
      this.invalid = false;
      this.valuebool = false

      let examOpenDateForm = this.EditExam.get('examOpenDate')?.value;
      if (this.EditExam.get('examOpenDate')?.value == '') {
        examOpenDateForm = null
      }
      let examCloseDateForm = this.EditExam.get('examCloseDate')?.value
      if (examCloseDateForm == '') {
        examCloseDateForm = null
      }

      if (this.data.discriminator == 'Quiz' || this.data.discriminator == 'Assigment') {
        if (this.data.discriminator == 'Quiz') {
          let form = {
            "id": this.data.id,
            "name": this.EditExam.get('name')?.value,
            "degree": this.EditExam.get('degree')?.value,
            "examDuration": this.EditExam.get('examDuration')?.value == null ? 0 : this.EditExam.get('examDuration')?.value,
            "examOpenDate": examOpenDateForm,
            "examCloseDate": examCloseDateForm,
            "lectureID": subsubjectid,
            "precentageToOpen": this.EditExam.get('precentageToOpen')?.value,
          }
          this.service.PutQuiz(form).subscribe(ele => {
            //  this.toast.success('تمت بنجاح')
            this.dialogRef.close();
          }, (err: any) => {
            if (err.status >= 200 && err.status < 300) {
              //   this.toast.success('تمت بنجاح')
              this.dialogRef.close();
            }
          })
        }
        else {
          this.service.GetLectureByID(subsubjectid).subscribe((ele: any) => {
            let form = {
              "id": this.data.id,
              "name": this.EditExam.get('name')?.value,
              "degree": this.EditExam.get('degree')?.value,
              "examDuration": this.EditExam.get('examDuration')?.value == null ? 0 : this.EditExam.get('examDuration')?.value,
              "examOpenDate": examOpenDateForm,
              "examCloseDate": examCloseDateForm,
              "lectureID": subsubjectid
            }
            console.log(ele.assigmentID)
            if (ele?.assigmentID) {
              console.log(ele)
              if (typeof ele?.assigmentID != 'number' || this.data.id == ele?.assigmentID) {
                this.service.PutAssigment(form).subscribe(ele => {
                  //  this.toast.success('تمت بنجاح')
                  this.dialogRef.close();
                }, (err: any) => {
                  if (err.status >= 200 && err.status < 300) {
                    //   this.toast.success('تمت بنجاح')
                    this.dialogRef.close();
                  }
                })
              }
              else {
                this.AddConfrimComponentDialog(form)
              }
            }
            else {
              this.service.PutAssigment(form).subscribe(ele => {
                //  this.toast.success('تمت بنجاح')
                this.dialogRef.close();
              }, (err: any) => {
                if (err.status >= 200 && err.status < 300) {
                  //   this.toast.success('تمت بنجاح')
                  this.dialogRef.close();
                }
              })
            }
          });

        }
      }
      else if (this.data.discriminator == 'Exam') {

        let form = {
          "id": this.data.id,
          "name": this.EditExam.get('name')?.value,
          "degree": this.EditExam.get('degree')?.value,
          "examDuration": this.EditExam.get('examDuration')?.value == null ? 0 : this.EditExam.get('examDuration')?.value,
          "examOpenDate": examOpenDateForm,
          "examCloseDate": examCloseDateForm,
          "subSubjectID": subsubjectid
        }
        this.service.PutExams(this.data.id, form).subscribe(ele => {
          //  this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        }, (err: any) => {
          if (err.status >= 200 && err.status < 300) {
            //   this.toast.success('تمت بنجاح')
            this.dialogRef.close();
          }
        })
      }
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
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }
  valuebool = false;
  handleNoResults() {
  }
}
