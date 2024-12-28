import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { LecturesService } from 'src/app/services/Lectures.service';
import { DeleteComponent } from '../delete/delete.component';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent {
  searchQuery!: string;
  searchResults!: string
  BySubSubject!: string;
  index = 0;
  size = 20;
  SubSubjects!: any;
  Datasubject: any;
  constructor(private toastr:ToastrService ,public dialog: MatDialog, private service: LecturesService, private Subsubjectservice: SubSubjectsService, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'عناصر لكل صفحة';
    this.paginatorIntl.nextPageLabel = 'الصفحة التالية';
    this.paginatorIntl.previousPageLabel = 'الصفحة السابقة';
  }
  ngOnInit(): void {
    this.GetLectures();
    this.Subsubjectservice.GetAllSubSubject().subscribe((ele: any) => {
      this.Subsubjectservice.getAllSubSubject(ele.count).subscribe((ele2: any) => {
        this.SubsubjectData = ele2.items
        console.log(ele2)

      })
      console.log(ele)
    })
  }
  GetLectures() {
    this.service.GetallLectures(this.index, this.size).subscribe((ele: any) => {
      this.Datasubject = ele;
      this.dataSource = ele.items;
    })
  }
  pageChanged(event: PageEvent) {
    const pageIndex = event.pageIndex;
    this.index = pageIndex;
    const pageSize = event.pageSize;
    this.size = pageSize;
    if (this.searchQuery) {
      this.service.SearchLectures(this.searchQuery, pageIndex, pageSize).subscribe({
        next: (ele: any) => {
          this.dataSource = ele.items;
        },
        error: (ele) => { }
      })
    }
    else {
      this.service.GetallLectures(pageIndex, pageSize).subscribe((ele: any) => {
        this.dataSource = ele.items;
      })
    }

    //  this.loadData(); // Load data for the new page based on the updated pageIndex and pageSize.
  }
  openDialog(item: any): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetLectures();
    });
  }
  DeleteDialog(item: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetLectures();
    });

  }
  AddopenDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetLectures();
    });
  }
  clear() {
    this.searchQuery = '';
    this.BySubSubject = ''
    this.GetLectures();
  }
  search() {
    console.log(this.searchQuery)
    this.service.SearchLectures(this.searchQuery).subscribe({
      next: (ele: any) => {
        this.dataSource = ele.items;
      },
      error: (ele) => { }
    })
  }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ['name', 'lectureLink', 'isFree', 'startLiveWatchingDateTime', 'stopLiveWatchingDateTime', 'edit'];
  // , 'subSubjectID'
  GetBySubSubject() {
    console.log(typeof this.SearchQuery != 'object')
    console.log(typeof this.SearchQuery )
    if ( typeof this.SearchQuery != 'object') {
      this.GetLectures();
      this.toastr.warning("ادخل الاسبوع صحيحا")
    }
    else {
      this.service.GetBySubSubject(this.SearchQuery.id).subscribe((ele: any) => {
        this.dataSource = ele.items;
      })
    }
  }
  SubsubjectData!: any

  // NameOfSubsubjectId(id: any) {
  //   this.Subsubjectservice.GetAllSubsubjects().subscribe((ele: any) => {
  //     this.SubsubjectData = ele.items
  //   })
  // console.log((this.SubsubjectData).length)
  // this.SubsubjectData.filter((obj: any) => {
  //   return obj.id === id ? obj : ''
  // });
  Empty() {
    if (this.searchQuery == '') {
      this.GetLectures()
    }
  }
  SearchQuery!: any
  keyword = 'name';
  onChangeSub(event: any) {
    this.SearchQuery = event.target.value;
    console.log(event.target.value)
    console.log(this.SearchQuery)

  }
  selectEvent(item: any) {
    this.SearchQuery = item;
    // do something with selected item
    console.log(item)
    console.log(this.SearchQuery)
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.SearchQuery = val;
    // do something with selected item
    console.log(val)
    console.log(this.SearchQuery)
  }
  valuebool = false;
  onFocused(e: any) {
    console.log(e)
  }
  handleRemoveSelection(){
    this.GetLectures()
  }
}
