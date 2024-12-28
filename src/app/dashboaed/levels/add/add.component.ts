import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LevelsService } from 'src/app/services/Levels.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  constructor(private toast: ToastrService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>, private service: LevelsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formsubsubjects = this.formBuilder.group({
      levelName: [data.levelName, Validators.required],
      telegeramLink: [data.telegeramLink],
    });
  }

  formsubsubjects!: FormGroup;
  invalid = false;
  telegramLinkPattern = /(https?:\/\/)?(www[.])?(telegram|t)\/([a-zA-Z0-9_-]*)\/?$/;

  get telegeramLink() {
    return this.formsubsubjects.controls['telegeramLink'];
  }
  onSubmit() {
    this.data.levelName = this.formsubsubjects.get('levelName')?.value;
    this.data.telegeramLink = this.formsubsubjects.get('telegeramLink')?.value;
    if (this.formsubsubjects.valid) {
      this.invalid = false;
      this.service.putlevel(this.data.id, this.data).subscribe(ele => {
        console.log(ele);
        //  this.toast.success('تمت بنجاح')
        this.dialogRef.close();
      }, (err: any) => {
        console.log(err)
        if (err.status >= 200 && err.status < 300) {
          //  this.toast.success('تمت بنجاح')
          this.dialogRef.close();
        }
        else {
          // this.toast.error(' لم تم العملية')
        }
      });
    }

    else {
      this.invalid = true;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
