import { query } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';
import { EditComponent } from '../edit/edit.component';
import { AddComponent } from '../add/add.component';
import { DeleteComponent } from '../Delete/Delete.component';
import { environment } from 'src/environments/environment';
import { StudentsComponent } from '../students/students.component';
@Component({
  selector: 'app-subsubject',
  templateUrl: './subsubject.component.html',
  styleUrls: ['./subsubject.component.scss']
})
export class SubsubjectComponent {
  searchQuery!: string;
  searchResults!: string;
  Datasubject: any;
  index = 0;
  size = 20;
  Subsubjects!: any;
  ImagePath = environment.PhotoUrl;
  constructor(public dialog: MatDialog, private service: SubSubjectsService, private paginatorIntl: MatPaginatorIntl) {
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
    this.service.GetAllSubsubjects(this.index, this.size).subscribe((ele: any) => {
      this.Datasubject = ele;
      this.dataSource = ele.items;
      console.log(ele)
    })
    this.service.GetAllSubject().subscribe((ele: any) => {
      this.Subsubjects = ele.items
    })
  }
  openDialog(Subsubject: any): void {
    console.log(Subsubject)
    const dialogRef = this.dialog.open(EditComponent, {
      data: Subsubject,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetData()
    });
  }
  AddopenDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetData()
    });
  }
  StudentopenDialog(ele: any): void {
    const dialogRef = this.dialog.open(StudentsComponent, {
      data: ele,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetData()
    });
  }
  search() {
    if (this.searchQuery == 'all') {
      this.GetData();
    }
    else {
      console.log(this.searchQuery)
      this.service.SearchSubsubjects(this.searchQuery).subscribe({
        next: (ele: any) => {
          console.log(ele);
          this.dataSource = ele.items;
        },
        error: (ele) => { console.log(ele) }
      })
    }

  }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ['name', 'SubjectName', 'image', 'students', 'edit'];
  delete(item: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: item.id
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetData()
    });
    console.log(item)
  }
  pageChanged(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.index = pageIndex;
    this.size = pageSize;

    if (this.searchQuery) {
      this.service.SearchSubsubjects(this.searchQuery, pageIndex, pageSize).subscribe((ele: any) => {
        this.dataSource = ele.items;
      },
        (ele) => {
          console.log(ele)
        }
      )
    }
    else {
      this.service.GetAllSubsubjects(pageIndex, pageSize).subscribe((ele: any) => {
        this.dataSource = ele.items;
      })
    }
  }
  clear() {
    this.searchQuery = '';
    this.GetData();
  }
  Empty() {
    console.log(this.searchQuery)
    if (this.searchQuery == '') {
      this.GetData()
    }
  }
}

