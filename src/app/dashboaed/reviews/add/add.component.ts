import { Component } from '@angular/core';
import { ReviewsService } from 'src/app/services/Reviews.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  constructor(
    public dialogRef: MatDialogRef<AddComponent>, private service: ReviewsService, private toast: ToastrService
  ) {
  }
  onSubmit(reviewsstr: string) {
    let review = { "description": reviewsstr }
    this.post(review);
    this.dialogRef.close();
  }
  post(item: any) {
    this.service.postreview(item).subscribe({
      next: (ele) => {
        console.log(ele)
       // this.toast.success("تمت بنجاح")
      }, error: (err) => {
        console.log(err)
        if (err.status >= 200 && err.status <= 299) {
       //   console.log("^%^$")
         // this.toast.success("تمت بنجاح")

        }
        else {
        //  this.toast.error("فشلت العملية")
        }
      }
    })
  }
  onNoClick(): void {

    this.dialogRef.close();
  }
}
