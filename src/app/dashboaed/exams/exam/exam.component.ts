import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { ExamsService } from 'src/app/services/Exams.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DeleteComponent } from '../delete/delete.component';
import { AssignmentComponent } from '../../assignment/assignment.component';
import { QuzitestComponent } from '../../quzi-test/quzitest.component';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent {
  searchQuery!: string;
  searchResults!: string;
  studentphone!: string;
  email!: string;
  index = 0;
  size = 20;
  Datasubject: any;
  constructor(public dialog: MatDialog, private service: ExamsService, private router: Router, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'عناصر لكل صفحة';
    this.paginatorIntl.nextPageLabel = 'الصفحة التالية';
    this.paginatorIntl.previousPageLabel = 'الصفحة السابقة';
  }
  Empty() {
    console.log(this.searchQuery)
    console.log(this.email)
    console.log(this.studentphone)
    if ((this.studentphone == '' && this.email == '') || this.searchQuery == '') {
      this.GetData()
    }
  }
  ngOnInit(): void {
    this.GetData()
  }
  GetData() {
    this.service.GetallExams(this.index, this.size).subscribe((ele: any) => {
      this.Datasubject = ele;
      this.dataSource = ele.items;
    })
  }
  openDialog(level: any): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: level,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetData();
    });
  }
  AddopenDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetData();
    });
  }
  AddopenAssignmentDialog(): void {
    const dialogRef = this.dialog.open(AssignmentComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetData();
    });
  }
  AddopenQuizDialog(): void {
    const dialogRef = this.dialog.open(QuzitestComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetData();
    });
  }
  search() {
    this.email = '';
    this.studentphone = '';
    this.service.SearchExams(this.searchQuery).subscribe({
      next: (ele: any) => {
        this.dataSource = ele.items;
      },
      error: (ele: any) => { console.log(ele) }
    })
  }
  clear() {
    this.searchQuery = '';
    this.GetData();
  }
  clear2() {
    this.email = '';
    this.studentphone = '';
    this.GetData();
  }
  SearchByStudentInfo() {
    this.searchQuery = '';
    this.service.SearchByStudentInfo(this.studentphone, this.email).subscribe(
      (ele: any) => {
        this.dataSource = ele.items;
      },
      (ele: any) => {
        console.log(ele)
      }
    )
  }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ['name', 'subSubjectID', 'examOpenDate', 'degree', 'examCloseDate', 'examDuration', "questions", 'edit'];
  delete(item: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.GetData()
    });
  }
  questions(obj: any) {

    this.router.navigate([this.router.url + '/questions/' + obj.id])
  }
  pageChanged(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.index = pageIndex;
    this.size = pageSize;
    if (this.searchQuery) {
      this.service.SearchExams(this.searchQuery, pageIndex, pageSize).subscribe(
        (ele: any) => {
          this.dataSource = ele.items;
        },
        (ele: any) => {
          console.log(ele)
        }
      )
    }
    else {
      this.service.GetallExams(pageIndex, pageSize).subscribe((ele: any) => {
        this.dataSource = ele.items;
      })
    }
    //  this.loadData(); // Load data for the new page based on the updated pageIndex and pageSize.
  }

}
