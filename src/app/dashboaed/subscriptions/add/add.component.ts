import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SubscrpitionsService } from 'src/app/services/Subscrpitions.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  data!: any;
  SubForm!: FormGroup
  photo!: any;
  constructor(
    private toast: ToastrService, public dialogRef: MatDialogRef<AddComponent>, private service: SubscrpitionsService,
  ) {
    this.SubForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.SubForm)
    let formData = new FormData();
    formData.append('name', this.SubForm.get('name')?.value);
    formData.append('price', this.SubForm.get('price')?.value);
    formData.append('LevelID', this.SubForm.get('LevelID')?.value);
    formData.append('ID', '0');
    formData.append('ImageOrFile', this.photo);
    formData.append('describtion', this.SubForm.get('describtion')?.value);
    this.service.PutSubscribtion(formData).subscribe(ele => {
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
      //  this.toast.error(' لم تم العملية')
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
