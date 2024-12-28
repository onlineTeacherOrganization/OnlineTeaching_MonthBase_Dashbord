import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LecturesService } from 'src/app/services/Lectures.service';
import { DeleteComponent } from '../Delete/Delete.component';
import { AddComponent } from '../Add/Add.component';
@Component({
  selector: 'app-reopen-lecture',
  templateUrl: './reopen-lecture.component.html',
  styleUrls: ['./reopen-lecture.component.scss'],
})
export class ReopenLectureComponent {
  searchQuery!: string;
  searchResults!: string;
  Datasubject: any;
  ReOpenWatchingRequests!: any;
  index = 0;
  size = 20;
  constructor(public dialog: MatDialog, private service: LecturesService, private paginatorIntl: MatPaginatorIntl) {
    // Override the range label function to use Arabic
    this.paginatorIntl.itemsPerPageLabel = 'عناصر لكل صفحة';
    this.paginatorIntl.nextPageLabel = 'الصفحة التالية';
    this.paginatorIntl.previousPageLabel = 'الصفحة السابقة';
  }
  ngOnInit(): void {
    this.GetReOpenWatchingRequests();
  }
  GetReOpenWatchingRequests() {
    this.service.Get_ReOpenWatchingRequests(this.index, this.size).subscribe((ele: any) => {
      this.Datasubject = ele.items;
      this.dataSource = ele.items;
      console.log(ele)
    })
  }
  DeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetReOpenWatchingRequests();
    });

  }
  AddopenDialog(obj: any): void {
    console.log(obj);
    const dialogRef = this.dialog.open(AddComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetReOpenWatchingRequests();
    });
  }
  clear() {
    this.searchQuery = '';
    this.GetReOpenWatchingRequests();
  }
  search() {
    console.log(this.searchQuery)
    this.service.SearchLectures(this.searchQuery).subscribe({
      next: (ele: any) => {
        console.log(ele);
        this.Datasubject = ele.items;
        this.dataSource = ele.items;
      },
      error: (ele) => { console.log(ele) }
    })
  }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  pageChanged(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.index = pageIndex;
    this.size = pageSize;
    if (this.searchQuery) {
      this.service.SearchLectures(this.searchQuery).subscribe({
        next: (ele: any) => {
          console.log(ele);
          this.Datasubject = ele.items;
          this.dataSource = ele.items;
        },
        error: (ele) => { console.log(ele) }
      })
    }
    this.service.GetallLectures(pageIndex, pageSize).subscribe((ele: any) => {
      this.dataSource = ele.items;
    })
  }
  displayedColumns = ['studentName', 'lectureName', 'reason', 'edit'];
}
