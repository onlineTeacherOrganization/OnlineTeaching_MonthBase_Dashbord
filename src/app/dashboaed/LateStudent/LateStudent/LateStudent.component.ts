import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { LateStudentService } from '../../../services/LateStudent.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-LateStudent',
  templateUrl: './LateStudent.component.html',
  styleUrls: ['./LateStudent.component.scss']
})
export class LateStudentComponent implements OnInit {
  LateStudent!: any;
  Datasubject: any;
  index = 0;
  size = 20;
  constructor(public dialog: MatDialog, private paginatorIntl: MatPaginatorIntl, private LateService: LateStudentService) {
    this.paginatorIntl.itemsPerPageLabel = 'عناصر لكل صفحة';
    this.paginatorIntl.nextPageLabel = 'الصفحة التالية';
    this.paginatorIntl.previousPageLabel = 'الصفحة السابقة';
  }
  ngOnInit(): void {
    this.LateService.LockLateStudent();
    this.GetDate()
  }
  GetDate() {
    this.LateService.GetAllLateStudent(0, 10).subscribe((ele: any) => {
      this.LateStudent = ele.items
      this.dataSource = ele.items;
      this.Datasubject = ele;
    })
  }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ['StudentName', 'StudentPhone', 'subsubjectName', 'ExamIsPassed', 'QuizIsPassed', 'AssigmentIsPassed', "StartWorking", 'watchingPrecentageIsPassed'];
  pageChanged(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.index = pageIndex;
    this.size = pageSize;
    this.LateService.GetAllLateStudent(pageIndex, pageSize).subscribe((ele: any) => {
      this.dataSource = ele.items;
    })
    //  this.loadData(); // Load data for the new page based on the updated pageIndex and pageSize.
  }
  openDialog(obj: any) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetDate();
    });
  }

}
