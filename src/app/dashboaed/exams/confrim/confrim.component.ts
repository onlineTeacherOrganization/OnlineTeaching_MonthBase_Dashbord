import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExamsService } from 'src/app/services/Exams.service';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';

@Component({
  selector: 'app-confrim',
  templateUrl: './confrim.component.html',
  styleUrls: ['./confrim.component.scss']
})
export class ConfrimComponent implements OnInit {
  constructor(private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any, private SubSubjectsService: SubSubjectsService,
    public dialogRef: MatDialogRef<ConfrimComponent>, private service: ExamsService,
  ) { }
  ngOnInit(): void {
    console.log(this.data)

  }
  confirm() {
    console.log("$$$$")
    this.dialogRef.close({ status: true });
  }
  decline() {
    console.log("$$$$")
    this.dialogRef.close({ status: false });
  }
}
