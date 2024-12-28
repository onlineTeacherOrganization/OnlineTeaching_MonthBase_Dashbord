import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { SubjectInter } from 'src/app/Interfaces/Subjectinterface';
import { SubjectsService } from 'src/app/services/Subjects.service';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  searchQuery!: string;
  searchResults!: string;
  Datasubject: any;
  ImgPath = environment.PhotoUrl
  Levels!: any;
  index = 0;
  size = 20;
  dataSource = new MatTableDataSource<SubjectInter>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ['name', 'price', 'telegeramLink', 'imagePath', 'level', 'edit'];

  constructor(public dialog: MatDialog, private service: SubjectsService, private paginatorIntl: MatPaginatorIntl) {
    // Override the range label function to use Arabic
    this.paginatorIntl.itemsPerPageLabel = 'عناصر لكل صفحة';
    this.paginatorIntl.nextPageLabel = 'الصفحة التالية';
    this.paginatorIntl.previousPageLabel = 'الصفحة السابقة';
    // this.paginatorIntl.getRangeLabel = arabicRangeLabel;
  }
  ngOnInit(): void {
    this.Getall()
    this.GetLevel();
  }
  GetLevel() {
    this.service.GetLevels().subscribe((ele: any) => {
      this.Levels = ele.items;
      console.log(this.Levels[3]);
    })
  }
  Getall() {
    return this.service.GetAllSubjects(this.index, this.size).subscribe((ele: any) => {
      this.Datasubject = ele;
      console.log(ele.items)
      this.dataSource = ele.items;
    })
  }
  openDialog(level: any): void {
    console.log(level)
    const dialogRef = this.dialog.open(EditComponent, {
      data: level,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Getall();

    });
  }
  AddopenDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Getall();
    });
  }
  search() {
    if (this.searchQuery == 'all') {
      this.Getall();
    }
    else {
      console.log(this.searchQuery)
      this.service.SearchSubjects(this.searchQuery, this.index, this.size).subscribe({
        next: (ele: any) => {
          console.log(ele)
          console.log(ele.items)
          this.dataSource = ele.items;
        },
        error: (ele) => { console.log(ele) }
      })
    }
  }


  delete(item: any) {
    console.log(item)
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.Getall();
    });
    console.log(item)
    // this.service.DeleteSubjects(item.id).subscribe({
    //   next: (ele) => {
    //     console.log(ele);
    //     this.Getall();
    //   },
    //   error: (ele) => { console.log(ele) }
    // })
  }
  pageChanged(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.index = pageIndex;
    this.size = pageSize;
    console.log(this.index, this.size);
    console.log(this.searchQuery)
    if (this.searchQuery != 'all' && this.searchQuery != undefined) {
      console.log(this.searchQuery);
      this.service.SearchSubjects(this.searchResults, this.index, this.size).subscribe((ele: any) => {
        this.dataSource = ele.items;
      })
    }
    else if (this.searchQuery == 'all' || this.searchQuery == undefined) {
        this.service.GetAllSubjects(this.index, this.size).subscribe((ele: any) => {
          this.dataSource = ele.items;
        })
    }

  }
  clear() {
    this.searchQuery = '';
    this.Getall();
  }
  Empty() {
    console.log(this.searchQuery)
    if (this.searchQuery == 'all') {
      this.Getall()
    }
  }
}

