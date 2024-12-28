import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from 'src/app/services/Students.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './Edit/Edit.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LockStudentComponent } from './LockStudent/LockStudent.component';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  studentName!: string;
  phone!: string;
  searchResults!: string;
  Datasubject: any;
  index = 0;
  size = 20;
  constructor(public dialog: MatDialog, private service: StudentsService, private paginatorIntl: MatPaginatorIntl) {
    // Override the range label function to use Arabic
    this.paginatorIntl.itemsPerPageLabel = 'عناصر لكل صفحة';
    this.paginatorIntl.nextPageLabel = 'الصفحة التالية';
    this.paginatorIntl.previousPageLabel = 'الصفحة السابقة';
    // this.paginatorIntl.getRangeLabel = arabicRangeLabel;
  }
  ngOnInit(): void {
    this.GetData();
  }
  GetData() {
    this.service.GetAllStudents(this.index, this.size).subscribe((ele: any) => {
      this.Datasubject = ele;
      this.dataSource = ele.items;
      console.log(ele)
    })
  }
  search() {
    console.log(this.studentName)
    this.service.SearchStudents(this.studentName, this.phone).subscribe((ele: any) => {
      console.log(ele)
      this.dataSource = ele.items;
    },
      (ele) => {
        console.log(ele)
      }
    )
  }
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['name', 'phone', 'parentPhone', 'levelName', 'email', 'schoolName', 'city', 'lock', 'edit'];
  clear() {
    this.studentName = '';
    this.phone = '';
    this.GetData();
  }
  openDialog(ele: any) {
    console.log(ele)
    const dialogRef = this.dialog.open(EditComponent, {
      data: ele,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetData()
    });
  }
  Download() {
    this.service.DownloadStudentData().subscribe((data: Blob) => {
      const excelBlob: Blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(excelBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'students.xlsx'; // Provide the desired filename here
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
  pageChanged(event: PageEvent) {

    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.index = pageIndex;
    this.size = pageSize;
    if (this.studentName || this.phone) {
      this.service.SearchStudents(this.studentName, this.phone, pageIndex, pageSize).subscribe((ele: any) => {
        this.dataSource = ele.items;
      },
        (ele) => {
          console.log(ele)
        }
      )
    }
    else {
      this.service.GetAllStudents(pageIndex, pageSize).subscribe((ele: any) => {
        this.dataSource = ele.items;
      })
    }
  }
  Lock(ele: any) {
    console.log(ele)
    const dialogRef = this.dialog.open(LockStudentComponent, {
      data: ele,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetData()
    });
  }
  Empty() {
    console.log(this.studentName)
    if ((this.studentName == '' && !this.phone) || (!this.studentName && this.phone == '')) {
      this.GetData()
    }
  }
}
