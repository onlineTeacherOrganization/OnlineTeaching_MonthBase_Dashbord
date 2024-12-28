import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/services/Settings.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  panelOpenState = false;
  setting!: any;
  filename!: any;
  photo!: any
  ngOnInit(): void {
    this.GetData()
  }
  pattNumb = /^01\d+/;
  regex = "((http|https)://)(www.)?" + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
  GetData() {
    this.service.GetAllSetting().subscribe({
      next: (ele) => {
        this.setting = ele;
        this.filename = this.setting?.fileName;
        this.filename = this.setting?.fileName.split("/UPLOADES/").pop();
        this.formsettings.setValue({
          Name: this.setting?.name,
          Description: this.setting?.description,
          Address: this.setting?.address,
          PhoneNumber: this.setting?.phoneNumber,
          SecretarialPhoneNumber: this.setting?.secretarialPhoneNumber,
          VodafonCachPhoneNumber: this.setting?.vodafonCachPhoneNumber,
          ActivationSubscriptionPhoneNumber: this.setting?.activationSubscriptionPhoneNumber,
          FacebookLink: this.setting?.facebookLink,
          WhatsappLink: this.setting?.whatsappLink,
          TelegramLink: this.setting?.telegramLink,
        })

      }, error: (err) => { console.log(err) }
    })
  }
  formsettings!: FormGroup;
  ChangePassword!: FormGroup;
  constructor(private formBuilder: FormBuilder, private service: SettingsService, private toast: ToastrService) {
    this.formsettings = this.formBuilder.group({
      Name: [this.setting?.name, Validators.required],
      Description: [this.setting?.description, Validators.required],
      Address: [this.setting?.address, Validators.required],
      PhoneNumber: [this.setting?.phoneNumber, [Validators.required, Validators.pattern(this.pattNumb), Validators.minLength(11), Validators.maxLength(11)]],
      SecretarialPhoneNumber: [this.setting?.secretarialPhoneNumber, [Validators.required, Validators.pattern(this.pattNumb), Validators.minLength(11), Validators.maxLength(11)]],
      VodafonCachPhoneNumber: [this.setting?.vodafonCachPhoneNumber, [Validators.required, Validators.pattern(this.pattNumb), Validators.minLength(11), Validators.maxLength(11)]],
      ActivationSubscriptionPhoneNumber: [this.setting?.activationSubscriptionPhoneNumber, [Validators.required, Validators.pattern(this.pattNumb), Validators.minLength(11), Validators.maxLength(11)]],
      FacebookLink: [this.setting?.facebookLink, [Validators.required, Validators.pattern(this.regex)]],
      WhatsappLink: [this.setting?.whatsappLink, [Validators.required, Validators.pattern(this.regex)]],
      TelegramLink: [this.setting?.telegramLink, [Validators.required, Validators.pattern(this.regex)]],
    });
    this.ChangePassword = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }
  onSubmit2() {
    console.log(this.ChangePassword.controls)
    this.service.ChangePasswotd({
      "id": "1",
      "currentPassword": this.ChangePassword.get('currentPassword')?.value,
      "newPassword": this.ChangePassword.get('newPassword')?.value
    }).subscribe(ele => {
      this.toast.success('تم تغير كلمة المرور ')
    }, (err: any) => {
      console.log(err)
      if (err.status >= 200 && err.status < 300) {
        this.toast.success('تم تغير كلمة المرور ')
      }
      else {
        //   this.toast.error(' لم تم العملية')
      }
    });
  }
  invalid = false
  onSubmit() {
    if (this.formsettings.valid) {
      this.invalid = false

      let formData = new FormData();
      formData.append('Name', this.formsettings.get('Name')?.value);
      formData.append('Address', this.formsettings.get('Address')?.value);
      formData.append('Email', 'user@gmail.com');
      formData.append('Description', this.formsettings.get('Description')?.value);
      formData.append('Address', this.formsettings.get('Address')?.value);
      formData.append('PhoneNumber', this.formsettings.get('PhoneNumber')?.value);
      formData.append('SecretarialPhoneNumber', this.formsettings.get('SecretarialPhoneNumber')?.value);
      formData.append('VodafonCachPhoneNumber', this.formsettings.get('VodafonCachPhoneNumber')?.value);
      formData.append('ActivationSubscriptionPhoneNumber', this.formsettings.get('ActivationSubscriptionPhoneNumber')?.value);
      formData.append('FacebookLink', this.formsettings.get('FacebookLink')?.value);
      formData.append('WhatsappLink', this.formsettings.get('WhatsappLink')?.value);
      formData.append('TelegramLink', this.formsettings.get('TelegramLink')?.value);
      formData.append('FileName', ' ');
      formData.append('File', ' ');
      formData.append('FormFile', this.photo);
      this.service.PutSettings(1, formData).subscribe(ele => {
        //   this.toast.success('تمت بنجاح')
      }, (err: any) => {
        console.log(err)
        if (err.status >= 200 && err.status < 300) {
          //    this.toast.success('تمت بنجاح')
        }
        else {
          //   this.toast.error(' لم تم العملية')
        }
      });
    }
    else {
      this.toast.error(`ادخل جميع المدخلات المطلوبة `);
      this.invalid = true
    }
  }
  maxFileSizeMB: number = 5;
  Errorimage!: string;
  ImageName!: string
  onFileSelect(event: any) {
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
