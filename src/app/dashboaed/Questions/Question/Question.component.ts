import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/Question.service';
import { AddComponent } from '../Add/Add.component';
import { MatTableDataSource } from '@angular/material/table';
import { EditComponent } from '../Edit/Edit.component';
import { environment } from 'src/environments/environment';
import { DeleteComponent } from '../Delete/Delete.component';
import { ExamsService } from 'src/app/services/Exams.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-Question',
  templateUrl: './Question.component.html',
  styleUrls: ['./Question.component.scss']
})
export class QuestionComponent implements OnInit {
  formData!: FormData;
  DataQestion: any;
  Url = environment.PhotoUrl;
  Id!: number;
  constructor(public dialog: MatDialog, private questionserice: QuestionService, private RouActive: ActivatedRoute) { }
  ngOnInit() {
    this.NameExam()
    this.GetExamQuestions()
  }
  GetExamQuestions() {
    this.RouActive.params.subscribe((ele) => {
      this.Id = ele['id'];
    })
    this.questionserice.GetExamQuestions(this.Id).subscribe((ele: any) => {
      this.DataQestion = ele;
      console.log(ele)
      this.dataSource = ele.questions;
    });
  }
  EditopenDialog(Qestion: any): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { Qestionmar: Qestion, id: this.Id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.GetExamQuestions()
    });
  }
  AddopenDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      data: this.Id,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.GetExamQuestions()
    });
  }
  DeleteopenDialog(obj: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: obj.id,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.GetExamQuestions()
    });
  }
  dataSource = new MatTableDataSource<any>();
  Exam!: any
  displayedColumns = ['id', 'description', 'correctAnswer', 'imageOrFile', 'edit'];
  NameExam() {
    this.questionserice.NameExam(3).subscribe
      (ele => {
        this.Exam = ele
      })
    console.log(this.Exam)
  }
}
